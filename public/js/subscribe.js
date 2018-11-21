var outputArea = $("#promptArea");
var surveyText = $("#surveyText");
var suveryBtn1 = $("#surveyButton1");
var suveryBtn2 = $("#surveyButton2");
var leaveButton = $("#leaveButton");

// var PORT = process.env.PORT || 3000;
// var socket = io.connect("http://localhost:" + PORT);
// var socket = io.connect("http://localhost:3000");
var socket = io.connect();

socket.on("prompt", function(data){
  console.log("message from pub:  " + JSON.stringify(data));
  outputArea.html(data.message);
  // outputArea.html('<p>' + data.message + '</p>');
  // outputArea.val('<p>' + data.message + '</p>');
  // $("#promptArea").html(data.message);
  // output.innerHTML = '<p>' + data.message + '</p>';
});

var handleLeaveRequest = function(event) {
  event.preventDefault();
  console.log("Leave button triggered");
// Do your exit stuff in here
// Launch a new screen perhaps
};

var handleButton1 = function(event) {
  event.preventDefault();
  console.log("Button 1 triggered");
// Do your exit stuff in here
// Launch a new screen perhaps
};

var handleButton2 = function(event) {
  event.preventDefault();
  console.log("Button 2 triggered");
// Do your exit stuff in here
// Launch a new screen perhaps
};

promptB1.on("click", handleButton1);
promptB2.on("click", handleButton2);
leaveButton.on("click", handleLeaveRequest);