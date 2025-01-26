import Phaser from "phaser";
import { HealthBar } from "./health-bar";
import { BattlePokemon } from "./battle-pokemon";
import { enemyPokemon } from "./enemy-pokemon";

export default class scene2 extends Phaser.Scene {
   
   activeOpponentPokemon!:BattlePokemon;

    constructor() {
        super("scene2");
    }

    preload() {
        this.load.image("battleScene", "src/assets/images/battle_scene_bg.jpg");
        this.load.atlas("bulbasaur", "src/assets/pokemon/bulbasaur_front.png", "src/assets/pokemon_json/bulbasaur_front.json");
        this.load.atlas("pikachu", "src/assets/pokemon/pikachu_back.png", "src/assets/pokemon_json/pikachu_back.json");
        this.load.image("healthbar_background", "src/assets/images/healthbar_background.png");
        this.load.image("healthleft", "src/assets/images/healthbar_left.png");
        this.load.image("healthmid", "src/assets/images/healthbar_mid.png");
        this.load.image("healthright", "src/assets/images/healthbar_right.png");
        this.load.image("leftshadow", "src/assets/images/barHorizontal_shadow_left.png");
        this.load.image("midshadow", "src/assets/images/barHorizontal_shadow_mid.png");
        this.load.image("rightshadow", "src/assets/images/barHorizontal_shadow_right.png");
    }   

    create() {
        const battleSceneBg = this.add.image(0, 0, "battleScene");
        battleSceneBg.setOrigin(0, 0);
        battleSceneBg.setScale(
            this.scale.width / battleSceneBg.width,
            (this.scale.height - 100) / battleSceneBg.height
        );
        battleSceneBg.y -= 50;

        

        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNames('pikachu'),
            frameRate: 10,
            repeat: -1, // Loop indefinitely
        });


        const player = this.add.sprite(200, 300, "pikachu");
        player.setScale(3);
        player.play('player');

        const playerPokemonName = this.add.text(
            30*0.75,
            20*0.75,
            "Pikachu",
            {
                color:'#000000' ,
                fontSize: '22px',
            }
        );

        // Create health bar background
        const healthbarBackground = this.add.image(0, 0, "healthbar_background");
        healthbarBackground.setScale(0.75); // Adjust size of health bar background
        healthbarBackground.setOrigin(0, 0);

        // Add health bar and name to container
        const playerHealthBar = new HealthBar(this,34*0.75,34*0.75);
        this.add.container(550, 275, [
            healthbarBackground,
            playerPokemonName,
            playerHealthBar.container,
            this.add.text(
                playerPokemonName.width+40*0.75,
                26*0.75,
                "Lvl 1",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                }
            ),
            this.add.text(
                30*0.75,
                55*0.75,
                "HP",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                    fontStyle:'italic',
                }
            ),
            this.add.text(
                443*0.75,
                90*0.75,
                "25/25",
                {
                    color:'#000000' ,
                    fontSize: '12px',
                    
                }
            ).setOrigin(1,0),
        ]);

        this.activeOpponentPokemon = new enemyPokemon({
            scene:this,
            _pokemonDetails:{
                name: 'bulbasaur',
                assetKey: 'bulbasaur',
                maxHp: 25,
                currentHp: 25,
                baseAttack: 5,
                attackIds:[]
            }

            });
    

        const opponentPokemonName = this.add.text(
            30*0.75,
            20*0.75,
            "Bulbasaur",
            {
                color:'#000000' ,
                fontSize: '22px',
            }
        );
        const opphealthbarBackground = this.add.image(0, 0, "healthbar_background");
        opphealthbarBackground.setScale(0.75); // Adjust size of health bar background
        opphealthbarBackground.setOrigin(0, 0);
        // Add health bar and name to container
        const opponentHealthBar = this.activeOpponentPokemon._healthBar;
        this.add.container(50, 25, [
            opphealthbarBackground,
            opponentPokemonName,
            opponentHealthBar.container,
            this.add.text(
                opponentPokemonName.width+40*0.75,
                26*0.75,
                "Lvl 1",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                }
            ),
            this.add.text(
                30*0.75,
                55*0.75,
                "HP",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                    fontStyle:'italic',
                }
            ),
            this.add.text(
                443*0.75,
                90*0.75,
                "25/25",
                {
                    color:'#000000' ,
                    fontSize: '12px',
                    
                }
            ).setOrigin(1,0),
        ]);

        playerHealthBar.setMeterPercentageAnimated(0.5);
        this.activeOpponentPokemon.takeDamage(10);
       
        }
       
}
