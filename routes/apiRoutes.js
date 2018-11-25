var db = require("../models");

module.exports = function (app) {
// Get all examples
app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

// Create a new example
app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });



//***************************************************************************************/
// Get the record where the UTC matches the values supplied
//***************************************************************************************/
app.get("/api/posts/:UTC", function(req, res) {
  console.log("routeHandle = " + req.params.UTC);
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
// Add a record to the questions table when a new question is asked
//***************************************************************************************/
  app.post("/api/question", function (req, res) {
    console.log(req.body);
    db.Question.create({
      UTC: req.body.UTC,
      prompt: req.body.prompt
    })
      .then(function (dbQuestion) {
        res.json(dbQuestion);
        console.log("dbQuestion = " + dbQuestion);
        console.log("JSON.dbQuestion = " + JSON.stringify(dbQuestion));
      });
  });


//***************************************************************************************/
// Add a record to the response table when a new response is received
//***************************************************************************************/
app.post("/api/response", function (req, res) {
    console.log(req.body);
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
