module.exports = (sequelize, Sequelize) => {
    const School = sequelize.define('School', {
        Name: Sequelize.DataTypes.STRING,
        Address: Sequelize.DataTypes.STRING,
        Description: Sequelize.DataTypes.STRING
    }, {
        timestamps: false
    });
    School.associate = function(models) {
        School.hasMany(models.Student);
        School.hasMany(models.Teacher);
    }
    return School;
}