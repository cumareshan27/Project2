//***********************************************************************************
// Lookup if this is a returning user and customize the landing page
//***********************************************************************************
$(document).ready(function () {
  var UID = localStorage.getItem("PollVault_User");
  var userObject = JSON.parse(UID);
  // console.log("userObject = " + userObject);
  if (userObject) {
    var userId = userObject.id;
    var userAlias = userObject.alias;
  };

  // console.log("userId = " + userId);
  // console.log("userAlias = " + userAlias);

//***********************************************************************************
// If the userAlias was found follow the IF.  If not found follow the ELSE.
//***********************************************************************************  
  if (userAlias) {
    var outputArea = $("#knownUser");
    var dynHTML = `<h5 id="knownWelcome">Welcome back &raquo ${userAlias}!</h5>
  <p id="buttonHolder" class="text-center"><a id="proceedButton" class="btn btn-primary" href="/subscribe" role="button">Proceed as "${userAlias}"</a><a id="newButton" class="btn btn-primary offset-1" href="/register" role="button">Register as new</a></p>`
    outputArea.html(dynHTML);
  } else {
    console.log("undefined userAlias = " + userAlias);
    var outputArea = $("#unknownUser");
    var dynHTML = `<h5 id="unknownWelcome">Welcome!  We don't have a previous user on this device.</h5>  
  <p id="identify">You must identify yourself to continue.
  <p id="truly">It's more fun that way.  Truly!</p>
  <p id="buttonHolder" class="text-center"><a id="registerButton" class="btn btn-primary" href="/register" role="button">Register</a></p>`
    outputArea.html(dynHTML);
  };

});




// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
