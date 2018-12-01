//***********************************************************************************
// Lookup if this is a returning user and customize the landing page
//***********************************************************************************
$(document).ready(function () {
  var UID = localStorage.getItem("PollVault_User");
  var userObject = JSON.parse(UID);
  if (userObject) {
    var userId = userObject.id;
    var userAlias = userObject.alias;
  };


//***********************************************************************************
// If the userAlias was found follow the IF.  If not found follow the ELSE.
//***********************************************************************************  
  if (userAlias) {
    var outputArea = $("#knownUser");
    var dynHTML = `<div class="col-md-12"><h5 id="knownWelcome" class="mb-4">Welcome back "${userAlias}".  Should we get to it or do you want to register as someone new?</h5></div>
  <div class="row mt-4"></div>
  <div class="row mt-4"></div>
  <p id="buttonHolder" class="text-center mt-4"><a id="proceedButton" class="btn btn-primary" href="/subscribe" role="button">Proceed as "${userAlias}"</a><a id="newButton" class="btn btn-primary offset-1" href="/register" role="button">Register as new</a></p>
  <p id="buttonHolder2" class="text-center mt-4"><a id="reportsButton" class="btn btn-primary" href="/reports" role="button">Access Reports</a></p>
  `
    outputArea.html(dynHTML);
  } else {
    console.log("undefined userAlias = " + userAlias);
    var outputArea = $("#unknownUser");
    var dynHTML = `<div class="col-md-12"><h5 id="unknownWelcome" class="mb-4">Welcome!  We don't have a previous user on this device.</h5></div>  
  <p id="identify">You must identify yourself to continue.
  <p id="truly">It's more fun that way.  Truly!</p>
  <div class="row mt-4"></div>
  <div class="row mt-4"></div>
  <p id="buttonHolder" class="text-center mt-4"><a id="registerButton" class="btn btn-primary" href="/register" role="button">Register</a></p>`
    outputArea.html(dynHTML);
  };

});