// NBA team locations
const nbaTeams = [
    { name: "Atlanta Hawks", lat: 33.7573, lon: -84.3963, logo: "../img/58419be4a6515b1e0ad75a58.png"},
    { name: "Boston Celtics", lat: 42.3662, lon: -71.0621, logo: "../img/58419c6aa6515b1e0ad75a61.png"},
    { name: "Brooklyn Nets", lat: 40.6826, lon: -73.9754, logo: "../img/58419c7ba6515b1e0ad75a62.png"},
    { name: "Charlotte Hornets", lat: 35.2251, lon: -80.8392, logo: "../img/58419bd7a6515b1e0ad75a57.png"},
    { name: "Chicago Bulls", lat: 41.8807, lon: -87.6742, logo: "../img/58419cf6a6515b1e0ad75a6b.png"},
    { name: "Cleveland Cavaliers", lat: 41.4965, lon: -81.6882, logo: "../img/58419c8da6515b1e0ad75a63.png"},
    { name: "Dallas Mavericks", lat: 32.7906, lon: -96.8102, logo: "../img/58419cd6a6515b1e0ad75a68.png"},
    { name: "Denver Nuggets", lat: 39.7487, lon: -105.0077, logo: "../img/58419b70a6515b1e0ad75a50.png"},
    { name: "Detroit Pistons", lat: 42.3410, lon: -83.0550, logo:"../img/58419c4ca6515b1e0ad75a5f.png"},
    { name: "Golden State Warriors", lat: 37.7503, lon: -122.2024, logo:"../img/58419ce2a6515b1e0ad75a69.png"},
    { name: "Houston Rockets", lat: 29.7508, lon: -95.3621, logo:"../img/58419ceda6515b1e0ad75a6a.png"},
    { name: "Indiana Pacers", lat: 39.7639, lon: -86.1555, logo:"../img/58419b8da6515b1e0ad75a52.png"},
    { name: "LA Clippers", lat: 34.0430, lon: -118.2673, logo: "../img/58419c59a6515b1e0ad75a60.png"},
    { name: "Los Angeles Lakers", lat: 34.0430, lon: -118.2673, logo:"../img/62066c9fd7b91b0004122608.png"},
    { name: "Memphis Grizzlies", lat: 35.1383, lon: -90.0505, logo:"../img/58419c00a6515b1e0ad75a5a.png"},
    { name: "Miami Heat", lat: 25.7814, lon: -80.1870, logo:"../img/58419cafa6515b1e0ad75a65.png"},
    { name: "Milwaukee Bucks", lat: 43.0451, lon: -87.9173, logo: "../img/58419ba7a6515b1e0ad75a54.png"},
    { name: "Minnesota Timberwolves", lat: 44.9795, lon: -93.2760, logo:"../img/58419bc5a6515b1e0ad75a56.png"},
    { name: "New Orleans Pelicans", lat: 29.9490, lon: -90.082, logo:"../img/58419b9ba6515b1e0ad75a53.png"},
    { name: "New York Knicks", lat: 40.7505, lon: -73.9934, logo:"../img/58419cc8a6515b1e0ad75a67.png"},
    { name: "Oklahoma City Thunder", lat: 35.4634, lon: -97.5151, logo:"../img/58419c20a6515b1e0ad75a5c.png"},
    { name: "Orlando Magic", lat: 28.5392, lon: -81.3839, logo: "../img/58419b7da6515b1e0ad75a51.png"},
    { name: "Philadelphia 76ers", lat: 39.9012, lon: -75.1720, logo:"../img/58419ca3a6515b1e0ad75a64.png"},
    { name: "Phoenix Suns", lat: 33.4458, lon: -112.0712, logo:"../img/58419d52a6515b1e0ad75a6d.png"},
    { name: "Portland Trail Blazers", lat: 45.5316, lon: -122.6668, logo:"../img/58419c2fa6515b1e0ad75a5d.png"},
    { name: "Sacramento Kings", lat: 38.5802, lon: -121.4998, logo:"../img/58419c3da6515b1e0ad75a5e.png"},
    { name: "San Antonio Spurs", lat: 29.4271, lon: -98.4375, logo:"../img/58419cbca6515b1e0ad75a66.png"},
    { name: "Toronto Raptors", lat: 43.6435, lon: -79.3791, logo:"../img/58419bf3a6515b1e0ad75a59.png"},
    { name: "Utah Jazz", lat: 40.7683, lon: -111.9011, logo:"../img/58419bb6a6515b1e0ad75a55.png"},
    { name: "Washington Wizards", lat: 38.8981, lon: -77.0209, logo:"../img/58419c12a6515b1e0ad75a5b.png"}
  ];
  
  // Initialize the Leaflet map
  const map = L.map("map").setView([36.8283, -95.5795], 4);
  
 // Add the base tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org'>OpenStreetMap</a> contributors"
  }).addTo(map);

  // Calculate the radius of each team's bubble based on the statistic
const maxStat = Math.max(...nbaTeams.map((team) => team.statistic));
const minStat = Math.min(...nbaTeams.map((team) => team.statistic));
const radiusScale = 20; // Adjust this value to scale the bubble size

// Create a group for all team markers
const teamMarkers = L.layerGroup().addTo(map);

// Function to update the map based on the selected team
function updateMap(selectedTeam) {
    teamMarkers.clearLayers(); // Clear all markers from the map

    nbaTeams.forEach((team) => {
        if (selectedTeam === "all" || team.name === selectedTeam) {
            const icon = L.icon({
                iconUrl: team.logo,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20]
            });

            const marker = L.marker([team.lat, team.lon], { icon });
            marker.bindPopup(`<b>${team.name}</b><br>${team.statistic}`);

            // Add the marker to the team markers group
            teamMarkers.addLayer(marker);
        }
    });
}

// Event listener for the dropdown menu
const teamSelector = document.getElementById('selDataset');
teamSelector.addEventListener('change', function (event) {
    const selectedTeam = event.target.value;
    updateMap(selectedTeam);
});

// Initial map setup
updateMap('all');
