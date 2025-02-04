import Phaser from "phaser";
import {POKEMON , HEALTH_BAR_ASSETS, CURSORS} from "./asset_keys"
import { BattleMenu } from "./battle-menu";
import { Direction, DIRECTION } from "./direction";
import { StateMachine } from "./battle_state";


const BATTLE_STATES = Object.freeze({
    INTRO : 'INTRO', //set up game objects 
    PRE_BATTLE_INFO: 'PRE_BATTLE_INFO',// health bar opp pokemon
    BRING_OUT_PLAYER : 'BRING_OUT_PLAYER',// player pokemon + health BAR
    PLAYER_INPUT : 'PLAYER_INPUT',// battle menu  fight / run 
    ENEMY_INPUT : 'ENEMY_INPUT',// enemy chooses attack ai logic/ random 
    BATTLE : 'BATTLE' ,//switching who attacks damage
    POST_BATTLE_CHECK : 'POST_BATTLE_CHECK' ,//player ran a away switching etc
    FINISHED : 'FINISHED' ,// battle finish knock out the opp
    FLEE_ATTEMPT : 'FLEE_ATTEMPT', //run away

}) 

export default class scene2 extends Phaser.Scene {

    private battlemenu!: BattleMenu;
    private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    private battleStateMachine!: StateMachine
    private enterKey!: Phaser.Input.Keyboard.Key;


    constructor() {
        super("scene2");
    }

    preload() {
        this.load.image("battleScene", "src/assets/images/battle_scene_bg.jpg");
        this.load.atlas(POKEMON.BULBASAUR, "src/assets/pokemon/bulbasaur_front.png", "src/assets/pokemon_json/bulbasaur_front.json");
        this.load.atlas(POKEMON.PIKACHU, "src/assets/pokemon/pikachu_back.png", "src/assets/pokemon_json/pikachu_back.json");
        this.load.image("healthbar_background", "src/assets/images/hp_bg.png");
        this.load.image(HEALTH_BAR_ASSETS.LEFT_CAP, "src/assets/images/healthbar_left.png");
        this.load.image(HEALTH_BAR_ASSETS.MIDDLE, "src/assets/images/healthbar_mid.png");
        this.load.image(HEALTH_BAR_ASSETS.RIGHT_CAP, "src/assets/images/healthbar_right.png");
        this.load.image(CURSORS.CURSOR, "src/assets/images/cursor.png");
        this.load.image("leftshadow", "src/assets/images/barHorizontal_shadow_left.png");
        this.load.image("midshadow", "src/assets/images/barHorizontal_shadow_mid.png");
        this.load.image("rightshadow", "src/assets/images/barHorizontal_shadow_right.png");


    }   

