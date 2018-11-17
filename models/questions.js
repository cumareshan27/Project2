module.exports = function (sequelize, DataTypes){
    var Question = sequelize.define("question", {
        answer: DataTypes.STRING,
    });
    User.associate = function(models) {
        User.hasMany(models.Response);
        onDelete: "cascade";
      };
    
      User.associate = function(models) {
        User.hasMany(models.Question);
        onDelete: "cascade";
      };
      return Question;
};