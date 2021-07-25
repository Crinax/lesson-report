const { DataTypes, Model, Sequelize } = require('sequelize');
class Lessons extends Model {}
module.exports = function (sequelize) {
    Lessons.init({
        id: {
            type: DataTypes.INTEGER,
            defaultValue: Sequelize.literal("nextval('lessons_id_seq')"),
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            collate: 'Russian_Russia.1251'
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        timestamps: false,
        modelName: 'lessons',
        tableName: 'lessons'
    })
    return Lessons
}