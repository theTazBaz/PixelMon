import Phaser from "phaser";
import { HealthBar } from "./health-bar";
import {Pokemon , BattlePokemonConfig , Coordinate ,Attack} from "./typedef"
import { DATA_ASSET_KEYS } from "./asset_keys";

export class BattlePokemon {
    protected _scene: Phaser.Scene;
    protected _pokemonDetails: Pokemon;
    protected _phaserGameObject: Phaser.GameObjects.Sprite;
    protected _healthBar!: HealthBar;
    protected pokemonAttacks: Attack[];
    protected currentHealth: number;
    protected maxHealth: number;
    protected _phaserHealthBarGameContainer!: Phaser.GameObjects.Container;
    protected _pokemonNameText !:Phaser.GameObjects.Text;
    protected data: any;


    constructor(config: BattlePokemonConfig, position: Coordinate ) {
        this._scene = config.scene;
        this._pokemonDetails = config._pokemonDetails;
        this.currentHealth = this._pokemonDetails.currentHp;
        this.maxHealth=this._pokemonDetails.maxHp;
        this.pokemonAttacks = [];

        const animationKey = `${this._pokemonDetails.name}_animation`;
        if (!this._scene.anims.exists(animationKey)) {
            this._scene.anims.create({
                key: animationKey,
                frames: this._scene.anims.generateFrameNames(this._pokemonDetails.assetKey),
                frameRate: 5,
                repeat: -1,
            });
        }   
    this.createHealthBarComponents();
    this._phaserGameObject = this._scene.add.sprite(position.x /*700*/, position.y/*200*/, this._pokemonDetails.name);
    this._phaserGameObject.setScale(3);

    this._phaserGameObject.play(animationKey);

    this.data = this._scene.cache.json.get(DATA_ASSET_KEYS.ATTACKS);


    this._pokemonDetails.attackIds.forEach((attackId) => {
        const pokemonAttack = this.data.find((attack:{id:number}) => attack.id === attackId);
        if (pokemonAttack !== undefined) {
            this.pokemonAttacks.push(pokemonAttack);
        }
    });
    
    }

    get isFainted():boolean {
        return this.currentHealth<=0;
        }


    get name() :string{
        return this._pokemonDetails.name;
        }

        /** @type {Attack} */
    get attacks() {
        return this.pokemonAttacks;
        }

    get baseAttack():number {
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

    this._pokemonNameText = this._scene.add.text(
        30*0.75,
        20*0.75,
        this.name,
        {
            color:'#000000' ,
            fontSize: '22px',
        }
    );
    const pokemonLevelText = this._scene.add.text(
        this._pokemonNameText.width+40*0.75,
        26*0.75,
        `Lvl ${this._pokemonDetails.currentLevel}`,
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
            this._pokemonNameText,
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

    hidePokemon(){
        this._phaserGameObject.setAlpha(0);
        this._phaserHealthBarGameContainer.setAlpha(0);


    }
    showPokemon(){
        this._phaserGameObject.setAlpha(1);
        this._phaserHealthBarGameContainer.setAlpha(1);


    }

    switchPokemon(pokemon:Pokemon){
        this._pokemonDetails = pokemon;
        this.currentHealth = this._pokemonDetails.currentHp;
        this.maxHealth= this._pokemonDetails.maxHp;
        this._healthBar.setMeterPercentageAnimated(this.currentHealth/this.maxHealth,{
            skipBattleAnimations: true
        });
        
        this.pokemonAttacks=[];
        this._pokemonDetails.attackIds.forEach((attackId) => {
            const pokemonAttack = this.data.find((attack:{id:number}) => attack.id === attackId);
            if (pokemonAttack !== undefined) {
                this.pokemonAttacks.push(pokemonAttack);
            }
        });

        this._phaserGameObject.setTexture(this._pokemonDetails.assetKey, this._pokemonDetails.assetFrame ||0);
        this._pokemonNameText.setText(this._pokemonDetails.name);
        


    }

    playSwitchAnimation(newPokemon: Pokemon, callback?: () => void) {
        // Fade out the current Pokémon
        this._scene.tweens.add({
            targets: this._phaserGameObject,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                // Switch to the new Pokémon
                this.switchPokemon(newPokemon);
    
                // Fade in the new Pokémon
                this._scene.tweens.add({
                    targets: this._phaserGameObject,
                    alpha: 1,
                    duration: 500,
                    onComplete: () => {
                        if (callback) callback();
                    }
                });
            }
        });
    }
    


}
