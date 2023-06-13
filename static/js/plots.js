const teamDataApiUrl = "https://nbadashboardproject.azurewebsites.net/teams";
const playerScoresApiUrl = "https://nbadashboardproject.azurewebsites.net/player_scores";
const playerInfoApiUrl = "https://nbadashboardproject.azurewebsites.net/player_info";

function init() {
  // Fetch teams, player scores, and player info from the APIs
  Promise.all([getTeams(), getPlayerScores(), getPlayerInfo()])
    .then(([teams, playerScores, playerInfo]) => {
      populateDropdown(teams);
      const initialTeam = teams[0].Team;
      updateTeamBarChart(initialTeam, playerScores);
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






//originally populateDropdown function was not using the selected team to filter the data,
// nor was it passing the selected team to the update functions for the charts. This has been fixed.
// function populateDropdown(teams) {
//   let dropdownMenu = d3.select("#selDataset");
//   dropdownMenu.selectAll("option")
//     .data(teams)
//     .enter()
//     .append("option")
//     .text((team) => team.Team)
//     .attr("value", (team) => team.Team)
//     .property("selected", (team, i) => i === 0);
  
//   dropdownMenu.on("change", () => {
//     const selectedTeam = d3.select("#selDataset").node().value;
//     Promise.all([getPlayerScores(), getPlayerInfo()])
//       .then(([playerScores, playerInfo]) => {
//         updateCharts(selectedTeam, playerScores, playerInfo);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// }

// function updateCharts(team, playerScores, playerInfo) {
//   updateTeamLineChart(team, playerScores);
//   updatePlayerPieChart(team, playerInfo);
// }




// function updateTeamLineChart(team, playerScores) {
//   let filteredScores = playerScores.filter((score) => score.Player === team);
  
//   let dataPlot = [
//     { x: filteredScores.map((score) => parseInt(score.Year)), y: filteredScores.map((score) => parseInt(score.PTS)), type: "line", name: "PTS" },
//     { x: filteredScores.map((score) => parseInt(score.Year)), y: filteredScores.map((score) => parseInt(score.AST)), type: "line", name: "AST" },
//     { x: filteredScores.map((score) => parseInt(score.Year)), y: filteredScores.map((score) => parseInt(score.TRB)), type: "line", name: "TRB" }
//   ];
  
//   let layout = { 
//     title: "Team Scores", 
//     xaxis: { title: "Year" }, 
//     yaxis: { title: "Scores" } 
//   };
  
//   Plotly.newPlot("teamLineChart", dataPlot, layout);
// }

function populateDropdown(teams) {
  let dropdownMenu = d3.select("#selDataset");
  dropdownMenu.selectAll("option")
    .data(teams)
    .enter()
    .append("option")
    .text((team) => team.Team)
    .attr("value", (team) => team.Team)
    .property("selected", (team, i) => i === 0);
  
  dropdownMenu.on("change", () => {
    const selectedTeam = d3.select("#selDataset").node().value;
    Promise.all([getPlayerScores(), getPlayerInfo()])
      .then(([playerScores, playerInfo]) => {
        updateCharts(selectedTeam, playerInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function updateCharts(team, playerInfo) {
  updateTeamBarChart(team);
  updatePlayerPieChart(team, playerInfo);
}

function updateTeamBarChart(Team) {
  let teamCategories = ["APG", "PPG", "RPG"];
  let teamScores = [Team.APG, Team.PPG, Team.RPG];

  let dataPlot = [
    { x: teamCategories, y: teamScores, type: "bar" }
  ];

  let layout = {
    title: "Team Scores",
    xaxis: { title: "Category" },
    yaxis: { title: "Scores" }
  };

  Plotly.newPlot("teamBarChart", dataPlot, layout);
}

function updatePlayerPieChart(team, playerInfo) {
  let filteredInfo = playerInfo.filter((info) => info.Current_team === team);

  let playerNames = filteredInfo.map((info) => info.Player);
  let playerAges = filteredInfo.map((info) => parseInt(info.Age));

  let data = {
    labels: playerNames,
    datasets: [
      {
        data: playerAges,
        backgroundColor: generateRandomColors(playerNames.length), // Generate random colors for the pie slices
      },
    ],
  };

  function generateRandomColors(count) {
    let colors = [];
    for (let i = 0; i < count; i++) {
      let color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.8)`;
      colors.push(color);
    }
    return colors;
  }

  // Function to get a random value between min (inclusive) and max (exclusive)
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const canvas = document.getElementById("playerPieChart");

  let chart = Chart.getChart(canvas);

  if (chart) {
    chart.data = data;
    chart.options.title.text = "Player Ages";
    chart.update();
  } else {
    chart = new Chart(canvas, {
      type: "pie",
      data: data,
      options: {
        title: {
          display: true,
          text: "Player Ages",
        },
      },
    });
  }
}

init();






