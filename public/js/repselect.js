$(document).ready(function () {
  var leaveButton = $("#leaveButton");
  var generateButton = $("#generateBtn");
  var chartArea = $("#chartArea");
  var series = [];

  
  //*******************************************************************************************/
  // Invoke the function to obtain a list of questions from the database 
  //*******************************************************************************************/  
  getQuestions();


  //*******************************************************************************************/
  // Get a list of questions to populate the pull down selector
  //*******************************************************************************************/
  function getQuestions() {
    $.get("/api/questions", makeQuestionList);
  };


  //*******************************************************************************************/
  // Build the pull down selector using the questions returned 
  //*******************************************************************************************/
  function makeQuestionList(data) {
    if (!data.length) {
      window.location.href = "/reports";
    };
    for (var i = 0; i < data.length; i++) {
      var questionID = data[i].id;
      var questionTxt = data[i].prompt;
      var insertString = `<option value="${questionID}">${questionID} -- ${questionTxt}</option>`
      $("#promptSelect").append(insertString);
    };
  };


  //*******************************************************************************************/
  // Build the chart and display it
  //*******************************************************************************************/
  function processChartData(data) {
    if (!data.length) {
      window.location.href = "/reports";
    };
    var vYes = 0;
    var vNo = 0;
    var vPass = 0;

    for (var i = 0; i < data.length; i++) {
      var responseTxt = data[i].answer;
      if (responseTxt === "Yes") {
        vYes++;
      } else if (responseTxt === "No") {
        vNo++;
      } else if (responseTxt === "passed") {
        vPass++;
      } else {
      };
      series = [vYes, vNo, vPass];
      var options = {
        chart: {
          height: 280,
          width: 650,
          type: "pie",
        },
        series: series,
        labels: ["Yes", "No", "Pass"],
        // series: [1,1,1],
      };
    };
    var chart = new ApexCharts(document.querySelector("#chartArea"), options);
    chart.render();
  };


  //*******************************************************************************************/
  // This is the action to take if the user clicks the Generate button
  //*******************************************************************************************/
  var handleGenerateRequest = function (event) {
    event.preventDefault();
    var selectedID = $('#promptSelect').val();
    $.get("/api/responses/" + selectedID, processChartData);
  };


  //*******************************************************************************************/
  // This is the action to take if the user clicks the Leave button
  //*******************************************************************************************/
  var handleLeaveRequest = function (event) {
    event.preventDefault();
    window.location.href = "/";
  };


  //*******************************************************************************************/
  // Assign an event handler to the Leave button and point it to the Leave function
  //*******************************************************************************************/
  generateButton.on("click", handleGenerateRequest);
  leaveButton.on("click", handleLeaveRequest);
});