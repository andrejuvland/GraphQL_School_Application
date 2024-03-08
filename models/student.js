module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('Student', {
        FirstName: Sequelize.DataTypes.STRING,
        LastName: Sequelize.DataTypes.STRING,
    }, {
        timestamps: false
    });
    Student.associate = function(models) {
        Student.belongsTo(models.School);
    }
    return Student;
}