    create() {

        //battle background 
        const battleSceneBg = this.add.image(0, -0, "battleScene");
        battleSceneBg.setOrigin(0, 0);
        battleSceneBg.setScale(
            this.scale.width / battleSceneBg.width,
            (this.scale.height - 100) / battleSceneBg.height
        );
        battleSceneBg.y -= 50;

        // animations 

        this.anims.create({
            key: 'opponent',
            frames: this.anims.generateFrameNames(POKEMON.BULBASAUR),
            frameRate: 5,
            repeat: -1, 
        });

        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNames(POKEMON.PIKACHU),
            frameRate: 10,
            repeat: -1, 
        });

        //battle Machine starts here 
        this.createBattleStateMachine();

        //Loading Pokemons
        const opponent = this.add.sprite(700, 200, POKEMON.BULBASAUR);
        opponent.setScale(3);
        opponent.play('opponent');

        const player = this.add.sprite(200, 300, POKEMON.PIKACHU);
        player.setScale(3);
        player.play('player');

        const playerPokemonName = this.add.text(
            30*0.75,
            20*0.75,
            POKEMON.PIKACHU,
            {
                color:'#000000' ,
                fontSize: '22px',
            }
        );

        // Create health bar background
        const healthbarBackground = this.add.image(0, 0, "healthbar_background");
        healthbarBackground.setScale(0.75); // Adjust size of health bar background
        healthbarBackground.setOrigin(0, 0);

        // Add health bar and name to container
        this.add.container(550, 275, [
            healthbarBackground,
            playerPokemonName,
            this.createHealth(34*0.75,34*0.75),
            this.add.text(
                playerPokemonName.width+40*0.75,
                26*0.75,
                "Lvl 1",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                }
            ),
            this.add.text(
                30*0.75,
                55*0.75,
                "HP",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                    fontStyle:'italic',
                }
            ),
            this.add.text(
                443*0.75,
                90*0.75,
                "25/25",
                {
                    color:'#000000' ,
                    fontSize: '12px',
                    
                }
            ).setOrigin(1,0),
        ]);

        const opponentPokemonName = this.add.text(
            30*0.75,
            20*0.75,
            POKEMON.BULBASAUR,
            {
                color:'#000000' ,
                fontSize: '22px',
            }
        );
        const opphealthbarBackground = this.add.image(0, 0, "healthbar_background");
        opphealthbarBackground.setScale(0.75); // Adjust size of health bar background
        opphealthbarBackground.setOrigin(0, 0);
        // Add health bar and name to container
        this.add.container(50, 25, [
            opphealthbarBackground,
            opponentPokemonName,
            this.createHealth(34*0.75,34*0.75),
            this.add.text(
                opponentPokemonName.width+40*0.75,
                26*0.75,
                "Lvl 1",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                }
            ),
            this.add.text(
                30*0.75,
                55*0.75,
                "HP",
                {
                    color:'#000000' ,
                    fontSize: '16px',
                    fontStyle:'italic',
                }
            ),
            this.add.text(
                443*0.75,
                90*0.75,
                "25/25",
                {
                    color:'#000000' ,
                    fontSize: '12px',
                    
                }
            ).setOrigin(1,0),
        ]);
        


        this.battlemenu= new BattleMenu(this);
        this.cursorKeys = this.input.keyboard!.createCursorKeys();
        this.enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        
        const wasEnterKeyPressed = Phaser.Input.Keyboard.JustDown(this.enterKey);
        //code for player attack 
        if (wasEnterKeyPressed) {
            this.battlemenu.playerInput('OK');
            if (this.battlemenu.selectedAttack === undefined) {
                return;
            }
            console.log(`Player selected ${this.battlemenu.selectedAttack}`);
        
            // this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput(
            //     ['Pikachu attacked Bulbasaur!'],
            //     () => {
            //         this.battlemenu.hideMainBattleMenu();
            //     }
            // );
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift)){
            this.battlemenu.playerInput('CANCEL');
            return ;
        }
        
        let selectedDirection :Direction= DIRECTION.NONE;
        if(this.cursorKeys.left.isDown){
            selectedDirection=DIRECTION.LEFT
        }else if(this.cursorKeys.right.isDown){
            selectedDirection=DIRECTION.RIGHT
        }
        else if(this.cursorKeys.up.isDown){
            selectedDirection=DIRECTION.UP
        }
        else if(this.cursorKeys.down.isDown){
            selectedDirection=DIRECTION.DOWN
        }

        if(selectedDirection !==DIRECTION.NONE){
            this.battlemenu.playerInput(selectedDirection);
        }
    }

    createHealth(x : number, y : number){
        const scaleY = 0.65;
        const leftCap = this.add.image(x, y, HEALTH_BAR_ASSETS.LEFT_CAP).setOrigin(0,0.5).setScale(1,scaleY);
        const middle = this.add.image(leftCap.x+leftCap.width, y, HEALTH_BAR_ASSETS.MIDDLE).setOrigin(0,0.5).setScale(1,scaleY);
        middle.displayWidth = 360*0.75;
        const rightCap = this.add.image(middle.x+middle.displayWidth, y, HEALTH_BAR_ASSETS.RIGHT_CAP).setOrigin(0,0.5).setScale(1,scaleY);
        return this.add.container(x,y,[leftCap, middle, rightCap]);
    }

    private createBattleStateMachine(){

        this.battleStateMachine = new StateMachine('battle', this);

        this.battleStateMachine.addState({
            name : BATTLE_STATES.INTRO ,   
            onEnter: ()=> {                
                // scene setup / transition 
                this.time.delayedCall(5, ()=>{
                    this.battleStateMachine.setState(BATTLE_STATES.PRE_BATTLE_INFO);
                })
            }
        }); 

        // adding pre battle stuff

        this.battleStateMachine.addState({
            name : BATTLE_STATES.PRE_BATTLE_INFO ,
            onEnter: ()=> {
                //wait for enemy monster to this.battleIntroText and notify player 

                //this.opponent pokemon this.battleIntroTexts 
                // this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`wild ${POKEMON.BULBASAUR} appeared !`],
                //     ()=>{
                //         //wait for text animation to complete 

                //     }
                // )
                this.time.delayedCall(5, ()=> {
                    this.battleStateMachine.setState(BATTLE_STATES.BRING_OUT_PLAYER);
                })
            

                
            }
        })
        
        this.battleStateMachine.addState({
            name : BATTLE_STATES.BRING_OUT_PLAYER ,  
            onEnter: ()=> {
                //wait for player monster to this.battleIntroText and notify thhe player
                
                // this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`Go ${POKEMON.PIKACHU}!`])
                this.time.delayedCall(5, ()=> {
                    this.battleStateMachine.setState(BATTLE_STATES.PLAYER_INPUT);
                    }) 

                
            }  
        }); 


        this.battleStateMachine.addState({
            name : BATTLE_STATES.PLAYER_INPUT ,
            onEnter: ()=> {
                this.battlemenu.showMainBattleMenu();

                //show main battle mennu 
                // this.time.delayedCall(5, ()=> {
                //     this.battleStateMachine.setState(BATTLE_STATES.ENEMY_INPUT);
                // })

                
            }
        })
        this.battleStateMachine.addState({
            name : BATTLE_STATES.ENEMY_INPUT,  
            onEnter: ()=> {
                this.battleStateMachine.setState(BATTLE_STATES.BATTLE);

                
            }  
        }); 
        this.battleStateMachine.addState({
            name : BATTLE_STATES.BATTLE ,
            onEnter: ()=> {
                //logic for Battle

                
            }
        })

        this.battleStateMachine.addState({
            name : BATTLE_STATES.POST_BATTLE_CHECK ,   
            onEnter: ()=> {

                
            } 
        }); 
        this.battleStateMachine.addState({
            name : BATTLE_STATES.FINISHED ,   
            onEnter: ()=> {

                
            } 
        }); 
        this.battleStateMachine.addState({
            name : BATTLE_STATES.FLEE_ATTEMPT,
            onEnter: ()=> {

                this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`Got away Safely!`],
                    ()=>{
                        this.battleStateMachine.setState(BATTLE_STATES.FINISHED);
                    }
                )

                
            }
        })
        //start state machine
        this.battleStateMachine.setState('INTRO')
    }

}