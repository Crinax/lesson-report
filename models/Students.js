const { DataTypes, Model, Sequelize } = require('sequelize');
class Students extends Model {}
module.exports = function (sequelize) {
    Students.init({
        id: {
            type: DataTypes.INTEGER,
            defaultValue: Sequelize.literal("nextval('students_id_seq')"),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(10),
            collate: 'Russian_Russia.1251'
        }
    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        timestamps: false,
        modelName: 'students',
        tableName: 'students'
    })
    return Students
}