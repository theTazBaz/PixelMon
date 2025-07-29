# 🎮 PixelMon – AI-Powered Web-Based Pokémon Game

**PixelMon** is a web-based recreation of the early gameplay from Pokémon Fire Red (Pallet Town to Viridian Forest), built using **PhaserJS**. The game features classic RPG mechanics, including movement, NPC interactions, wild encounters, and a turn-based battle system — enhanced with **AI-driven opponent behavior** using **Minimax Q-Learning**.

---

## 🌟 Features

- 🗺️ **Explorable World**: Includes Pallet Town, Viridian City, and Viridian Forest with interactive NPCs and seamless camera movement.
- ⚔️ **Turn-Based Battles**: Custom battle system supporting multi-Pokémon fights, attack/capture mechanics, and Pokémon switching.
- 🤖 **Smart AI Trainers**: Trainers use a Minimax-inspired Q-learning model to make strategic battle decisions.
- 🎮 **Wild Encounters**: Randomized wild Pokémon battles based on defined spawn logic.
- 🧠 **Reinforcement Learning Integration**: AI trained via self-play to handle adversarial situations and improve over time.

---

## 🛠️ Tech Stack

- **Frontend/Game Engine**: PhaserJS, TypeScript, Tiled
- **AI & Backend**: Python, NumPy, OpenAI Gym, JSON
- **Visualization & Debugging**: Matplotlib

---

## 🧠 AI Implementation Highlights

- Designed a two-agent, zero-sum reinforcement learning environment using Minimax Q-Learning.
- Implemented a mirrored Q-learning structure where both the agent and opponent maintain and update Q-tables.
- Agent trained through self-play against random strategies to develop generalized and robust decision-making.
- Optimized state representation to discretize HP and move space, reducing dimensionality and improving learning efficiency.

---

## 🎯 Project Goals

- Recreate nostalgic Pokémon mechanics with a modern web-based interface.
- Integrate RL to create more adaptive, intelligent in-game trainers.
- Explore adversarial reinforcement learning and its application in turn-based combat systems.

---

## 📈 Results

- Achieved steady win-rate improvement through training episodes (~30k+).
- Agent learned to counter aggressive or random strategies effectively.
- Developed an immersive gameplay loop combining game dev and machine learning.

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/4f781b2b-f5f4-4209-9add-4bb82ec2f2b9)
![image](https://github.com/user-attachments/assets/4e0ab6bc-388f-45e7-8c83-89fefdd5bc42)



---

## 🚀 Future Enhancements

- Extend maps beyond Viridian Forest to include additional regions and cities.
- Add status effects, more complex battle logic, and multiplayer support.
- Upgrade AI to use Deep Q-Networks (DQN) for better scalability.

---
