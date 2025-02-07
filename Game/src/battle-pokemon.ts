import Phaser from "phaser";
import { HealthBar } from "./health-bar";
import {Pokemon , BattlePokemonConfig , Coordinate ,Attack} from "./typedef"
import { DATA_ASSET_KEYS } from "./asset_keys";

export class BattlePokemon {
    protected _scene: Phaser.Scene;
    protected _pokemonDetails: Pokemon;
    protected _phaserGameObject: Phaser.GameObjects.Sprite;
    public _healthBar!: HealthBar;
    protected pokemonAttacks: Attack[];
    protected currentHealth: number;
    protected maxHealth: number;
    protected _phaserHealthBarGameContainer!: Phaser.GameObjects.Container;

    protected _healthBarText!: Phaser.GameObjects.Text;


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

    const data = this._scene.cache.json.get(DATA_ASSET_KEYS.ATTACKS);


    this._pokemonDetails.attackIds.forEach((attackId) => {
        const pokemonAttack = data.find((attack:{id:number}) => attack.id === attackId);
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
    
        // Update the health bar text
        this.setHealthBarText();
    }
    
  
    setHealthBarText() {
     if (this._healthBarText) {
         this._healthBarText.setText(`${this.currentHealth}/${this.maxHealth}`);
     }
  }

 
createHealthBarComponents() {
    this._healthBar = new HealthBar(this._scene, 34 * 0.75, 34 * 0.75);
 
    const PokemonName = this._scene.add.text(
        30 * 0.75,
        20 * 0.75,
        this.name,
        {
            color: '#000000',
            fontSize: '22px',
        }
    );
 
    const pokemonLevelText = this._scene.add.text(
        PokemonName.width + 40 * 0.75,
        26 * 0.75,
        "Lvl 1",
        {
            color: '#000000',
            fontSize: '16px',
        }
    );
 
    const pokemonHPText = this._scene.add.text(
        30 * 0.75,
        55 * 0.75,
        "HP",
        {
            color: '#000000',
            fontSize: '16px',
            fontStyle: 'italic',
        }
    );
const healthbarBackground = this._scene.add.image(0, 0, "healthbar_background");
healthbarBackground.setScale(0.75); // Adjust size of health bar background
healthbarBackground.setOrigin(0, 0);

this._healthBarText = this._scene.add.text(
    443 * 0.75,
    90 * 0.75,
    `${this.currentHealth}/${this.maxHealth}`,
    {
        color: '#000000',
        fontSize: '12px',
    }
).setOrigin(1, 0);

this._phaserHealthBarGameContainer = this._scene.add.container(50, 25, [
        healthbarBackground,
        PokemonName,
        pokemonLevelText,
        pokemonHPText,
        this._healthBar.container,
        this._healthBarText,
]);


}
hidePokemon(){
    this._phaserGameObject.setAlpha(0);


}
showPokemon(){
    this._phaserGameObject.setAlpha(1);


}
}

