# Import the dependencies.
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///NBA_stats.sqlite")

# print(base.classes.keys())

# reflect an existing database into a new model
base = automap_base()
# reflect the tables
base.prepare(engine, reflect=True)

# Save references to each table
# Team_table= base.classes.Team_table
Player_score_table = base.classes.Player_score_table
Player_info_table = base.classes.Player_info_table


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


# teams route
# @app.route("/teams")
# def get_teams():
#     # Query the team table and return the results as JSON
#     teams = session.query(Team_table.Team, Team_table.PPG, Team_table.APG, Team_table.RPG).all()
#     results = []
#     for team in teams:
#         results.append({
#             "team": team.Team,
#             "PPG": team.PPG,
#             "APG": team.APG,
#             "RPG": team.RPG
#         })
#     return jsonify(results)

#  player scores route
@app.route("/player_scores")
def get_player_scores():
    # Query the Player_score_table and return the results as JSON
    player_scores = session.query(Player_score_table.Player, Player_score_table.RPG, Player_score_table.APG, Player_score_table.PPG).all()
    results = []
    for player_score in player_scores:
        results.append({
            "player": player_score.Player,
            "RPG": player_score.RPG,
            "APG": player_score.APG,
            "PPG": player_score.PPG
        })
    return jsonify(results)

# player info route

@app.route("/player_info")
def get_player_info():
    # Query the player info table and return the results as JSON
    player_info = session.query(Player_info_table).all()
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