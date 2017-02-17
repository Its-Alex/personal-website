particlesJS.load('particles-js', 'asset/particles.json');

var doughnutOptions = {
  segmentShowStroke : true,
  segmentStrokeColor : "#333",
  segmentStrokeWidth : 2,
  percentageInnerCutout : 60,
  animation : true,
  animationSteps : 100,
  animationEasing : "easeOutBounce",
  animateRotate : true,
  animateScale : true,
}

var doughnutData = [
  {
    label: "C",
    value: 100,
    color: "#CFC6C0",
  },
  {
    label: "C++",
    value : 70,
    color : "#8F8985",
  },
  {
    label: "JS",
    value : 50,
    color : "#5D5956",
  },
  {
    label: "HTML",
    value : 40,
    color : "#43403E",
  },
  {
    label: "CSS",
    value : 40,
    color : "#222",
  }
]

// Get the context of the Doughnut Chart canvas element
var ctx = document.getElementById("doughnutChart").getContext("2d");

// Create the Doughnut Chart
var mydoughnutChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);