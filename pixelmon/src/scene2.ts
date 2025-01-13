import Phaser from "phaser";
import { POKEMON } from "./pokemon";

export default class scene2 extends Phaser.Scene {

    //generating random pokemon
    
    keys = Object.keys(POKEMON) as Array<keyof typeof POKEMON>; 
    randomIndex = Math.floor(Math.random() * this.keys.length); 
    pokemon = this.keys[this.randomIndex];

   


    constructor() {
        super("scene2");
    }
    preload()
    {   
        this.load.image("battleScene","src/assets/images/battle_scene_bg.jpg");
        this.load.atlas(this.pokemon, `src/assets/pokemon/${this.pokemon}_front.png`,`src/assets/pokemon_json/${this.pokemon}_front.json`);
        this.load.atlas("pikachu", "src/assets/pokemon/pikachu_back.png","src/assets/pokemon_json/pikachu_back.json");
        this.load.image("hpBg","src/assets/images/hp_bg.png");
    }
    create() {

        // battle background 
        const battleSceneBg= this.add.image(0, -0, "battleScene");
        battleSceneBg.setOrigin(0, 0);
        battleSceneBg.setScale(
            this.scale.width / battleSceneBg.width, 
            (this.scale.height -100) / battleSceneBg.height 
        );
        
        battleSceneBg.y-=50
        
        //sprite animation
        this.anims.create({
            key: 'opponent', 
            frames: this.anims.generateFrameNames(this.pokemon), 
            frameRate: 5, 
            repeat: -1,    // Loop indefinitely
        })
        
        this.anims.create({
            key: 'player', // Animation key
            frames: this.anims.generateFrameNames('pikachu'), // Default frames
            frameRate: 10, // Frames per second
            repeat: -1,    // Loop indefinitely
        })


        const opponent= this.add.sprite(700, 200, this.pokemon);
        
        opponent.setScale(3)
        opponent.play('opponent');

        //wild pokemon 

        const appear=this.add.text(465,410,`A wild ${this.pokemon} appeared!`,
            {
            fontSize: "24px",
            color: "#ffffff",
        }).setOrigin(0.5);

        const boxWidth = 200;
        const boxHeight = 75;
        const borderColor = 0xff0000; // Red color
        const borderWidth = 2;

        // Add a Graphics object for the border
        const option1 = this.add.graphics();
        option1.lineStyle(borderWidth, borderColor); // Border thickness and color
        option1.strokeRect(250, 430, boxWidth, boxHeight); // Draw the border
        const fight = this.add.text(
            250 + boxWidth / 2, // X position: Center of the box
            430 + boxHeight / 2, // Y position: Center of the box
            "Fight", // Text content
            {
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        fight.setOrigin(0.5);

        const option2 = this.add.graphics();
        option2.lineStyle(borderWidth, borderColor); 
        option2.strokeRect(470, 430, boxWidth, boxHeight);
        const run = this.add.text(
            470 + boxWidth / 2,
            430 + boxHeight / 2, 
            "Run", 
            {
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        run.setOrigin(0.5);

        option1.setInteractive(new Phaser.Geom.Rectangle(250, 440, boxWidth, boxHeight), Phaser.Geom.Rectangle.Contains);
        option2.setInteractive(new Phaser.Geom.Rectangle(470, 440, boxWidth, boxHeight), Phaser.Geom.Rectangle.Contains);

        // Add a click listener
        option1.on('pointerdown', () => {
            // Remove the current box and text
            option1.destroy();
            option2.destroy();
            run.destroy();
            fight.destroy();
            appear.destroy();
            this.data.set('pokemon', this.pokemon);


            // if (this.scene) {
            //     this.scene.start("scene3");
            // } else {
            //     console.error("Scene Manager is not available.");
            // }



            const player = this.add.sprite(200, 300 , "pikachu");
            player.setScale(3);
            player.play('player');

            const boxWidth = 200;
        const boxHeight = 50;
        const borderColor = 0xFFFF00;
        const borderWidth = 2;

        // Add a Graphics object for the border
        const border1 = this.add.graphics();
        border1.lineStyle(borderWidth, borderColor); // Border thickness and color
        border1.strokeRect(250, 400, boxWidth, boxHeight); // Draw the border
        const move1 = this.add.text(
            250 + boxWidth / 2, // X position: Center of the box
            400 + boxHeight / 2, // Y position: Center of the box
            "Thunderbolt", // Text content
            {
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        move1.setOrigin(0.5);

        const border2 = this.add.graphics();
        border2.lineStyle(borderWidth, borderColor);
        border2.strokeRect(470, 400, boxWidth, boxHeight); 
        const move2 = this.add.text(
            470 + boxWidth / 2, 
            400 + boxHeight / 2, 
            "Quick Attack", 
            {
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        move2.setOrigin(0.5);

        const border3 = this.add.graphics();
        border3.lineStyle(borderWidth, borderColor);
        border3.strokeRect(250, 470, boxWidth, boxHeight); 
        const move3 = this.add.text(
            250 + boxWidth / 2, 
            470 + boxHeight / 2, 
            "Electro Ball", 
            {
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        move3.setOrigin(0.5);

        const border4 = this.add.graphics();
        border4.lineStyle(borderWidth, borderColor);
        border4.strokeRect(470, 470, boxWidth, boxHeight);
        const move4 = this.add.text(
            470 + boxWidth / 2, 
            470 + boxHeight / 2, 
            "Tail Whip", 
            {
                fontSize: "24px",
                color: "#ffffff",
            }
        );
        move4.setOrigin(0.5);

        this.add.container(600, 275,[
            this.add.image(0,0,"hpBg").setOrigin(0,0).setScale(0.7,0.8), 
            this.add.text(30,20,"PIKACHU",{color:"#000000", fontStyle:"bold"}), 
            this.createHp(54, 45),
            this.add.text(30, 48 , "HP", {color: "#000000",fontStyle:"bold"} ).setOrigin(0,0),
            this.add.text(300,70,"25/25",{color:"#000000", fontStyle:"bold"}).setOrigin(1,0)
            
        ]);

        this.add.container(10, 100,[
            this.add.image(0,0,"hpBg").setOrigin(0,0).setScale(0.7,0.7), 
            this.add.text(30,20,this.pokemon,{color:"#000000", fontStyle:"bold"}), 
            this.createHp(54, 45),
            this.add.text(30, 48 , "HP", {color: "#000000",fontStyle:"bold"} ).setOrigin(0,0),
        ]);
        });

        option2.on('pointerdown',()=>{
            option1.destroy();
            option2.destroy();
            run.destroy();
            fight.destroy();
            appear.destroy();
            opponent.destroy();
        });
    }
    createHp(x: number, y: number) {
        const bar =this.add.graphics();
        bar.fillStyle(0x3CB371,1);
        bar.fillRoundedRect(x,y,250 , 20 ,5);
        bar.lineStyle(0.75, 0x000000);
        bar.strokeRoundedRect(x, y, 250, 20, 5);
        return bar;
}     
}
