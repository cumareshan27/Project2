// require("config.json").config();
var express = require("express");
var socket = require("socket.io");
var exphbs = require("express-handlebars");

var db = require("./models");
var env = process.env.NODE_ENV; 

var app = express();
var PORT = process.env.PORT || 3000;
var server;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false};


// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;   //change to true before commit
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  server = app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
}).then(function () {
  var io = socket(server);
  io.on('connection', function (socket) {
    console.log('connected on ' + socket.id); //look to push/pop connections into users list

    socket.on("prompt", function (data) {
      console.log("A message from publisher was received...");
      io.sockets.emit("prompt", data);
      console.log('The message was sent.');
    });
  });

});

module.exports = { app, PORT };