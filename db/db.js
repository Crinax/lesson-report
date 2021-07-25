const { Sequelize } = require('sequelize')
const color = require('../colors')
const Logger = require('../logger/logger')
class DB {

    static connection = null
    static Teachers = require('../models/Teachers')
    static Students = null
    static Lessons = null
    static LessonStudents = null
    static LessonTeachers = null

    static async connect(dialect, name, user, pass, host, port) {
        console.log(`Connecting to ${dialect}...${color.reset}\n`)
        Logger.init()
        DB.connection = new Sequelize(name, user, pass, {
            dialect: dialect,
            host: host,
            port: port,
            sync: { force: true },
            logging: Logger.appendLog
        })
        Logger.clearFile()
        DB.defineModels()
        await DB.modelsSync()
    }
    static defineModels() {
        DB.Teachers = require('../models/Teachers')(DB.connection)
        DB.Students = require('../models/Students')(DB.connection)
        DB.Lessons = require('../models/Lessons')(DB.connection)
        DB.LessonStudents = require('../models/LessonStudents')(DB.connection)
        DB.LessonTeachers = require('../models/LessonTeachers')(DB.connection)
        // Creating relationship many-to-many
        DB.Lessons.belongsToMany(DB.Students, {
            through: DB.LessonStudents,
            foreignKey: 'lesson_id'

        })
        DB.Students.belongsToMany(DB.Lessons, {
            through: DB.LessonStudents,
            foreignKey: 'student_id'
        })
        DB.Teachers.belongsToMany(DB.Lessons, {
            through: DB.LessonTeachers,
            foreignKey: 'teacher_id'
        })
        DB.Lessons.belongsToMany(DB.Teachers, {
            through: DB.LessonTeachers,
            foreignKey: 'lesson_id'
        })
    }
    static async modelsSync() {
        await DB.Teachers.sync()
        await DB.Students.sync()
        await DB.Lessons.sync()
        await DB.LessonStudents.sync()
        await DB.LessonTeachers.sync()
    }
    static disconnect() {
        console.log(`Disconnectig...${color.reset}`)
        if (DB.connection) {
            DB.connection.close()
        }
    }
    static async 
}
module.exports = DB