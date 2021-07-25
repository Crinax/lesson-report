const { DataTypes, Model } = require('sequelize');
class LessonStudents extends Model {}
module.exports = function (sequelize) {
    LessonStudents.init({
        lessonId: {
            field: 'lesson_id',
            type: DataTypes.INTEGER,
            references: {
                model: 'lessons',
                key: 'id'
            }
        },
        studentId: {
            field: 'student_id',
            type: DataTypes.INTEGER,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        visit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        timestamps: false,
        modelName: 'lesson_students',
        tableName: 'lesson_students'
    })
    return LessonStudents
}