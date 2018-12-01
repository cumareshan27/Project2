//*******************************************************************************************/
// Create handles to access frequently referenced screen elements
//*******************************************************************************************/
var continueBtn = $("#continueBtn");
var leaveBtn = $("#leaveBtn");

//*******************************************************************************************/
// Give publisher rights to devices that access and confirm their intent
//*******************************************************************************************/
var handleRegistration = function (event) {
  event.preventDefault();
  console.log("User clicked register...");

  var adminRecord = {
    secret: "letMEin"
  };

  //*******************************************************************************************/
  // Write the secret to the device's local storage 
  //*******************************************************************************************/
  localStorage.setItem("PollVault_Admin", JSON.stringify(adminRecord));
  console.log("Admin Record = " + JSON.stringify(adminRecord));
  window.location.href = "/publish";
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
leaveBtn.on("click", handleLeaveRequest);