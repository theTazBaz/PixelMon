import Phaser from "phaser";
import {POKEMON , HEALTH_BAR_ASSETS, CURSORS, DATA_ASSET_KEYS} from "./asset_keys"
import { BattleMenu } from "./battle-menu";
import { Direction, DIRECTION } from "./direction";
import { StateMachine } from "./battle_state";
import { Background } from "./battle-background";
import { BattlePokemon } from "./battle-pokemon";
import { enemyPokemon } from "./enemy-pokemon";
import { playerPokemon } from "./player-pokemon";


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
    activeOpponentPokemon!:BattlePokemon;
    activePlayerPokemon!:BattlePokemon;
    private activePlayerAttackIndex!: number;


    constructor() {
        super("scene2");
    }
    init(){
        this.activePlayerAttackIndex=-1;
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


        //loading json data
        this.load.json(DATA_ASSET_KEYS.ATTACKS , "src/assets/data/attacks.json");

    }   

    create() {

        //battle background 
        const battlebg = new Background(this);
        battlebg.showBackground();
        

        // Loading pokemons 

        this.activePlayerPokemon = new playerPokemon({
            scene: this,
            _pokemonDetails: {
                name: "pikachu",
                assetKey: POKEMON.PIKACHU,
                currentHp: 25,
                maxHp: 25,
                attackIds: [1,2,3,4],
                baseAttack: 5,
            },
        });

        this.activePlayerPokemon.hidePokemon();

        this.activeOpponentPokemon = new enemyPokemon({
            scene:this,
            _pokemonDetails: {
                name: "bulbasaur",
                assetKey: POKEMON.BULBASAUR,
                currentHp:25,
                maxHp:25,
                attackIds:[1,5,6],
                baseAttack: 5,
            }

        });
        
        //battle Machine starts here 
        this.createBattleStateMachine();

        


        this.battlemenu= new BattleMenu(this , this.activePlayerPokemon);
        this.cursorKeys = this.input.keyboard!.createCursorKeys();
        this.enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        this.battleStateMachine.update();
        

        // this.handleBattlesequence();
        const wasEnterKeyPressed = Phaser.Input.Keyboard.JustDown(this.enterKey);
        //code for player attack 
        if (wasEnterKeyPressed) {
            this.battlemenu.playerInput('OK');
            if (this.battlemenu.selectedAttack === undefined) {
                return;
            }
            this.activePlayerAttackIndex= this.battlemenu.selectedAttack;

            if(!this.activePlayerPokemon.attacks[this.activePlayerAttackIndex]){
                return;

            }
            
            console.log(`Player selected ${this.battlemenu.selectedAttack}`);

            this.battlemenu.HidePokemonAttackMenu();

            this.battleStateMachine.setState(BATTLE_STATES.ENEMY_INPUT);


            
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

                // this.opponent pokemon this.battleIntroTexts 
            
                this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`wild ${this.activeOpponentPokemon.name} appeared !`],
                    ()=>{
                        this.battleStateMachine.setState(BATTLE_STATES.BRING_OUT_PLAYER);
                        //wait for text animation to complete 

                    }
                )
                    
                
            

                
            }
        })
        
        this.battleStateMachine.addState({
            name : BATTLE_STATES.BRING_OUT_PLAYER ,  
            onEnter: ()=> {
                this.activePlayerPokemon.showPokemon();

                //wait for player monster to this.battleIntroText and notify thhe player
                this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`Go ${this.activePlayerPokemon.name }!`],()=>{
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
                //pick random move or whatever
                this.battleStateMachine.setState(BATTLE_STATES.BATTLE);

                
            }  
        }); 
        this.battleStateMachine.addState({
            name : BATTLE_STATES.BATTLE ,
            onEnter: ()=> {
                //logic for Battle
                //general battle flow 
                // show attack used and pause 
                // play attack animation 
                // damage animation
                // health bar 
                //then other monster attacks

                this.playerAttack();

                
            }
        })

        this.battleStateMachine.addState({
            name : BATTLE_STATES.POST_BATTLE_CHECK ,   
            onEnter: ()=> {
                this.postBattleCheck();
                
            } 
        }); 
        this.battleStateMachine.addState({
            name : BATTLE_STATES.FINISHED ,   
            onEnter: ()=> {
                
                this.transitionNextScene();

                
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

    




    private playerAttack(){

        this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`${this.activePlayerPokemon.name} used ${this.activePlayerPokemon.attacks[this.activePlayerAttackIndex].name}` ], ()=>{
            this.time.delayedCall(500,()=>
            {
                this.activeOpponentPokemon.takeDamage(this.activePlayerPokemon.baseAttack,()=>{
                    this.enemyAttack();
                })
            })
        })

    }

    private enemyAttack(){
        if(this.activeOpponentPokemon.isFainted){
            this.battleStateMachine.setState(BATTLE_STATES.POST_BATTLE_CHECK);
            return;
        }

        
        
        this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`${this.activeOpponentPokemon.name} used ${this.activeOpponentPokemon.attacks[2].name}`], ()=>{
            this.time.delayedCall(500,()=>
            {
                this.activePlayerPokemon.takeDamage(this.activeOpponentPokemon.baseAttack,()=>{
                this.battleStateMachine.setState(BATTLE_STATES.POST_BATTLE_CHECK);

                
                })
            })
        })

    }

    private postBattleCheck(){

        if(this.activeOpponentPokemon.isFainted){
            this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([`Wild ${this.activeOpponentPokemon.name} Fainted `, "You gained Experience"],
                ()=>{
                    this.battleStateMachine.setState(BATTLE_STATES.FINISHED);

                    })
            return ;}
    if(this.activePlayerPokemon.isFainted){
        this.battlemenu.updateInfoPaneMsgsWaitForPlayerInput([` ${this.activePlayerPokemon.name} Fainted `, "You running to safety"],
            ()=>{
                this.battleStateMachine.setState(BATTLE_STATES.FINISHED);})
            return ;}
            this.battleStateMachine.setState(BATTLE_STATES.PLAYER_INPUT);}

    

    private transitionNextScene(){
        this.cameras.main.fadeOut(2600,0 ,0 ,0) ;
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,()=>{
            this.scene.start("scene2");
        })
    }



}