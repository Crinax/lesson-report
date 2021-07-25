const { DataTypes, Model } = require('sequelize');
class LessonTeachers extends Model {}
module.exports = function (sequelize) {
    LessonTeachers.init({
        lessonId: {
            field: 'lesson_id',
            type: DataTypes.INTEGER,
            references: {
                model: 'lessons',
                key: 'id'
            }
        },
        teacherId: {
            field: 'teacher_id',
            type: DataTypes.INTEGER,
            references: {
                model: 'teachers',
                key: 'id'
            }
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        timestamps: false,
        modelName: 'lesson_teachers',
        tableName: 'lesson_teachers'
    })
    return LessonTeachers
}