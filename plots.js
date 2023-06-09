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







// Pie Chart

fetch("http://127.0.0.1:5000/player_scores")
  .then(response => response.json())
  .then(data => {
    // Process the retrieved JSON data
    console.log(data);

    // Update your HTML elements with the data
    let container = document.getElementById("container");

    // Create HTML elements and populate them with the data
    data.forEach(player => {
      let playerElement = document.createElement("div");
      playerElement.textContent = `${player.Player}: ${player.GP} GP, ${player.GS} GS`;

      container.appendChild(playerElement);
    });
  })
  .catch(error => {
    // Handle any errors
    console.log(error);
  });

let playerInfoApi = "http://127.0.0.1:5000/player_scores";

function init() {
  // Fetch player info and scores from the API
  d3.json(playerInfoApi).then(function(data) {
    let dropdownMenu = d3.select("#selDataset");

    // Populate the dropdown menu with player names
    data.forEach(function(player) {
      dropdownMenu.append("option")
        .attr("value", player.Player)
        .text(player.Player);
    });

    // Initialize the chart with the first player
    let initialPlayer = data[0].Player;
    updatePlot(initialPlayer);
  });
}

// Function to update the pie chart
function updatePlot(player) {
  // Fetch player scores for 2022 from the API
  let scoresApi = `http://localhost:5000/player_scores?player=${player}&year=2022`;
  d3.json(scoresApi).then(function(scores) {
    let labels = ["GP", "GS", "AST", "PTS", "TRB"];
    let values = [scores.GP, scores.GS, scores.AST, scores.PTS, scores.TRB];

    let dataPlot = [{
      labels: labels,
      values: values,
      type: 'pie'
    }];

    let layout = {
      title: `Player Scores for ${player} (2022)`
    };

    // Update the chart
    Plotly.newPlot("plot", dataPlot, layout);
  });
}

// Function called by DOM changes
function refreshPlot() {
  let dropdownMenu = d3.select("#selDataset");
  let selectedPlayer = dropdownMenu.property("value");
  updatePlot(selectedPlayer);
}

// Initialize the page
init();

// On change to the dropdown menu, call refreshPlot()
d3.selectAll("#selDataset").on("change", refreshPlot);






// Line Chart

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

