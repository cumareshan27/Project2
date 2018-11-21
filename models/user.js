/*eslint-disable*/
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    
    name: DataTypes.STRING,
    age: DataTypes.INTEGER, 
    gender: DataTypes.TEXT
  });

    // User.associate = function (models) {
    //     User.belongsTo(models.Response);
    //     //Response.belongsTo(models.Question);
    // }

  User.associate = function(models) {
    User.hasMany(models.Response);
    onDelete: "cascade";
  };

  // User.associate = function(models) {
  //   User.hasMany(models.Question);
  //   onDelete: "cascade";
  // };

  return User;
};
