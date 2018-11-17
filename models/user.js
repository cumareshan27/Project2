module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    
    name: DataTypes.STRING,
    age: DataTypes.INTEGER, 
    gender: DataTypes.TEXT
  });

  User.associate = function(models) {
    User.hasMany(models.Response);
    onDelete: "cascade";
  };

  User.associate = function(models) {
    User.hasMany(models.Question);
    onDelete: "cascade";
  };

  return User;
};
