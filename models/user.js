module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    UTC: DataTypes.STRING, 
    alias: DataTypes.STRING,
    byear: DataTypes.INTEGER, 
    gender: DataTypes.STRING,
    zip: DataTypes.STRING,
    demo0: DataTypes.BOOLEAN,
    demo1: DataTypes.BOOLEAN,
    demo2: DataTypes.BOOLEAN
  });

  User.associate = function(models) {
    User.hasMany(models.Response);
    onDelete: "cascade";
  };

  return User;
};
