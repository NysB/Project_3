# Import the dependencies.
import numpy as np
import sqlalchemy
from datetime import datetime
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///NBA_stats.sqlite")

# reflect an existing database into a new model
base = automap_base()
# reflect the tables

base.prepare(autoload_with=engine)
# Save references to each table
team_table = base.classes.Team_table
player_score_table = base.classes.Player_score_table
player_info_table = base.classes.Player_info_table


# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return "Welcome to the NBA Stats API!"

@app.route("/teams")
def get_teams():
    # Query the team table and return the results as JSON
    teams = session.query(team_table).all()
    results = []
    for team in teams:
        results.append({
            "team": team.team,
            "gp": team.gp,
            "mpg": team.mpg
        })
    return jsonify(results)

@app.route("/player_scores")
def get_player_scores():
    # Query the player score table and return the results as JSON
    player_scores = session.query(player_score_table).all()
    results = []
    for player_score in player_scores:
        results.append({
            "name": player_score.name,
            "year": player_score.year,
            "gp": player_score.gp
        })
    return jsonify(results)

@app.route("/player_info")
def get_player_info():
    # Query the player info table and return the results as JSON
    player_info = session.query(player_info_table).all()
    results = []
    for info in player_info:
        results.append({
            "name": info.name,
            "current_team": info.current_team,
            "age": info.age
        })
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)