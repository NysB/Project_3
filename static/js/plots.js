

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
