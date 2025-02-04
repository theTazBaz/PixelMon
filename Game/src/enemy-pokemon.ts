import { BattlePokemon } from "./battle-pokemon";
import { BattlePokemonConfig , Coordinate } from "./typedef"
import { POKEMON } from "./asset_keys";

const ENEMY_LOCATION: Coordinate = {
    x: 700,
    y: 180, 
};


export class enemyPokemon extends BattlePokemon{
    constructor(config : BattlePokemonConfig){
        super(config, ENEMY_LOCATION);
        this._scene.anims.create({
            key: '_phaserGameObject',
            frames: this._scene.anims.generateFrameNames(POKEMON.BULBASAUR),
            frameRate: 5,
            repeat: -1, // Loop indefinitely
        });
        
    }
}