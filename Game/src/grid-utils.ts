import { DIRECTION, Direction } from "./direction";
import { Coordinate } from "./typedef";
const TILE_SIZE=64;

export function getTargetPostionFromGameObjectPositionAndDirection(currentPosition :Coordinate, direction:Direction):Coordinate{
    const targetPositon:Coordinate={...currentPosition};

    switch(direction){
        case DIRECTION.DOWN:
            targetPositon.y+=TILE_SIZE;

            break;
        case DIRECTION.UP:
            targetPositon.y-=TILE_SIZE;
            break;

        case DIRECTION.LEFT:
            targetPositon.x-=TILE_SIZE;
            break;
        case DIRECTION.RIGHT:
            targetPositon.x+=TILE_SIZE;
            break;
    }
    return targetPositon
}