/*eslint-disable*/
module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        answer: DataTypes.STRING,
    });

    // Question.associate = function (models) {
    //     Question.belongsTo(models.Response);
    //     //Response.belongsTo(models.Question);
    // }
    Question.associate = function (models) {
        Question.hasMany(models.Response);
        onDelete: "cascade";
    };

    // Question.associate = function (models) {
    //     Question.hasMany(models.Question);
    //     onDelete: "cascade";
    // };
    return Question;
};