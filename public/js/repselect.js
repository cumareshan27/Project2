$(document).ready(function () {
  var leaveButton = $("#leaveButton");
  var generateButton = $("#generateBtn");
  var chartArea = $("#chartArea");
  var series = [];
  
  getQuestions();
  // var outputArea = $("#promptArea");




  function getQuestions() {
    $.get("/api/questions", makeQuestionList);
  };


  function makeQuestionList(data) {
    // console.log("data = " + JSON.stringify(data));
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


  // function getResponses(id) {
  //   $.get("/api/responses/" + id, makeResponseList);
  // };


  // function makeResponseList(data) {
  //   // console.log("data = " + JSON.stringify(data));
  //   if (!data.length) {
  //     window.location.href = "/reports";
  //   };
  //   for (var i = 0; i < data.length; i++) {
  //     var questionID = data[i].id;
  //     var questionTxt = data[i].prompt;
  //     var insertString = `<option value="${questionID}">${questionID} -- ${questionTxt}</option>`
  //     $("#promptSelect").append(insertString);
  //   };
  // };

  function processChartData(data) {
    console.log("In process chart data...");
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
        console.log("No matching value - Error")
      };
      console.log("Totals - Y/N/P = " + vYes + " " + vNo + " " + vPass);
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
    console.log("Generate Clicked...")
    event.preventDefault();

    var selectedID = $('#promptSelect').val();
    console.log("value = " + selectedID);

    $.get("/api/responses/" + selectedID, processChartData);
  };

  // var options = {
  //   chart: {
  //     height: 280,
  //     type: "radialBar",
  //   },

  //   series: [67],
  //   colors: ["#20E647"],
  //   plotOptions: {
  //     radialBar: {
  //       hollow: {
  //         margin: 0,
  //         size: "70%",
  //         background: "#293450"
  //       },
  //       track: {
  //         dropShadow: {
  //           enabled: true,
  //           top: 2,
  //           left: 0,
  //           blur: 4,
  //           opacity: 0.15
  //         }
  //       },
  //       dataLabels: {
  //         name: {
  //           offsetY: -10,
  //           color: "#fff",
  //           fontSize: "13px"
  //         },
  //         value: {
  //           color: "#fff",
  //           fontSize: "30px",
  //           show: true
  //         }
  //       }
  //     }
  //   },
  //   fill: {
  //     type: "gradient",
  //     gradient: {
  //       shade: "dark",
  //       type: "vertical",
  //       gradientToColors: ["#87D4F9"],
  //       stops: [0, 100]
  //     }
  //   },
  //   stroke: {
  //     lineCap: "round"
  //   },
  //   labels: ["Progress"]
  // };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);

  // chart.render();




  // var options = {
  //   chart: {
  //     type: 'line'
  //   },
  //   series: [{
  //     name: 'sales',
  //     data: [30,40,35,50,49,60,70,91,125]
  //   }],
  //   xaxis: {
  //     categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  //   }
  // }

  // var chart = new ApexCharts(document.querySelector("#chartArea"), options);

  // chart.render();







  //*******************************************************************************************/
  // This is the action to take if the user clicks the Leave button
  //*******************************************************************************************/
  var handleLeaveRequest = function (event) {
    event.preventDefault();
    window.location.href = "/";
  };


  // //*******************************************************************************************/
  // // Use event delegation to handle the dynamic buttons
  // //*******************************************************************************************/
  // $(document).on("click", "#promptB1", handleButton1);
  // $(document).on("click", "#promptB2", handleButton2);
  // $(document).on("click", "#passButton", handlePassRequest);


  // function() {
  //   var period = this.value;
  //   if (period=="") return; // please select - possibly you want something else here

  //   var report = "script/"+((period == "daily")?"d":"m")+"_report.php";
  //   loadXMLDoc(report,'responseTag');
  //   $('#responseTag').show();
  //   $('#list_report').hide();
  //   $('#formTag').hide(); 
  // }); 


  //*******************************************************************************************/
  // Assign an event handler to the Leave button and point it to the Leave function
  //*******************************************************************************************/
  generateButton.on("click", handleGenerateRequest);
  leaveButton.on("click", handleLeaveRequest);
});