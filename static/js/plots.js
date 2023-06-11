

const teamDataApiUrl = "https://nbadashboardproject.azurewebsites.net/teams";
const playerScoresApiUrl = "https://nbadashboardproject.azurewebsites.net/player_scores";
const playerInfoApiUrl = "https://nbadashboardproject.azurewebsites.net/player_info";

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
  let dropdownMenu = d3.select("#selDataset");
  let filter = dropdownMenu.property("value");
  
  d3.json(teamDataApiUrl).then((data) => { 
    let filteredData = data.filter((d) => d.Team === filter);
    
    let dataPlot = [
      { x: Object.keys(filteredData[0].PPG), y: Object.values(filteredData[0].PPG), type: "line", name: "PPG" },
      { x: Object.keys(filteredData[0].APG), y: Object.values(filteredData[0].APG), type: "line", name: "APG" },
      { x: Object.keys(filteredData[0].RPG), y: Object.values(filteredData[0].RPG), type: "line", name: "RPG" }
    ];
    
    let layout = { 
      title: "Team Scores", 
      xaxis: { title: "Games" }, 
      yaxis: { title: "Scores" } 
    };
    
    Plotly.newPlot("teamLineChart", dataPlot, layout);
  });
}


function updateTeamLineChart(team, playerScores) {
  // Update the team line chart based on the selected team
  
  // Filter the player scores data for the selected team
  let filteredPlayerScores = playerScores.filter((d) => d.Team === team);
  
  // Process the filtered data and update the chart
  // ...
}

function updatePlayerPieChart(team, playerInfo) {
  // Update the player pie chart based on the selected team
  
  // Filter the player info data for the selected team
  let filteredPlayerInfo = playerInfo.filter((d) => d.Team === team);
  
  // Process the filtered data and update the chart
  // ...
}
