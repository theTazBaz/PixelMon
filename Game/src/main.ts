import Phaser from 'phaser';
import "./style.css"
// import { POKEMON } from './pokemon';
import scene1 from './scene1';
import scene2 from './scene2';

const config = {
    type: Phaser.AUTO,
    // scale: {
    //   mode: Phaser.Scale.FIT,
    //   autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
    // },
    width: 960,
    height: 540,
    scene: [scene1, scene2],
    backgroundColor: '#000000', 
};

new Phaser.Game(config);


