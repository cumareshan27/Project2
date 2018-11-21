var questionText = $("#promptInput");
var questionBtn1 = $("#promptBtn1");
var questionBtn2 = $("#promptBtn2");
var sendBtn = $("#sendButton");
var leaveButton = $("#leaveButton");

// var { app, PORT } = require('../../server');
// var PORT = process.env.PORT || 3000;
// var socket = io.connect("http://localhost:" + PORT);
var socket = io.connect();
// var socket = io.connect("http://localhost:3000");


// var message = document.getElementById('question');
// var btn = document.getElementById('sendBtn');
// var output = document.getElementById('output');


sendBtn.on("click", function(){
  console.log("Send button was pressed...");
  console.log("questionText:  " + questionText.val());
  console.log("questionBtn1:  " + questionBtn1.val());
  console.log("questionBtn2:  " + questionBtn2.val());

  var contents = `<h5 class="mb-3">${questionText.val()}</h5>
  <button class="btn btn-primary mt-2 mb-2" id="promptB1">${questionBtn1.val()}</button><br>
  <button class="btn btn-primary mt-2 mb-2" id="promptB2">${questionBtn2.val()}</button>` 
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


var handleLeaveRequest = function(event) {
  event.preventDefault();
// Do your exit stuff in here
// Launch a new screen perhaps
};



leaveButton.on("click", handleLeaveRequest);