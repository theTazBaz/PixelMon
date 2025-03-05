import { CHARACTER_ASSET_KEYS } from "../asset_keys";
import { DIRECTION, Direction } from "../direction";
import { Character, CharacterConfig } from "./character";
type PlayerConfig = Omit<CharacterConfig, "assetKey"|"assetFrame">;


export class Player extends Character{
    constructor(config:PlayerConfig){
        super({
            ...config,
            assetKey:CHARACTER_ASSET_KEYS.PLAYER,
            assetFrame:7,
        });
        
    }

        moveCharacter(direction:Direction){
            super.moveCharacter(direction);
        
            switch(this.direction){
                case DIRECTION.DOWN:
                case DIRECTION.LEFT:
                case DIRECTION.UP:
                case DIRECTION.RIGHT:
                    console.log(this.direction);
                if(this.phaserGameObject.anims.currentAnim?.key!==`PLAYER_${this.direction}`){
                            this.phaserGameObject.anims.play(`PLAYER_${this.direction}`)
                    }
                break;
                

            }
        }
}