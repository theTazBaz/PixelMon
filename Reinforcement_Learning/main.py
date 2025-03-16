# from flask import Flask, request, jsonify
# import random
# import json
# import time
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app) 
# MOVES = {
#         "id": 17,
#         "name": "Rock Slide",
#         "animationName": "ROCK_SLIDE",
#         "type": "ROCK"
#     }

# @app.route('/fetchOpponentMove', methods=['GET'])
# def fetchOppMove():
#     try:
#         team1 = request.args.get('team1')
#         team2 = request.args.get('team2')

#         #sleep for 5 seconds and return a random move for now
#         #once above back and forth connection is established, call the model here and return it's output
#         time.sleep(2)  # Simulating processing time

#         # Choose a random move (replace this with RL model output)
#         move = random.choice(MOVES)

#         return jsonify({"move": move})

#     except json.JSONDecodeError:
#         return jsonify({"error": "Invalid JSON format"}), 400

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
import random
import time
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for all domains
CORS(app, resources={r"/*": {"origins": "*"}})  # <=== FIXED

MOVES = [
    {"id": 17, "name": "Rock Slide", "animationName": "ROCK_SLIDE", "type": "ROCK"},
    {"id": 18, "name": "Thunderbolt", "animationName": "THUNDERBOLT", "type": "ELECTRIC"},
    {"id": 19, "name": "Flamethrower", "animationName": "FLAMETHROWER", "type": "FIRE"},
]

@app.route('/fetchOpponentMove', methods=['GET'])
def fetchOppMove():
    try:
        team1 = request.args.get('team1')
        team2 = request.args.get('team2')

        time.sleep(2)  # Simulating processing time

        move = random.choice(MOVES)

        response = jsonify({"move": move})
        response.headers.add("Access-Control-Allow-Origin", "*")  # <=== FIXED

        return response

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
