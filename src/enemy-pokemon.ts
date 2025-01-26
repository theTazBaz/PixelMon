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
    y: 200, 
};


export class enemyPokemon extends BattlePokemon{
    constructor(config : BattlePokemonConfig){
        super(config, ENEMY_LOCATION);
    }
}