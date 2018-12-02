//*******************************************************************************************/
// Create handles to access frequently referenced screen elements
//*******************************************************************************************/
$(document).ready(function () {

  var isPublisher = localStorage.getItem("PollVault_Admin");
  var adminObject = JSON.parse(isPublisher);
  if (adminObject) {
    var secretPhrase = adminObject.secret;
  } else {
    window.location.href = "/";
    return adminObject;
  };


  //*******************************************************************************************/
  // Create handles to access frequently referenced screen elements
  //*******************************************************************************************/
  var questionText = $("#promptInput");
  var questionBtn1 = $("#promptBtn1");
  var questionBtn2 = $("#promptBtn2");
  var sendBtn = $("#sendButton");
  var leaveButton = $("#leaveButton");
  var closePollButton = $("#closePollButton");


  //*******************************************************************************************/
  // Define a few global variables
  //*******************************************************************************************/
  var currentQ;
  var DTS;


  //*******************************************************************************************/
  // Allow socket.io to auto-detect the port for dynamic deployments like Heroku
  //*******************************************************************************************/
  var socket = io.connect();


  //*******************************************************************************************/
  // Define send function as action #3 in a chained promise to get the question ID value
  //*******************************************************************************************/
  function sendWithQID(Post) {
    //*******************************************************************************************/
    // Build the HTML content to be develivered to subscribers
    //*******************************************************************************************/
    var contents = `<h5 class="mb-3" id="currentPrompt" data-id="${currentQ}">${questionText.val()}</h5>
  <button class="btn btn-primary mt-2 mb-2" id="promptB1" data-id="${currentQ}" value=${questionBtn1.val()}>${questionBtn1.val()}</button><br>
  <button class="btn btn-primary mt-2 mb-2" id="promptB2" data-id="${currentQ}" value=${questionBtn2.val()}>${questionBtn2.val()}</button><br> 
  <button class="btn btn-primary mt-2 mb-2" id="passButton" data-id="${currentQ}" value="pass">Pass on Question</button>`;
    //*******************************************************************************************/
    // Send the message contents using socket.io emit function
    //*******************************************************************************************/
    socket.emit("prompt", {
      message: contents
    });
  };


  //*******************************************************************************************/
  // Define the function as action #2 in a chained promise to get the question ID value
  //*******************************************************************************************/
  function getQID(Post) {
    var UTC = Post.UTC;
    //*******************************************************************************************/
    // Use sequelize to look up the question ID based on the UTC value by accessing a route
    //*******************************************************************************************/
    $.get("/api/posts/" + UTC, function (data) {
      if (data) {
        currentQ = data.id;
      }
    }).then(function () {
      sendWithQID(Post);
    });
  };


  //*******************************************************************************************/
  // Define the function as action #1 in a chained promise to get the question ID value
  //*******************************************************************************************/
  function recordQuestion(Post) {
    //*******************************************************************************************/
    // Insert the new question into the table using sequelize function at this route
    //*******************************************************************************************/
    $.post("/api/question/", Post, function () {
    }).then(function () {
      getQID(Post);
    });
  };


  //*******************************************************************************************/
  // Define an event handler for processing when the SEND button is clicked
  //*******************************************************************************************/
  sendBtn.on("click", function () {
    DTS = new Date().getTime();
    //*******************************************************************************************/
    // Build the newQuestion object to be processes by sequelize insert call
    //*******************************************************************************************/
    var newQuestion = {
      UTC: DTS,
      prompt: questionText.val(),
      button1: questionBtn1.val(),
      button2: questionBtn2.val()
    };
    //*******************************************************************************************/
    // Launch the first function to record the question and start the send processing
    //*******************************************************************************************/
    recordQuestion(newQuestion)
  });


  //*******************************************************************************************/
  // End a poll when ready to prevent users from responding to requests they let sit too long
  //*******************************************************************************************/
  var handleCloseRequest = function (event) {
    event.preventDefault();
    var contents = "<h5>Previous poll has closed.<br>No active poll.</h5>"; 
    //*******************************************************************************************/
    // Use socket.io to send default message or blank text to subscribers
    //*******************************************************************************************/
    socket.emit("prompt", {
      message: contents
    });
    //*******************************************************************************************/
    // Clear the screen on the publisher side to prevent resending the same poll
    //*******************************************************************************************/
  questionText.val("");
  questionBtn1.val("");
  questionBtn2.val("");
  };


  //*******************************************************************************************/
  // This is the action to take if the user clicks the Leave button
  //*******************************************************************************************/
  var handleLeaveRequest = function (event) {
    event.preventDefault();
    window.location.href = "/";
  };


  //*******************************************************************************************/
  // Assign an event handler to the Close Poll and Leave buttons and align to functions
  //*******************************************************************************************/
  closePollButton.on("click", handleCloseRequest);
  leaveButton.on("click", handleLeaveRequest);
});