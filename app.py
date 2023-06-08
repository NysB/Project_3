# Import the dependencies.
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///NBA_stats.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
Team_table= Base.classes.Team_table
Player_score_table = Base.classes.Player_score_table
Player_info_table = Base.classes.Player_info_table



#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
        
    session = Session(engine)
    
    results = session.execute('SELECT DISTINCT Player FROM Player_info_table')
    data = [row[0] for row in results]
    session.close()
    return render_template('index.html', data=data)


# teams route
@app.route("/teams")
def get_teams():
    # Query the team table and return the results as JSON

    session = Session(engine)
    teams = session.query(Team_table.Team, Team_table.PPG, Team_table.APG, Team_table.RPG).all()
    session.close()
    
    results = []
    for Team, PPG, APG, RPG in teams:
        team_dict = {}
        team_dict["Team"] = Team
        team_dict["PPG"] = PPG
        team_dict["APG"] = APG
        team_dict["RPG"] = RPG
        results.append(team_dict)
    
    return jsonify(results)


#  player scores route
@app.route("/player_scores")
def get_player_scores():
    # Query the Player_score_table and return the results as JSON
    
    session = Session(engine)
    player_scores = session.query(Player_score_table.Player, Player_score_table.Year, Player_score_table.GP, Player_score_table.GS).all()
    session.close()

    results = []
    for Player, Year, GP, GS in player_scores:
        player_score_dict = {}
        player_score_dict["Player"] = Player
        player_score_dict["Year"] = Year
        player_score_dict["GP"] = GP
        player_score_dict["GS"] = GS
        results.append(player_score_dict)
    
    return jsonify(results)


# player info route

@app.route("/player_info")
def get_player_info():
    # Query the player info table and return the results as JSON
    
    session = Session(engine)
    player_info = session.query(Player_info_table.Player, 
                                Player_info_table.Current_team, 
                                Player_info_table.Age, 
                                Player_info_table.Height,
                                Player_info_table.Weight,
                                Player_info_table.NBA_status,
                                Player_info_table.Draft_entry).all()
    session.close()

    results = []
    for Player, Current_team, Age, Height, Weight, NBA_status, Draft_entry in player_info:
        player_info_dict = {}
        player_info_dict["Player"] = Player
        player_info_dict["Current_team"] = Current_team
        player_info_dict["Age"] = Age
        player_info_dict["Height"] = Height
        player_info_dict["Weight"] = Weight
        player_info_dict["NBA Status"] = NBA_status
        player_info_dict["Draft Entry"] = Draft_entry
        results.append(player_info_dict)
    
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)