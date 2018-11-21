var theDocument =  $("document");
var outputArea = $("#promptArea");
var surveyText = $("#surveyText");
var suveryBtn1 = $("#surveyButton1");
var suveryBtn2 = $("#surveyButton2");
var leaveButton = $("#leaveButton");
var passButton = $("#passButton");



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

var handlePassRequest = function(event) {
  event.preventDefault();
  console.log("Pass button triggered");
  var newResponse = {
    QuestionId: "5",
    UserId: "1",
    answer: "passed"
  };
  recordResponse(newResponse);
  $("#promptArea").empty();
};

var handleButton1 = function(event) {
  event.preventDefault();
  console.log("Button 1 triggered");
  console.log("Button 1 value = " + this.value);
  var newResponse = {
    QuestionId: "5",
    UserId: "1",
    answer: this.value
  };
  recordResponse(newResponse);
  $("#promptArea").empty();
// Do your exit stuff in here
// Launch a new screen perhaps
};

var handleButton2 = function(event) {
  event.preventDefault();
  console.log("Button 2 triggered");
  console.log("Button 2 value = " + this.value);
  var newResponse = {
    QuestionId: "5",
    UserId: "1",
    answer: this.value
  };
  recordResponse(newResponse);
  $("#promptArea").empty();
// Do your exit stuff in here
// Launch a new screen perhaps
};


function recordResponse(Post) {
  $.post("/api/response/", Post, function() {
    // window.location.href = "/";
    console.log("Posted:  " + JSON.stringify(Post));
  });
}


// Use event delegation to handle the dynamic buttons
$(document).ready(function(){
  $(document).on("click", "#promptB1", handleButton1);
  $(document).on("click", "#promptB2", handleButton2);

  // Provide the option to skip a question
  passButton.on("click", handlePassRequest);
  // Exit the admin function when clicked
  leaveButton.on("click", handleLeaveRequest);
});