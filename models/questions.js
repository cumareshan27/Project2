module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        UTC: DataTypes.STRING,  
        prompt: DataTypes.STRING,  
    });

    Question.associate = function (models) {
        Question.hasMany(models.Response);
        onDelete: "cascade";
    };

    return Question;
};