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

  app.post("/api/question", function (req, res) {
    console.log(req.body);
    db.Question.create({
      prompt: req.body.prompt
    })
      .then(function (dbQuestion) {
        res.json(dbQuestion);
      });
  });


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



  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
