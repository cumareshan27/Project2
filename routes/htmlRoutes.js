var db = require("../models");


module.exports = function (app) {


  //***************************************************************************************/
  // Handle the route to the default page
  //***************************************************************************************/
  app.get("/", function (req, res) {
    res.render("index", {
    });
  });


  //***************************************************************************************/
  // Provide a route for registering a new subscriber
  //***************************************************************************************/
    app.get("/reports", function (req, res) {
      db.Question.findAll().then(function (dbQuestion) {
        res.render("repselect", {
          qlist: dbQuestion
        });
      });
    });

    
  //***************************************************************************************/
  // Provide a route for registering a new subscriber
  //***************************************************************************************/
  app.get("/register", function (req, res) {
    res.render("register", {
      msg: "User Registration"
    });
  });


  //***************************************************************************************/
  // Provide a private route for registering a new publisher
  //***************************************************************************************/
  app.get("/regAdmin", function (req, res) {
    res.render("regAdmin", {});
  });


  //***************************************************************************************/
  // Provide a route for those publishing a question
  //***************************************************************************************/
  app.get("/publish", function (req, res) {
    var PORT = require('../server').PORT;
    res.render("publish", { msg: "Publisher Panel" });
  });


  //***************************************************************************************/
  // Provide a route for those subscribing to the channel
  //***************************************************************************************/
  app.get("/subscribe", function (req, res) {
    res.render("subscribe", { msg: "Poll Vault App Listening..." });
  });

  //***************************************************************************************/
  // Render 404 page for any unmatched routes
  //***************************************************************************************/
  app.get("*", function (req, res) {
    res.render("404");
  });
};
