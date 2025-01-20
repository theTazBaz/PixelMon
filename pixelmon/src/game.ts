import Phaser from 'phaser';
import { POKEMON } from './pokemon';
import scene1 from './scene1';
import scene2 from './scene2';
// import scene3 from './scene3';
const config = {
    type: Phaser.AUTO,
    // scale:{        
    //     mode : Phaser.Scale.FIT,
    // },
    width: 960,
    height: 540,
    scene: [scene1,scene2],
    backgroundColor: '#000000', // Ensure background contrast
};

new Phaser.Game(config);

