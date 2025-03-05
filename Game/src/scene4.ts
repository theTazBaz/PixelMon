import Phaser from "phaser";
import { WORLD_ASSET_KEYS } from "./asset_keys";
import { Player } from "./characters/player";
import { Coordinate } from "./typedef";
import { Controls } from "./controls";
import { DIRECTION } from "./direction";

const TILE_SIZE= 64;

const PLAYER_POSITION: Coordinate= Object.freeze({
    x:6*TILE_SIZE,
    y:21*TILE_SIZE,
})

export default class scene4 extends Phaser.Scene{
    private player!:Player;
    private controls!:Controls
    private encounterLayer!:Phaser.Tilemaps.TilemapLayer;
    private wildPokemonEncountered!: boolean;

    constructor(){
        super("scene4");
    }
    init(){
        this.wildPokemonEncountered=false;

    }

    create(){
        
        this.cameras.main.setBounds(0,0,1280,2176);
        this.cameras.main.setZoom(0.8);
        // this.cameras.main.centerOn(x,y);

        const map=this.make.tilemap({key:WORLD_ASSET_KEYS.PALLET_MAIN_LEVEL});
        const collisionTiles = map.addTilesetImage('collision',WORLD_ASSET_KEYS.PALLET_COLLISION)
        const collisionlayer= map.createLayer('Collision',collisionTiles,0,0);
        if(!collisionlayer){
            console.log("error while creating collsion layer");
        }
        const encounterTiles = map.addTilesetImage('encounter',WORLD_ASSET_KEYS.PALLET_ENCOUNTER_ZONE)

        this.encounterLayer = map.createLayer('Encounter',encounterTiles, 0,0 );
        
        if(!this.encounterLayer){
            console.log("error while creating encounter layer");
        }

        // collisionlayer?.setDepth(2);
        // this.encounterLayer?.setDepth(2);

        this.add.image(0,0,WORLD_ASSET_KEYS.PALLET_TOWN,0).setOrigin(0);
        this.player= new Player({
            scene:this,
            position:PLAYER_POSITION,
            direction:DIRECTION.DOWN,
            collisionLayer: collisionlayer,
            spriteGridMovementFinishedCallBack:()=>{
                this.handlePlayerMovementUpdate();
            }
        });
        this.cameras.main.startFollow(this.player.sprite);
        this.add.image(0,0,WORLD_ASSET_KEYS.PALLET_FOREGROUND,0).setOrigin(0);

        this.controls=new Controls(this);
        this.cameras.main.fadeIn(1000,0,0,0);
    
    }

    update(time:DOMHighResTimeStamp){
        if(this.wildPokemonEncountered){
            this.player.update(time);
            return;
        }
        const selectedDirection = this.controls.getDirectionKeyPressedDown();
        if(selectedDirection!== DIRECTION.NONE){
            console.log("in scene4",selectedDirection)
            this.player.moveCharacter(selectedDirection);
        }

        this.player.update(time);
    }
    handlePlayerMovementUpdate(){
        if(!this.encounterLayer){
            return;
        }
        const isInEncounterZone= this.encounterLayer.getTileAtWorldXY(this.player.sprite.x,this.player.sprite.y,true).index!==-1;
        if(!isInEncounterZone){
            return;
        }
        console.log("player is in encounter zone ");
        this.wildPokemonEncountered= Math.random()<0.5;
        if(this.wildPokemonEncountered){
            console.log("playerEncounter pokemon")
            this.cameras.main.fadeOut(2000);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,()=>{
                this.scene.start("scene2");
            })
        }
    }
}