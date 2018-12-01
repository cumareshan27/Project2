function makeCharts(){
    ///chart 
    
    var answerOne = 50;
    var answerTwo = 100;
    var answerThree = 150;
    
    var choiceName1 = "#choiceOne";
    var choiceName2 = "#choiceTwo";
    var choiceName3 = "#choiceThree";
    
    
    var options = {
                chart: {
                    width: 380,
                    type: 'pie',
                },
            
                labels: [choiceName1, choiceName2, choiceName3],
                series: [answerOne, answerTwo, answerThree],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
            var chart = new ApexCharts(
                document.querySelector("#chart"),
                options
            );
            chart.render();
        }
    
    
    function refreshPage(){
        window.location.reload();
    };
    