var db = require("../models");

module.exports = function (app) {


//***************************************************************************************/
// Get all questions to populate the reporting screen
//***************************************************************************************/
app.get("/api/questions", function(req, res) {
  db.Question.findAll({order: [['id', 'DESC']]}).then(function(dbQuestion) {
    res.json(dbQuestion);
  });
});


//***************************************************************************************/
// Get all response for a given question ID and send data to the reporting screen
//***************************************************************************************/
app.get("/api/responses/:ID", function(req, res) {
  db.Response.findAll({
    where: {Questionid: req.params.ID
    }
  }).then(function(dbResponse) {
    res.json(dbResponse);
  });
});


//***************************************************************************************/
// Get the question record where the UTC matches the values supplied
//***************************************************************************************/
app.get("/api/posts/:UTC", function(req, res) {
  db.Question.findOne({
    where: {
      UTC: req.params.UTC
    }
  })
    .then(function(dbQuestion) {
      res.json(dbQuestion);
    });
});


//***************************************************************************************/
// Get the user record where the UTC matches the values supplied
//***************************************************************************************/
app.get("/api/users/:UTC", function(req, res) {
  db.User.findOne({
    where: {
      UTC: req.params.UTC
    }
  })
    .then(function(dbUser) {
      res.json(dbUser);
    });
});


//***************************************************************************************/
// Add a record to the users table when a new user registers
//***************************************************************************************/
app.post("/api/users", function (req, res) {
  db.User.create({
    UTC: req.body.UTC,
    alias: req.body.alias,
    gender: req.body.gender,
    zip: req.body.zip,
    demo0: req.body.demo0,
    demo1: req.body.demo1,
    demo2: req.body.demo2
  })
    .then(function (dbUser) {
      res.json(dbUser);
    });
});


//***************************************************************************************/
// Add a record to the questions table when a new question is asked
//***************************************************************************************/
  app.post("/api/question", function (req, res) {
    db.Question.create({
      UTC: req.body.UTC,
      prompt: req.body.prompt
    })
      .then(function (dbQuestion) {
        res.json(dbQuestion);
      });
  });


//***************************************************************************************/
// Add a record to the response table when a new response is received
//***************************************************************************************/
app.post("/api/response", function (req, res) {
    db.Response.create({
      QuestionId: req.body.QuestionId,
      UserId: req.body.UserId,
      answer: req.body.answer
    })
      .then(function (dbResponse) {
        res.json(dbResponse);
      });
  });

};