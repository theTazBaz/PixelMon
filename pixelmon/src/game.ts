import Phaser from 'phaser';
import scene1 from './scene1';
import scene2 from './scene2';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    scene: [scene1,scene2],
    backgroundColor: '#000000', // Ensure background contrast
};

new Phaser.Game(config);

