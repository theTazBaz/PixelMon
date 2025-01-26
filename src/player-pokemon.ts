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

const PLAYER_LOCATION: Coordinate = {
    x: 200,
    y: 300, 
};


export class playerPokemon extends BattlePokemon{
    constructor(config : BattlePokemonConfig){
        super(config, PLAYER_LOCATION);
        this._phaserHealthBarGameContainer.setPosition(550,275);
    }

    addHealthBarComponents() {
        
    }
}