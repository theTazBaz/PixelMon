import Phaser from "phaser";
import { DATA_ASSET_KEYS, WORLD_ASSET_KEYS } from "./asset_keys";
import { Player } from "./characters/player";
import { Coordinate } from "./typedef";
import { Controls } from "./controls";
import { DIRECTION } from "./direction";
import { DATA_MANAGER_KEYS, dataManager } from "./data_manager";
import Npc from "./characters/npc"; // Import the Npc class
import { POKEMON } from "./asset_keys";
import { Pokemon } from "./typedef";
import { POKEMON_DATA } from "./pokemon-data";

const TILE_SIZE = 64;

export default class scene4 extends Phaser.Scene {
    private player!: Player;
    private controls!: Controls;
    private encounterLayer!: Phaser.Tilemaps.TilemapLayer;
    private wildPokemonEncountered!: boolean;
    private playerTeam: any[];
    private npc!: Npc; // Add npc property

    constructor() {
        super("scene4");
        this.playerTeam = [];
    }
    preload() {
        // this.load.spritesheet('bulbasaur', 'assets/sprites/bulbasaur.png', {
        //     frameWidth: 64,
        //     frameHeight: 64
        // });
    
        // this.load.spritesheet('charmander', 'assets/sprites/charmander.png', {
        //     frameWidth: 64,
        //     frameHeight: 64
        // });
    }
    
    init() {
        this.wildPokemonEncountered = false;
    }

    create() {
        this.cameras.main.setBounds(0, 0, 3200, 2176);
        this.cameras.main.setZoom(0.8);
        // this.cameras.main.centerOn(x,y);

        const map = this.make.tilemap({ key: WORLD_ASSET_KEYS.PALLET_MAIN_LEVEL });
        const collisionTiles = map.addTilesetImage('collision', WORLD_ASSET_KEYS.PALLET_COLLISION);
        const collisionlayer = map.createLayer('Collision', collisionTiles, 0, 0);
        if (!collisionlayer) {
            console.log("error while creating collsion layer");
        }
        const encounterTiles = map.addTilesetImage('encounter', WORLD_ASSET_KEYS.PALLET_ENCOUNTER_ZONE);

        this.encounterLayer = map.createLayer('Encounter', encounterTiles, 0, 0);
        if (!this.encounterLayer) {
            console.log("error while creating encounter layer");
        }

        // collisionlayer?.setDepth(2);
        // this.encounterLayer?.setDepth(2);

        this.add.image(0, 0, WORLD_ASSET_KEYS.PALLET_TOWN, 0).setOrigin(0);
        this.player = new Player({
            scene: this,
            position: dataManager.storeData.get(DATA_MANAGER_KEYS.PLAYER_POSTION),
            direction: dataManager.storeData.get(DATA_MANAGER_KEYS.PLAYER_DIRECTION),
            collisionLayer: collisionlayer,
            spriteGridMovementFinishedCallBack: () => {
                this.handlePlayerMovementUpdate();
            }
        });
        this.cameras.main.startFollow(this.player.sprite);
        this.add.image(0, 0, WORLD_ASSET_KEYS.PALLET_FOREGROUND, 0).setOrigin(0);

        this.controls = new Controls(this);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Create NPC instance
        this.npc = new Npc(this, { x: 300, y: 300 });

        this.input!.keyboard!.on('keydown-Z', () => {
            const playerPosition = {
              x: this.player.sprite.x,
              y: this.player.sprite.y,
            };
            if (this.npc!.isNearPlayer(playerPosition)) {
              this.startBattleScene();
            }
          });
          
    }

    update(time: DOMHighResTimeStamp) {
        if (this.wildPokemonEncountered) {
            this.player.update(time);
            return;
        }
        const selectedDirection = this.controls.getDirectionKeyPressedDown();
        if (selectedDirection !== DIRECTION.NONE) {
            this.player.moveCharacter(selectedDirection);
        }

        this.player.update(time);

        const playerPosition = {
            x: this.player.sprite.x,
            y: this.player.sprite.y,
        };

        if (this.npc.isNearPlayer(playerPosition)) {
            this.npc.displayGreeting();
          }
    }

    handlePlayerMovementUpdate() {
        dataManager.storeData.set(DATA_MANAGER_KEYS.PLAYER_POSTION, {
            x: this.player.sprite.x,
            y: this.player.sprite.y,
        });

        dataManager.storeData.set(DATA_MANAGER_KEYS.PLAYER_DIRECTION, this.player.directionGetter);

        if (!this.encounterLayer) {
            return;
        }
        const isInEncounterZone = this.encounterLayer.getTileAtWorldXY(this.player.sprite.x, this.player.sprite.y, true).index !== -1;
        if (!isInEncounterZone) {
            return;
        }

        this.wildPokemonEncountered = Math.random() < 0.2;
        if (this.wildPokemonEncountered) {
            this.cameras.main.fadeOut(2000);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.player.getPokemonTeam().forEach(pokemon => {
                    console.log(`${pokemon.name}: ${pokemon.currentHp} HP`);
                });
                this.scene.start("scene2", { player: this.player });
            });
        }
    }
    private opponentTeam: Pokemon[] = [
        POKEMON_DATA.CHARMANDER,
        POKEMON_DATA.BULBASAUR,
        // Add more Pokémon here
      ];

      private startBattleScene() {
        if (this.player && this.opponentTeam) {
          this.scene.start('scene2', {
            player: this.player,
            opponentTeam: this.opponentTeam,
            canCatch: false
          });
        } else {
          console.error('Missing player or opponentTeam');
        }
      }
      
}