module.exports = function (sequelize, DataTypes) {
    var Response = sequelize.define('Response', {
        answer: DataTypes.STRING,
    });

    Response.associate = function (models) {
        Response.belongsTo(models.User);
        Response.belongsTo(models.Question);
    }

    return Response;
};