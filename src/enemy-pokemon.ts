import { BattlePokemon } from "./battle-pokemon";

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

const ENEMY_LOCATION: Coordinate = {
    x: 700,
    y: 180, 
};


export class enemyPokemon extends BattlePokemon{
    constructor(config : BattlePokemonConfig){
        super(config, ENEMY_LOCATION);
        this._scene.anims.create({
            key: '_phaserGameObject',
            frames: this._scene.anims.generateFrameNames('bulbasaur'),
            frameRate: 5,
            repeat: -1, // Loop indefinitely
        });
        
    }
}