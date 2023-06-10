// const teamDataApiUrl = "http://127.0.0.1:5000/teams";
// const playerScoresApiUrl = "http://127.0.0.1:5000/player_scores"
// const playerInfoApiUrl = "http://127.0.0.1:5000/player_info"

// init();

// function init () {
//   const teams = get_teams();
//   const player_scores = get_player_scores();
//   const player_info = get_player_info();

// }


// function get_teams() {
//   // Fetch team data from the API
//   d3.json(teamDataApiUrl).then(function(data) {
//     // Process the retrieved JSON data
//     console.log(data);
//     return data;
//   })
// }

// function get_player_scores() {
//   // Fetch player scores from the API
//   d3.json(playerScoresApiUrl).then(function(data) {
//     // Process the retrieved JSON data
//     console.log(data);
//     return data;
//   })
// }

// function get_player_info() {
//   // Fetch player info from the API
//   d3.json(playerInfoApiUrl).then(function(data) {
//     // Process the retrieved JSON data
//     console.log(data);
//     return data;
//   })
// }


// fetch("http://127.0.0.1:5000/player_scores")
//   .then(response => response.json())
//   .then(data => {
//     // Process the retrieved JSON data
//     console.log(data);

//     // Update your HTML elements with the data
//     let container = document.getElementById("container");

//     // Create HTML elements and populate them with the data
//     data.forEach(player => {
//       let playerElement = document.createElement("div");
//       playerElement.textContent = `${player.Player}: ${player.GP} GP, ${player.GS} GS`;

//       container.appendChild(playerElement);
//     });
//   })
//   .catch(error => {
//     // Handle any errors
//     console.log(error);
//   });


// function init_player_scores() {
//   // Fetch player info and scores from the API
//   d3.json(playerInfoApi).then(function(data) {
//     let dropdownMenu = d3.select("#selDataset");

//     // Populate the dropdown menu with player names
//     data.forEach(function(player) {
//       dropdownMenu.append("option")
//         .attr("value", player.Player)
//         .text(player.Player);
//     });

//     // Initialize the chart with the first player
//     let initialPlayer = data[0].Player;
//     updatePlot(initialPlayer);
//   });
// }

// // Function to update the pie chart
// function updatePlot(player) {
//   // Fetch player scores for 2022 from the API
//   let scoresApi = `http://localhost:5000/player_scores`;
//   d3.json(scoresApi).then(function(scores) {
//     let labels = ["GP", "GS", "AST", "PTS", "TRB"];
//     let values = [scores.GP, scores.GS, scores.AST, scores.PTS, scores.TRB];

//     let dataPlot = [{
//       labels: labels,
//       values: values,
//       type: 'pie'
//     }];

//     let layout = {
//       title: `Player Scores for ${player} (2022)`
//     };

//     // Update the chart
//     Plotly.newPlot("plot", dataPlot, layout);
//   });
// }

// // Function called by DOM changes
// function refreshPlot() {
//   let dropdownMenu = d3.select("#selDataset");
//   let selectedPlayer = dropdownMenu.property("value");
//   updatePlot(selectedPlayer);
// }

// // Initialize the page
// _player_scores();

// // On change to the dropdown menu, call refreshPlot()
// d3.selectAll("#selDataset").on("change", refreshPlot);






// // Line Chart


// function _player_scores() {
//   // Fetch team data from the API
//   d3.json(teamDataApi).then(function(data) {
//     let teams = Object.keys(data);
//     let rpgScores = teams.map(team => data[team].RPG);
//     let apgScores = teams.map(team => data[team].APG);
//     let ppgScores = teams.map(team => data[team].PPG);

//     let dataPlot = [
//       {
//         x: teams,
//         y: rpgScores,
//         type: 'line',
//         name: 'RPG'
//       },
//       {
//         x: teams,
//         y: apgScores,
//         type: 'line',
//         name: 'APG'
//       },
//       {
//         x: teams,
//         y: ppgScores,
//         type: 'line',
//         name: 'PPG'
//       }
//     ];

//     let layout = {
//       title: 'Team Scores',
//       xaxis: {
//         title: 'Teams'
//       },
//       yaxis: {
//         title: 'Scores'
//       }
//     };

//     // Update the chart
//     Plotly.newPlot('plot', dataPlot, layout);
//   });
// }

// // Function called by DOM changes
// function refreshPlot() {
//   // Fetch team data from the API
//   d3.json(teamDataApi).then(function(data) {
//     let teams = Object.keys(data);
//     let rpgScores = teams.map(team => data[team].RPG);
//     let apgScores = teams.map(team => data[team].APG);
//     let ppgScores = teams.map(team => data[team].PPG);

//     let dataPlot = [
//       {
//         x: teams,
//         y: rpgScores,
//         type: 'line',
//         name: 'RPG'
//       },
//       {
//         x: teams,
//         y: apgScores,
//         type: 'line',
//         name: 'APG'
//       },
//       {
//         x: teams,
//         y: ppgScores,
//         type: 'line',
//         name: 'PPG'
//       }
//     ];

//     // Update the chart
//     Plotly.newPlot('plot', dataPlot, layout);
//   });
// }

// // On change to the dropdown menu, call refreshPlot()
// d3.selectAll("#selDataset").on("change", refreshPlot);

// // Initialize the page
// init();

const teamDataApiUrl = "http://127.0.0.1:5000/teams";
const playerScoresApiUrl = "http://127.0.0.1:5000/player_scores";
const playerInfoApiUrl = "http://127.0.0.1:5000/player_info";

init();

function init() {
  // Fetch teams, player scores, and player info from the APIs
  Promise.all([getTeams(), getPlayerScores(), getPlayerInfo()])
    .then(([teams, playerScores, playerInfo]) => {
      populateDropdown(teams);
      const initialTeam = teams[0].Team;
      updateTeamLineChart(initialTeam, playerScores);
      updatePlayerPieChart(initialTeam, playerInfo);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTeams() {
  // Fetch team data from the API
  return d3.json(teamDataApiUrl).then((data) => {
    // Process the retrieved JSON data
    console.log(data);
    return data;
  });
}

function getPlayerScores() {
  // Fetch player scores from the API
  return d3.json(playerScoresApiUrl).then((data) => {
    // Process the retrieved JSON data
    console.log(data);
    return data;
  });
}

function getPlayerInfo() {
  // Fetch player info from the API
  return d3.json(playerInfoApiUrl).then((data) => {
    // Process the retrieved JSON data
    console.log(data);
    return data;
  });
}

function populateDropdown(teams) {
  const dropdownMenu = d3.select("#teamDropdown");

  teams.forEach(function (team) {
    dropdownMenu.append("option").attr("value", team.Team).text(team.Team);
  });
}

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

function updatePlayerPieChart(team, playerInfo) {
  const selectedPlayer = playerInfo.find((player) => player.Team === team);

  const labels = ["AST", "PTS", "TRB"];
  const values = [selectedPlayer.AST, selectedPlayer.PTS, selectedPlayer.TRB];

  const dataPlot = [
    {
      labels: labels,
      values: values,
      type: "pie",
    },
  ];

  const layout = {
    title: `Player Scores for ${team}`,
  };

  // Update the chart
  Plotly.newPlot("playerPieChart", dataPlot, layout);
}

// Function called by
