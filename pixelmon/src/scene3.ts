// import Phaser from "phaser";
// import scene2 from "./scene2";


// export default class scene3 extends Phaser.Scene{
//     constructor(){
//         super("scene3");
//     }

//     preload(){
//         console.log("scene3")

//     }

//     create(){
//         //battle scene
//         const battleSceneBg= this.add.image(0, -0, "battleScene");
//         battleSceneBg.setOrigin(0, 0);
//         battleSceneBg.setScale(
//             this.scale.width / battleSceneBg.width, 
//             (this.scale.height -100) / battleSceneBg.height 
//         );
        
//         battleSceneBg.y-=50


//         //opponent pokemon 
//         const opponent= this.add.sprite(700, 200, scene2.pokemon);
        
//         opponent.setScale(3)
//         opponent.play('opponent');
//     }

// }