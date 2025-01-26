import Phaser from "phaser";
import { HealthBar } from "./health-bar";

interface Pokemon {
    name: string;
    assetKey: string;
    assetFrame?: number;
    maxHp: number;
    currentHp: number;
    baseAttack: number;
    attackIds: string[];
 }
 
 interface BattlePokemonConfig {
    scene: Phaser.Scene;
    _pokemonDetails: Pokemon;
 }
 
 interface Coordinate {
    x: number;
    y: number;
 }

 /**
  * @typedef Attack
  * @type {Object}
  * @property {number} id
  * @property {string} name
  * @property {string} animationName 
  */

 export class BattlePokemon {
    protected _scene: Phaser.Scene;
    protected _pokemonDetails: Pokemon;
    protected _phaserGameObject: Phaser.GameObjects.Sprite;
     public _healthBar!: HealthBar;
     protected pokemonAttacks: Attack[];
     protected currentHealth: number;
     protected maxHealth: number;
     protected _phaserHealthBarGameContainer!: Phaser.GameObjects.Container;
 
    constructor(config: BattlePokemonConfig, position: Coordinate ) {
         this._scene = config.scene;
         this._pokemonDetails = config._pokemonDetails;
         this.currentHealth = this._pokemonDetails.currentHp;
         this.maxHealth=this._pokemonDetails.maxHp;
         this.pokemonAttacks = [];

         this._scene.anims.create({
            key: '_phaserGameObject',
            frames: this._scene.anims.generateFrameNames('bulbasaur'),
            frameRate: 5,
            repeat: -1, // Loop indefinitely
        });

       this.createHealthBarComponents();

        this._phaserGameObject = this._scene.add.sprite(position.x /*700*/, position.y/*200*/, "bulbasaur");
        this._phaserGameObject.setScale(3);
        this._phaserGameObject.play('_phaserGameObject');
    }
/** @type {boolean} */
   get isFainted() {
      return this.currentHealth<=0;
    }
 
    /** @type {string} */
   get name() {
      return this._pokemonDetails.name;
    }

    /** @type {Attack} */
   get attacks() {
      return this.pokemonAttacks;
    }

    /** @type {number} */
    get baseAttack() {
      return this._pokemonDetails.baseAttack;
    }

    takeDamage(damage: number, callback?: () => void) {
      this.currentHealth -= damage;
      if (this.currentHealth < 0) {
          this.currentHealth = 0;
      }
      this._healthBar.setMeterPercentageAnimated(this.currentHealth / this.maxHealth, {
          callback: callback
      });
  }

  createHealthBarComponents() {
   this._healthBar = new HealthBar(this._scene,34*0.75,34*0.75); 

   const PokemonName = this._scene.add.text(
      30*0.75,
      20*0.75,
      this.name,
      {
          color:'#000000' ,
          fontSize: '22px',
      }
  );
  const pokemonLevelText = this._scene.add.text(
   PokemonName.width+40*0.75,
   26*0.75,
   "Lvl 1",
   {
       color:'#000000' ,
       fontSize: '16px',
   }
);
const pokemonHPText = this._scene.add.text(
   30*0.75,
   55*0.75,
   "HP",
   {
       color:'#000000' ,
       fontSize: '16px',
       fontStyle:'italic',
   }
);
const healthbarBackground = this._scene.add.image(0, 0, "healthbar_background");
healthbarBackground.setScale(0.75); // Adjust size of health bar background
healthbarBackground.setOrigin(0, 0);

  this._phaserHealthBarGameContainer = this._scene.add.container(50, 25, [
      healthbarBackground,
      PokemonName,
      pokemonLevelText,
      pokemonHPText,
      this._healthBar.container,
      
      this._scene.add.text(
          443*0.75,
          90*0.75,
          "25/25",
          {
              color:'#000000' ,
              fontSize: '12px',
              
          }
      ).setOrigin(1,0),
  ]);
  }
  
    
 }
 