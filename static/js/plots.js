const teamDataApiUrl = "https://nbadashboardproject.azurewebsites.net/teams";
const playerScoresApiUrl = "https://nbadashboardproject.azurewebsites.net/player_scores";
const playerInfoApiUrl = "https://nbadashboardproject.azurewebsites.net/player_info";

function init() {
  Promise.all([getTeams(), getPlayerScores(), getPlayerInfo()])
    .then(([teams, playerScores, playerInfo]) => {
      populateDropdown(teams);
      const initialTeam = teams[0].Team;
      updateTeamBarChart(initialTeam, teams);
      updatePlayerPieChart(initialTeam, playerInfo);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTeams() {
  return fetch(teamDataApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function getPlayerScores() {
  return fetch(playerScoresApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function getPlayerInfo() {
  return fetch(playerInfoApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function populateDropdown(teams) {
  // Populate the dropdown with team names
  let dropdownMenu = document.getElementById("selDataset");
  teams.forEach((team) => {
    let option = document.createElement("option");
    option.value = team.Team;
    option.text = team.Team;
    dropdownMenu.appendChild(option);
  });

  dropdownMenu.addEventListener("change", () => {
    const selectedTeam = dropdownMenu.value;
    updateCharts(selectedTeam);
  });
}

function updateCharts(team) {
  Promise.all([getTeams(), getPlayerInfo()])
    .then(([teams, playerInfo]) => {
      const selectedTeam = teams.find((t) => t.Team === team);
      updateTeamBarChart(selectedTeam, teams);
      updatePlayerPieChart(selectedTeam, playerInfo);
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateTeamBarChart(team, teams) {
  const teamNames = teams.map((team) => team.Team);
  const apgScores = teams.map((team) => team.APG);
  const ppgScores = teams.map((team) => team.PPG);
  const rpgScores = teams.map((team) => team.RPG);

  let teamCategories = ["APG", "PPG", "RPG"];
  let teamScores = [apgScores, ppgScores, rpgScores];

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