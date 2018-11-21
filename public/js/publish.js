var questionText = $("#promptInput");
var questionBtn1 = $("#promptBtn1");
var questionBtn2 = $("#promptBtn2");
var sendBtn = $("#sendButton");
var leaveButton = $("#leaveButton");
var closePollButton = $("#closePollButton");

// var { app, PORT } = require('../../server');
// var PORT = process.env.PORT || 3000;
// var socket = io.connect("http://localhost:" + PORT);
var socket = io.connect();
// var socket = io.connect("http://localhost:3000");


// var message = document.getElementById('question');
// var btn = document.getElementById('sendBtn');
// var output = document.getElementById('output');

//This gets passed and object "Post" containin the data to be posted to the DB
function recordQuestion(Post) {
  $.post("/api/question/", Post, function() {
    // window.location.href = "/";
    console.log("Posted:  " + JSON.stringify(Post));
  });
}


sendBtn.on("click", function(){
  console.log("Send button was pressed...");
  console.log("questionText:  " + questionText.val());
  console.log("questionBtn1:  " + questionBtn1.val());
  console.log("questionBtn2:  " + questionBtn2.val());

  var newQuestion = {
    prompt: questionText.val()
  };
recordQuestion(newQuestion);

  var contents = `<h5 class="mb-3">${questionText.val()}</h5>
  <button class="btn btn-primary mt-2 mb-2" id="promptB1" value=${questionBtn1.val()}>${questionBtn1.val()}</button><br>
  <button class="btn btn-primary mt-2 mb-2" id="promptB2" value=${questionBtn2.val()}>${questionBtn2.val()}</button>` 
  // var contents = "<h3>" + questionText.val() + "</h3>" 


  socket.emit("prompt",{
    message: contents
  });
    // socket.emit("prompt",{
    //   message: questionText.val(),
    //   button1: questionBtn1.val(),
    //   button2: questionBtn2.val()}
    //   );
    console.log("Message sent to server for distribution.");
});

var handleCloseRequest = function(event) {
  event.preventDefault();
  console.log("Poll was closed by admin.");
  // var contents = "<h5>Previous poll has closed.<br>No active poll.</h5>"; 
  var contents = ""; 

  socket.emit("prompt",{
    message: contents
  });
    console.log("Poll Close sent to server for distribution.");
    // Clear the publisher form values after poll has closed
    questionText.val("");
    questionBtn1.val("");
    questionBtn2.val("");
  };


var handleLeaveRequest = function(event) {
  event.preventDefault();
// Do your exit stuff in here
// Launch a new screen perhaps
};


closePollButton.on("click", handleCloseRequest);
leaveButton.on("click", handleLeaveRequest);