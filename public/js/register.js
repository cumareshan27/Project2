//*******************************************************************************************/
// Create handles to access frequently referenced screen elements
//*******************************************************************************************/
var continueBtn = $("#continueBtn");

//*******************************************************************************************/
// Define a few global variables
//*******************************************************************************************/
var currentUserID;
var currentAlias;


//*******************************************************************************************/
// Define send function as action #3 in a chained promise to get the question ID value
//*******************************************************************************************/
function writeUID(userID, userAlias) {
  console.log("----- writeUID -----");

  var userRecord = {
    id: userID,
    alias: userAlias
  };

  //*******************************************************************************************/
  // Write the user's ID to local storage 
  //*******************************************************************************************/
  localStorage.setItem("PollVault_User", JSON.stringify(userRecord));
  console.log("User Record = " + JSON.stringify(userRecord));
};


//*******************************************************************************************/
// Define the function as action #2 in a chained promise to get the question ID value
//*******************************************************************************************/
function getUID(Post) {
  console.log("----- getUID -----");
  var UTC = Post.UTC;
  console.log("Uid = " + UTC);
  //*******************************************************************************************/
  // Use sequelize to look up the user ID based on the UTC value by accessing a route
  //*******************************************************************************************/
  $.get("/api/users/" + UTC, function (data) {
    if (data) {
      console.log("THE RETURNED USERID IS:  " + data.id);
      console.log("THE RETURNED ALIAS IS:  " + data.alias);
      currentUserID = data.id;
      currentAlias = data.alias;
    }
  }).then(function () {
    writeUID(currentUserID, currentAlias);
    window.location.href = "/subscribe";
  });
};


//This gets passed and object "Post" containin the data to be posted to the DB
//*******************************************************************************************/
// Define the function as action #1 in a chained promise to get the user ID value
//*******************************************************************************************/
function recordUser(Post) {
  console.log("----- recordUser -----");
  //*******************************************************************************************/
  // Insert the new question into the table using sequelize function at this route
  //*******************************************************************************************/
  $.post("/api/users/", Post, function () {
  }).then(function () {
    console.log("Posted:  " + JSON.stringify(Post));
    getUID(Post);
  });
};


//*******************************************************************************************/
// Define a function to handle the registration
//*******************************************************************************************/
var handleRegistration = function (event) {
  event.preventDefault();
  console.log("User clicked continue...");
  var alias = $("#username").val();
  var gender = $('input[name=gender]:checked').val();
  var byear = $("#birthYear").val();
  var zip = $("#zip").val();
  var demoAttr = [];
  var DTS = new Date().getTime();
  $('input[name="demographic"]').each(function () {
    if ($(this).is(':checked')) {
      demoAttr.push("1");
    } else {
      demoAttr.push("0");
    };
  });

  var newUser = {
    UTC: DTS,
    alias: alias,
    gender: gender,
    byear: byear,
    zip: zip,
    demo0: demoAttr[0],
    demo1: demoAttr[1],
    demo2: demoAttr[2]
  };
  recordUser(newUser);
};


//*******************************************************************************************/
// This is the action to take if the user clicks the Leave button
//*******************************************************************************************/
var handleLeaveRequest = function (event) {
  event.preventDefault();
  window.location.href = "/";
};

//*******************************************************************************************/
// Assign an event handler to the Continue button and align to functions
//*******************************************************************************************/
continueBtn.on("click", handleRegistration);