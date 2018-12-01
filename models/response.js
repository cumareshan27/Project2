/*eslint-disable*/
module.exports = function (sequelize, DataTypes) {
    var Response = sequelize.define('Response', {
        answer: DataTypes.STRING,
    });

    Response.associate = function (models) {
        Response.belongsTo(models.User);
        Response.belongsTo(models.Question);
    }
    // Response.associate = function (models) {
    //     Response.hasMany(models.User, {
    //         onDelete: "cascade"
    //     });

    // };

    // Response.associate = function (models) {
    //     Response.hasMany(models.Question, {
    //         onDelete: "cascade"
    //     });

    // };

    return Response;
};