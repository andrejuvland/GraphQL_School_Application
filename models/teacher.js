module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define('Teacher', {
        FirstName: Sequelize.DataTypes.STRING,
        LastName: Sequelize.DataTypes.STRING
    }, {
        timestamps: false
    });
    Teacher.associate = function(models) {
        Teacher.belongsTo(models.School);
    };
    return Teacher;
}