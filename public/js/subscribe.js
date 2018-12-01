$(document).ready(function () {
  var outputArea = $("#promptArea");
  var leaveButton = $("#leaveButton");


  //*******************************************************************************************/
  // Check local storage to see if an app user has accessed the app before
  //*******************************************************************************************/
  var UID = localStorage.getItem("PollVault_User");
  var userObject = JSON.parse(UID);
  if (userObject) {
    var userId = userObject.id;
  } else {
    window.location.href = "/register";
  };


  //*******************************************************************************************/
  // Allow socket.io to auto-detect the port for dynamic deployments like Heroku
  //*******************************************************************************************/
  var socket = io.connect();


  //*******************************************************************************************/
  // Have socket.io listen for incoming messages and display to designated screen area as HTML
  //*******************************************************************************************/
  socket.on("prompt", function (data) {
    outputArea.html(data.message);
  });


  //*******************************************************************************************/
  // This is the action to take if the user clicks the Leave button
  //*******************************************************************************************/
  var handleLeaveRequest = function (event) {
    event.preventDefault();
    window.location.href = "/";
  };


  //*******************************************************************************************/
  // Submit a default "passed" response when the user opts out of the question
  //*******************************************************************************************/
  var handlePassRequest = function (event) {
    event.preventDefault();
    var qId = $(this).data("id");
    var newResponse = {
      QuestionId: qId,
      UserId: userId,
      answer: "passed"
    };
    recordResponse(newResponse);
    $("#promptArea").empty();
  };


  //*******************************************************************************************/
  // Submit the related response when the user picks button #1
  //*******************************************************************************************/
  var handleButton1 = function (event) {
    event.preventDefault();
    var qId = $(this).data("id");
    var newResponse = {
      QuestionId: qId,
      UserId: userId,
      answer: this.value
    };
    recordResponse(newResponse);
    $("#promptArea").empty();
  };


  //*******************************************************************************************/
  // Submit the related response when the user picks button #2
  //*******************************************************************************************/
  var handleButton2 = function (event) {
    event.preventDefault();
    var qId = $(this).data("id");
    var newResponse = {
      QuestionId: qId,
      UserId: userId,
      answer: this.value
    };
    recordResponse(newResponse);
    $("#promptArea").empty();
  };


  //*******************************************************************************************/
  // Define the function to post the user's response to the DB table
  //*******************************************************************************************/
  function recordResponse(Post) {
    $.post("/api/response/", Post, function () {
    });
  }


  //*******************************************************************************************/
  // Use event delegation to handle the dynamic buttons
  //*******************************************************************************************/
  $(document).on("click", "#promptB1", handleButton1);
  $(document).on("click", "#promptB2", handleButton2);
  $(document).on("click", "#passButton", handlePassRequest);


  //*******************************************************************************************/
  // Assign an event handler to the Leave button and point it to the Leave function
  //*******************************************************************************************/
  leaveButton.on("click", handleLeaveRequest);
});