// import Phaser from "phaser";
// import { DIRECTION } from "./direction";
// const TILE_SIZE=64;

// export interface GlobalState {
//     player: Object;
//     player.position: object;
//     player.position.x: number; // Defaults to 0 if not provided
//     player.position.y: number;
//     player.direction:Direction;
   
// }


// const initialState:GlobalState={
//     player:{
//         position:{
//             x:6*TILE_SIZE,
//             y:11*TILE_SIZE

//         },
//         direction: DIRECTION.DOWN
//     }

// }
// class DataManager extends Phaser.Events.EventEmitter{
//     private store: Phaser.Data.DataManager
//     constructor(){
//         super();
//         this.store= new Phaser.Data.DataManager(this);
//         this.updateDataManager(data)
//     }
//     updateDataManager(data){
//         this.store.set({

//         })
//     }

//     get storeData(){
//         return this.store;
//     }

// }
// export const dataManager = new DataManager();
