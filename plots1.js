
const teamDataApiUrl = "http://127.0.0.1:5000/teams";
const playerScoresApiUrl = "http://127.0.0.1:5000/player_scores";
const playerInfoApiUrl = "http://127.0.0.1:5000/player_info";

// Fetch the JSON data and console log it
// Initialize the dashboard at start up 


// function init() {
//   d3.json(teamDataApiUrl).then(function(data) {
//       let filter = "Team" 
//       data = data['Team']//column 
//       let dataPlot = [{
//         x: Object.keys(data.Team),
//         y: Object.values(data.RPG),
//         type: 'line'
//       }]


//       let layout = {
//         height: 600,
//         width: 800
//       };


//       Plotly.newPlot("line", dataPlot, layout);
//     });
//   }



// // On change to the DOM, call getData()
// d3.selectAll("#teamDropdown").on("change", refreshPlot);


function updateTeamLineChart(team, playerScores) {
  const teamScores = playerScores.find((scores) => scores.Team === team);

  const rpgScores = teamScores.RPG;
  const apgScores = teamScores.APG;
  const ppgScores = teamScores.PPG;

  const dataPlot = [
    {
      x: Object.keys(rpgScores),
      y: Object.values(rpgScores),
      type: "line",
      name: "RPG",
    },
    {
      x: Object.keys(apgScores),
      y: Object.values(apgScores),
      type: "line",
      name: "APG",
    },
    {
      x: Object.keys(ppgScores),
      y: Object.values(ppgScores),
      type: "line",
      name: "PPG",
    },
  ];

  const layout = {
    title: "Team Scores",
    xaxis: {
      title: "Games",
    },
    yaxis: {
      title: "Scores",
    },
  };

  // Update the chart
  Plotly.newPlot("teamLineChart", dataPlot, layout);



}
  




  // Function called by DOM changes
function refreshPlot() {
  let dropdownMenu = d3.select("#teamDropdown");
  // Assign the value of the dropdown menu option to a letiable
  let filter = dropdownMenu.property("value");
  // Call function to update the chart
  d3.json(teamDataApiUrl).then(function(data) {
    data = data[filter]
    let dataPlot = [{
      x: Object.keys(data.Team),
      y: Object.values(data.RPG),
      type: 'bar'
    }]
    updatePlotly(data);
  });
}

function updatePlotly(newdata) {
  Plotly.restyle("line", "values", [newdata]);
}


// On change to the DOM, call getData()
//d3.selectAll("#teamDropdown").on("change", refreshPlot);

init();