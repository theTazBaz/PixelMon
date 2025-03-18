from flask import Flask, request, jsonify
import random
import json
import time
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained Q-table
q_table = np.load("q_table.npy")

def discretize_state(state):
    """
    State vector:
    [agent_active_hp, opponent_active_hp, last_agent_damage, last_opponent_damage, agent_remaining]

    We use predefined bins for HP and damage; agent_remaining is an integer (1 to 4).
    """
    # Define bins for HP and damage
    hp_bins = np.array([0, 100, 200, 300, 400, 500])
    damage_bins = np.array([0, 20, 40, 60, 80, 100])

    # Discretize agent active HP: cap maximum index at len(hp_bins)-3 so the max index is 3.
    hp1_idx = np.digitize(state[0], hp_bins) - 1
    hp1_idx = min(hp1_idx, len(hp_bins) - 3)

    # Discretize opponent active HP
    hp2_idx = np.digitize(state[1], hp_bins) - 1
    hp2_idx = min(hp2_idx, len(hp_bins) - 3)

    # Discretize last agent damage
    dmg1_idx = np.digitize(state[2], damage_bins) - 1
    dmg1_idx = min(dmg1_idx, len(damage_bins) - 3)

    # Discretize last opponent damage
    dmg2_idx = np.digitize(state[3], damage_bins) - 1
    dmg2_idx = min(dmg2_idx, len(damage_bins) - 3)

    # Agent remaining: values from 1 to 4 → subtract 1 to get an index from 0 to 3.
    remain_idx = int(state[4]) - 1
    remain_idx = min(max(remain_idx, 0), 3)

    return (hp1_idx, hp2_idx, dmg1_idx, dmg2_idx, remain_idx)

def getState(team1, team2):
    """
    Convert team data from frontend to state vector for RL model.
    
    Expected team format:
    {
        "activePokemonIndex": 0,
        "pokemon": [
            {
                "name": "Pikachu",
                "hp": 100,
                "maxHp": 100,
                "type": "Electric",
                "moves": [...],
                "lastDamageDealt": 20
            },
            ...
        ],
        "lastDamageReceived": 15
    }
    
    Returns:
    [agent_active_hp, opponent_active_hp, last_agent_damage, last_opponent_damage, agent_remaining]
    """
    # Get AI agent's (team2) active Pokemon
    agent_active_idx = team2.get("activePokemonIndex", 0)
    agent_active_hp = team2["pokemon"][agent_active_idx]["hp"]
    
    # Get opponent's (team1) active Pokemon
    opponent_active_idx = team1.get("activePokemonIndex", 0)
    opponent_active_hp = team1["pokemon"][opponent_active_idx]["hp"]
    
    # Get last damage values
    last_agent_damage = team2.get("lastDamageDealt", 0)
    last_opponent_damage = team1.get("lastDamageDealt", 0)
    
    # Count remaining Pokemon for the agent (hp > 0)
    agent_remaining = sum(1 for p in team2["pokemon"] if p["hp"] > 0)
    
    return np.array([
        agent_active_hp,
        opponent_active_hp,
        last_agent_damage,
        last_opponent_damage,
        agent_remaining
    ], dtype=np.float32)

def translateAction(action, team):
    """
    Translate the RL model action (0-7) to a response for the frontend.
    Actions 0-3: Use a move
    Actions 4-7: Switch Pokemon
    """
    active_idx = team.get("activePokemonIndex", 0)
    active_pokemon = team["pokemon"][active_idx]
    
    if action < 4:  # Use a move
        # Ensure we have enough moves
        if len(active_pokemon.get("moves", [])) <= action:
            # Fallback to first move if the selected move index is invalid
            action = 0
            
        move_info = active_pokemon["moves"][action]
        return {
            "type": "move",
            "moveIndex": action,
            "moveName": move_info.get("name", f"Move {action+1}")
        }
    else:  # Switch Pokemon
        switch_idx = action - 4
        # Check if the Pokemon to switch to is alive
        if switch_idx < len(team["pokemon"]) and team["pokemon"][switch_idx]["hp"] > 0:
            return {
                "type": "switch",
                "pokemonIndex": switch_idx,
                "pokemonName": team["pokemon"][switch_idx]["name"]
            }
        else:
            # Fallback: use a move if the switch is invalid
            return {
                "type": "move",
                "moveIndex": 0,
                "moveName": active_pokemon["moves"][0].get("name", "Move 1")
            }

@app.route('/fetchOpponentMove', methods=['GET'])
def fetchOpponentMove():
    try:
        # Parse team data from the request
        team1_str = request.args.get('team1')
        team2_str = request.args.get('team2')
        
        if not team1_str or not team2_str:
            return jsonify({"error": "Missing team data"}), 400
        
        team1 = json.loads(team1_str)  # Player's team
        team2 = json.loads(team2_str)  # AI agent's team
        
        # Convert team data to state
        state = getState(team1, team2)
        
        # Get action from Q-table
        state_idx = discretize_state(state)
        action = int(np.argmax(q_table[state_idx]))
        
        # Translate action to a response for the frontend
        response_data = translateAction(action, team2)
        
        # Add the raw action for debugging
        response_data["rawAction"] = int(action)
        
        return jsonify(response_data)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)