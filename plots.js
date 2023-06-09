// // Grab data
// let playerInfoApi = "http://localhost:5000/player_info";

// function init() {
//   d3.json(playerInfoApi).then(function(data) {
//       let filter = "
//       data = data['Survived']
//       let dataPlot = [{
//         x: Object.keys(data),
//         y: Object.values(data),
//         type: 'bar'
//       }]
//       Plotly.newPlot("plot", dataPlot);
//     });
//   }

// // Function called by DOM changes
// function refreshPlot() {
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a letiable
//   let filter = dropdownMenu.property("value");
//   // Call function to update the chart
//   d3.json(apiTitanic).then(function(data) {
//     data = data[filter]
//     let dataPlot = [{
//       x: Object.keys(data),
//       y: Object.values(data),
//       type: 'bar'
//     }]
//     Plotly.newPlot("plot", dataPlot);
//   });
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", refreshPlot);

// init();
// API endpoint for team data
let teamDataApi = "http://127.0.0.1:5000/teams";

function init() {
  // Fetch team data from the API
  d3.json(teamDataApi).then(function(data) {
    let teams = Object.keys(data);
    let rpgScores = teams.map(team => data[team].RPG);
    let apgScores = teams.map(team => data[team].APG);
    let ppgScores = teams.map(team => data[team].PPG);

    let dataPlot = [
      {
        x: teams,
        y: rpgScores,
        type: 'line',
        name: 'RPG'
      },
      {
        x: teams,
        y: apgScores,
        type: 'line',
        name: 'APG'
      },
      {
        x: teams,
        y: ppgScores,
        type: 'line',
        name: 'PPG'
      }
    ];

    let layout = {
      title: 'Team Scores',
      xaxis: {
        title: 'Teams'
      },
      yaxis: {
        title: 'Scores'
      }
    };

    // Update the chart
    Plotly.newPlot('plot', dataPlot, layout);
  });
}

// Function called by DOM changes
function refreshPlot() {
  // Fetch team data from the API
  d3.json(teamDataApi).then(function(data) {
    let teams = Object.keys(data);
    let rpgScores = teams.map(team => data[team].RPG);
    let apgScores = teams.map(team => data[team].APG);
    let ppgScores = teams.map(team => data[team].PPG);

    let dataPlot = [
      {
        x: teams,
        y: rpgScores,
        type: 'line',
        name: 'RPG'
      },
      {
        x: teams,
        y: apgScores,
        type: 'line',
        name: 'APG'
      },
      {
        x: teams,
        y: ppgScores,
        type: 'line',
        name: 'PPG'
      }
    ];

    // Update the chart
    Plotly.newPlot('plot', dataPlot, layout);
  });
}

// On change to the dropdown menu, call refreshPlot()
d3.selectAll("#selDataset").on("change", refreshPlot);

// Initialize the page
init();

