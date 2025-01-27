import Phaser from "phaser";
import { HealthBar } from "./health-bar";
import { BattlePokemon } from "./battle-pokemon";
import { enemyPokemon } from "./enemy-pokemon";
import { playerPokemon } from "./player-pokemon";

export default class scene2 extends Phaser.Scene {
   
   activeOpponentPokemon!:BattlePokemon;
   activePlayerPokemon!:BattlePokemon;

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

        


        this.activePlayerPokemon = new playerPokemon({
            scene: this,
            _pokemonDetails: {
                name: "pikachu",
                assetKey: "pikachu",
                currentHp: 25,
                maxHp: 25,
                attackIds: [],
                baseAttack: 5,
            },
        });

        this.activeOpponentPokemon = new enemyPokemon({
            scene:this,
            _pokemonDetails: {
                name: "bulbasaur",
                assetKey: "bulbasaur",
                currentHp:25,
                maxHp:25,
                attackIds:[],
                baseAttack: 5,
            }

        });
        };
}
