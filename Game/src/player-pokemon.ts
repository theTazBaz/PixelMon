import { BattlePokemon } from "./battle-pokemon";
import { BattlePokemonConfig , Coordinate } from "./typedef"

const PLAYER_LOCATION: Coordinate = {
    x: 200,
    y: 300, 
};


export class playerPokemon extends BattlePokemon{
    constructor(config : BattlePokemonConfig){
        super(config, PLAYER_LOCATION);
        this._phaserHealthBarGameContainer.setPosition(550,275);
    }

    
}