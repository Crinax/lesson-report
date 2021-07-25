const { DataTypes, Model, Sequelize } = require('sequelize');
class Teachers extends Model {}
module.exports = function (sequelize) {
    Teachers.init({
        id: {
            type: DataTypes.INTEGER,
            defaultValue: Sequelize.literal("nextval('teachers_id_seq')"),
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
        modelName: 'teachers',
        tableName: 'teachers'
    })
    return Teachers
}