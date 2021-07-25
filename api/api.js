const dotenv = require('dotenv')
// считываем переменные среды из файла .env
dotenv.config()
const DB = require('../db/db')
const APIError = require('./apiError')
const APIDate = require('./apiDate')
const { Op } = require('sequelize')
const Paginator = require('../paginator/paginator')
const Logger = require('../logger/logger')
module.exports = class API {
    static async connect() {
        await DB.connect(
            process.env.DB_DIALECT,
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASS,
            process.env.DB_HOST,
            process.env.DB_PORT,
        )
    }
    static __isValidDate(date) {
        date = date.split(',')
        if (date.length <= 2 && date.length > 0) {
            for (let i of date) {
                return (new APIDate(i)).isValid(/^\d{4}-\d{1,2}-\d{1,2}$/)
            }
            return true
        }
        else { return false }
    }
    static __isValidStatus(status) { return Number(status) == 0 || Number(status) == 1 }
    static __isPositiveIntegerNumber(number) {
        // if number = 0 this also returns `false`
        number = Number(number)
        if (number) { return Number.isInteger(number) && Math.sign(number) != -1 }
        else { return false }
    }
    static __isValidIds(ids) {
        if (typeof ids != 'string' && !Array.isArray(ids)) { return false }
        ids = !Array.isArray(ids) ? ids.split(',').map(Number) : ids
        return ids.findIndex(isNaN) == -1 && Array.from(new Set(ids)).join() === ids.join()
    }
    static __isValidTeacherIds(teacherIds) {
        return API.__isValidIds(teacherIds)
    }
    static __isValidStudentsCount(studentsCount) {

        return (API.__isValidIds(studentsCount) && studentsCount.split(',').length < 3 && studentsCount.split(',').length > 0) || Number(studentsCount) >= 0
    }
    static __isValidLessonsPerPage(lessonsPerPage) { return API.__isPositiveIntegerNumber(lessonsPerPage) }
    static __isValidPage(page, list = null) {
        if (list) {
            return API.__isPositiveIntegerNumber(page) && list[Number(page)-1] != undefined
        }
        else { return API.__isPositiveIntegerNumber(page) }
    }
    static __isValidData(query) {
        var {
            date = null,
            status = null,
            teacherIds = null,
            studentsCount = null,
            page = 1,
            lessonsPerPage = 5
        } = query
        if (date != null && !API.__isValidDate(date)) {
            return new APIError(400, 'This date is invalid', 'date', date)
        }
        if (status != null && !API.__isValidStatus(status)) {
            return new APIError(400, 'This status is invalid', 'status', status)
        }
        if (teacherIds != null && !API.__isValidTeacherIds(teacherIds)) {
            return new APIError(400, 'These teachers identifiers is invalid', 'teacherIds', teacherIds)
        }
        if (studentsCount != null && !API.__isValidStudentsCount(studentsCount)) {
            return new APIError(400, 'This students count is invalid', 'studentsCount', studentsCount)
        }
        if (page != null && !API.__isValidPage(page)) {
            return new APIError(400, 'This page is invalid', 'page', page)
        }
        if (lessonsPerPage != null && !API.__isValidLessonsPerPage(lessonsPerPage)) {
            return new APIError(400, 'This lessons per page is invalid', 'lessonsPerPage', lessonsPerPage)
        }
        return true
    }
    static __getRangeFromArray([min, max], step = 1) {
        if (max == undefined && max == null && Number(max) == NaN) { return [min] }
        else {
            return Array.from({ length: ((Math.abs(max - min) + 1) / step) | 0}, (v, k) => (min + k)*step)
        }
    }
    static __getWhereStatementDate(stringDate) {
        var splittedDate = stringDate.split(',')
        if (splittedDate.length == 2) {
            return {
                date: {
                    [Op.between]: [splittedDate[0], splittedDate[1]]
                }
            }
        }
        else {
            return {
                date: splittedDate[0]
            }
        }
    }
    static __getWhereStatementStatus(status) { return { status: Number(status) } }
    static async __getLessons(where) {
        var lessons = await DB.Lessons.findAll({
            where,
            order: [
                ['id', 'ASC']
            ],
            include: [
                {
                    model: DB.Students,
                    order: [
                        ['id', 'ASC']
                    ]
                },
                {
                    model: DB.Teachers,
                    order: [
                        ['id', 'ASC']
                    ],
                }
            ],
        })
        return lessons.length != 0 ? lessons.map(lesson => lesson.dataValues) : lessons;
    }
    static async __getVisitCount(id) {
        return {
            visitCount: await DB.LessonStudents.count({
                where: {
                    lesson_id: id,
                    visit: true
                }
            })
        }
    }
    static async getFormatedLessons(query) {
        Logger.appendLog('Received: ' + JSON.stringify(query, null, 4))
        var isValidData = API.__isValidData(query)
        if (isValidData != true) {
            return isValidData
        }
        var {
            date = null,
            status = null,
            teacherIds = null,
            studentsCount = null,
            page = 1,
            lessonsPerPage = 5
        } = query
        var where = {}
        if (date != null) { Object.assign(where, API.__getWhereStatementDate(date)) }
        if (status != null) { Object.assign(where, API.__getWhereStatementStatus(status)) }

        var lessons = await API.__getLessons(where)
        lessons = await Promise.all(lessons.map(async lesson => {
            // Remove element if is not in studentsCount
            if (studentsCount != undefined) {
                if (Array.isArray(studentsCount) || typeof studentsCount == 'string') {
                    studentsCount = !Array.isArray(studentsCount) ? studentsCount.split(',').map(Number) : studentsCount
                    if (studentsCount.length == 2) {
                        if (API.__getRangeFromArray(studentsCount).indexOf(lesson.students.length) == -1) {
                            return undefined
                        }
                    }
                    else if (studentsCount.length == 1) {
                        if (lesson.students.length != studentsCount[0]) {
                            return undefined
                        }
                    }
                }
                else if (studentsCount != null) {
                    if (lesson.students.length != studentsCount) {
                        return undefined
                    }
                }
            }
            // Remove element if is not in teacherIds
            var firstLengthTeachers = lesson.teachers.length
            var filteredTeachers = lesson.teachers.filter((teacher) => {
                if (teacherIds) {
                    teacherIds = !Array.isArray(teacherIds) ? teacherIds.split(',').map(Number) : teacherIds
                    if (Array.isArray(teacherIds)) {
                        return teacherIds.indexOf(teacher.id) != -1
                    }
                    else if (teacherIds != null) {
                        return teacher.id == teacherIds
                    }
                }
                else { return true }
            })
            if (filteredTeachers.length == 0 && filteredTeachers.length != firstLengthTeachers) { return undefined }
            // Turning into the object
            lesson.students = lesson.students.map(student => {
                let data = student.dataValues
                // Copy visit property into student object
                Object.assign(data, {visit: data.lesson_students.visit})
                // Remove lesson_students property
                delete data.lesson_students
                return data
            })
            lesson.teachers = lesson.teachers.map(teacher => {
                let data = teacher.dataValues
                delete data.lesson_teachers
                return data
            })
            var visitCountObject = await API.__getVisitCount(lesson.id)
            Object.assign(lesson, visitCountObject)
            return lesson
        }))
        lessons = lessons.filter(lesson => lesson != undefined)
        lessons = lessons.length != 0 ? Paginator.paginate(lessons, lessonsPerPage) : lessons
        return API.__isValidPage(page, lessons) ? lessons[page-1] : [] /* new APIError(400, 'Page does not exists', 'page', page) */
    }
    static __isValidDays(days) {
        if (Array.isArray(days)) {
            for (let day of days) {
                let num = Number(day);
                if (isNaN(num) || num < 0 || num > 6) { return false; }
            }
            return Array.from(new Set(days)).join() == days.join()
        } else {
            let num = Number(days);
            return num != NaN && num >= 0 && num < 7;
        }
        
    }
    static __isValidPostData(query) {
        var {
            teacherIds,
            title,
            days,
            firstDate,
            lessonsCount,
            lastDate
        } = query
        if (teacherIds == undefined) {
            return new APIError(400, '"teacherIds" is required parameter')
        }
        if (!API.__isValidIds(teacherIds)) {
            return new APIError(400, 'This is invalid teacherIds', 'teacherIds', teacherIds)
        }
        if (title == undefined) {
            return new APIError(400, '"title" is required parameter')
        }
        if (days == undefined) {
            return new APIError(400, '"days" is required parameter')
        }
        if (!API.__isValidDays(days)) {
            return new APIError(400, 'This is invalid days (days doesn\'t repeat)', 'days', days)
        }
        if (firstDate == undefined) {
            return new APIError(400, '"firstDate" is required parameter')
        }
        if (!(new APIDate(firstDate)).isValid(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            return new APIError(400, 'This is invalid firstDate', 'firstDate', firstDate)
        }
        if (lessonsCount == undefined && lastDate == undefined) {
            return new APIError(400, 'You should include one of the following parameters: "lessonsCount" or "lastDate"')
        }
        if (lessonsCount != undefined && !API.__isPositiveIntegerNumber(lessonsCount)) {
            return new APIError(400, '"lessonsCount" should be positive integer number', 'lessonsCount', lessonsCount)
        }
        if (lastDate != undefined && !(new APIDate(lastDate)).isValid(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            return new APIError(400, 'This is invalid lastDate', 'lastDate', lastDate)
        }
        if (lessonsCount != undefined && lastDate != undefined) {
            return new APIError(400, '"lessonsCount" and "lastDate" cannot be used together')
        }
        return true
    }
    static async __createLessons(dates, title, status) {
        var lessonsBulk = []
        for (let date of dates) {
            lessonsBulk.push({
                date,
                title,
                status: 0
            })
        }
        return await DB.Lessons.bulkCreate(lessonsBulk)
    }
    static async sendLessons(query) {
        Logger.appendLog('API => Received: ' + JSON.stringify(query, null, 4))
        var isValidData = API.__isValidPostData(query)
        if (isValidData != true) { return isValidData }
        var {
            teacherIds,
            title,
            days,
            firstDate,
            lessonsCount,
            lastDate
        } = query
        var dates = []
        days = Array.isArray(days) ? days : [days]
        var apiFirstDate = new APIDate(firstDate)
        if (lessonsCount != undefined) {
            dates = apiFirstDate.rangeByCount(lessonsCount, ...days)
        }
        if (lastDate != undefined) {
            dates = (new APIDate(firstDate)).rangeToDate(lastDate, ...days)
        }
        var nextYear = apiFirstDate.nextYear.date
        dates = dates.filter(date => new Date(date) < new Date(nextYear))
        dates = dates.slice(0, 300)
        var lessonsArray = await API.__createLessons(dates, title, 0)
        var lessonsIds = lessonsArray.map(lesson => lesson.id)
        return lessonsIds
    }
}