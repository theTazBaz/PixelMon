import Phaser from "phaser";
import { HealthBar } from "./health-bar";
import { Pokemon } from "./typedef";
import { PLAYER_POKEMON_TEAM } from "./player-pokemon-list";
import {  HEALTH_BAR_ASSETS } from "./asset_keys";
import { Direction, DIRECTION } from "./direction";
import scene2 from "./assets/images/scene2";
import { Player } from "./characters/player";

const Style = {
    fontSize: "20px",
    color: "#fff",
}

const POKEMON_POSITIONS = Object.freeze({
    EVEN :{
        x:10,
        y:10,

    },
    ODD:{
        x:480,
        y:40

    },
    increment: 130
})

export default class scene3 extends Phaser.Scene{

    private PokemonSwitchBackground !: Phaser.GameObjects.Image[];
    // private CancelButton !: Phaser.GameObjects.Image;
    private InfoText !: Phaser.GameObjects.Text;
    private HealthBars !: HealthBar[];
    private HealthBarTexts !: Phaser.GameObjects.Text[];
    private selectedPokemonIndex !: number;
    private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    private enterKey!: Phaser.Input.Keyboard.Key;
    private battleScene !: scene2;
    private player !:Player;
    private pokemonTeam!:Pokemon[];
    private currentPokemon!:Pokemon;
    constructor(){
        super("scene3");
    }
    init(){
        this.PokemonSwitchBackground = [];
        this.HealthBars=[];
        this.HealthBarTexts=[];
        this.selectedPokemonIndex=0;

    }
    preload(){
        this.load.image("button", "src/assets/images/button.png");
        this.load.image("switchbg", "src/assets/images/hp_bg.png");
        this.load.image(HEALTH_BAR_ASSETS.LEFT_CAP, "src/assets/images/healthbar_left.png");
        this.load.image(HEALTH_BAR_ASSETS.MIDDLE, "src/assets/images/healthbar_mid.png");
        this.load.image(HEALTH_BAR_ASSETS.RIGHT_CAP, "src/assets/images/healthbar_right.png");
        this.load.image("leftshadow", "src/assets/images/barHorizontal_shadow_left.png");
        this.load.image("midshadow", "src/assets/images/barHorizontal_shadow_mid.png");
        this.load.image("rightshadow", "src/assets/images/barHorizontal_shadow_right.png");

    }

    create(data:any){
        // console.log(data.player);
        if (data?.player) {
            this.player = data.player; // Store reference to player
            this.pokemonTeam = this.player.getPokemonTeam();
            console.log("in switch scene ",this.pokemonTeam) // Get Pokémon team
        }

        this.battleScene= data.battle;
        this.cameras.main.setBackgroundColor('#000000'); 


        

        const infoContainer = this.add.container(4, this.scale.height-85, []);
        const infoDisplay = this.add.rectangle(0,0,950,80,0xede4f3,1).setOrigin(0).setStrokeStyle(8, 0x2a429e);
        this.InfoText=this.add.text(15,14, '', {
            fontSize: "20px",
            color: "#000",
            fontFamily: "Bold"
        })
        infoContainer.add([infoDisplay, this.InfoText]);
        this.updateInfoContainerText();

        this.pokemonTeam.forEach((pokemon, index)=>{
            // console.log(pokemon);
            const isEven = index%2 ==0 
            const x = isEven? POKEMON_POSITIONS.EVEN.x :POKEMON_POSITIONS.ODD.x;
            const y =(isEven? POKEMON_POSITIONS.EVEN.y: POKEMON_POSITIONS.ODD.y) + POKEMON_POSITIONS.increment* Math.floor(index/2);
            this.createPokemonContainer(x,y,pokemon)

        })
        this.cursorKeys = this.input.keyboard!.createCursorKeys();
        this.enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift)) {
            this.InfoText.setText("Returning...");
        
            // Notify the battle scene that the player canceled the switch
            this.battleScene.events.emit("switchCanceled");
        
            // Resume the battle scene and stop the switch scene
            this.scene.stop();
            return;
        }
        
            
        
        const wasEnterKeyPressed = Phaser.Input.Keyboard.JustDown(this.enterKey);
        
        if (wasEnterKeyPressed) {
            if (this.selectedPokemonIndex === -1) {
                return; // Go back logic
            }
        
            const selectedPokemon = this.pokemonTeam[this.selectedPokemonIndex];
        
            // Prevent selecting fainted Pokémon
            if (selectedPokemon.currentHp === 0) {
                this.InfoText.setText(`${selectedPokemon.name.toLocaleUpperCase()} has fainted! Choose another Pokémon.`);
                return;
            }
        
            selectedPokemon.assetKey = `${selectedPokemon.name}_back`;
            this.battleScene.events.emit("pokemonSwitched", selectedPokemon);
            this.scene.stop();
            return;
        }
        
        // Prevent errors if `cursorKeys` is undefined
        if (this.cursorKeys === undefined) {
            return DIRECTION.NONE;
        }
        

            let selectedDirection :Direction= DIRECTION.NONE;
                    if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)){
                        selectedDirection=DIRECTION.LEFT
                    }else if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)){
                        selectedDirection=DIRECTION.RIGHT
                    }
                    else if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)){
                        selectedDirection=DIRECTION.UP
                    }
                    else if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)){
                        selectedDirection=DIRECTION.DOWN
                    }
            
                    if(selectedDirection !==DIRECTION.NONE){
                    
                        this.updateInfoContainerText();
                    }
                    this.movePlayerInputCursor(selectedDirection);
        
        
            
    }

    private movePlayerInputCursor(direction: Direction){
        switch(direction){
            case DIRECTION.UP:
            
                if(this.selectedPokemonIndex===-1){
                    this.selectedPokemonIndex=this.pokemonTeam.length;
                }
                this.selectedPokemonIndex-=1;
                if(this.selectedPokemonIndex<0){
                    this.selectedPokemonIndex=0;
                }
                this.PokemonSwitchBackground[this.selectedPokemonIndex].setAlpha(1);
                
                break;
            case DIRECTION.DOWN:
                if(this.selectedPokemonIndex===-1){
                    break;
                }
                this.selectedPokemonIndex+=1;
                
                if(this.selectedPokemonIndex>this.pokemonTeam.length-1){
                    this.selectedPokemonIndex=-1;
                }
                if(this.selectedPokemonIndex===-1){
                    console.log("cancel");
                    return;
                }
                
                this.PokemonSwitchBackground[this.selectedPokemonIndex].setAlpha(1);
                // console.log(this.selectedPokemonIndex)
                break;
            case DIRECTION.LEFT:
            case DIRECTION.RIGHT:
            case DIRECTION.NONE:            
                break;
        }

        this.PokemonSwitchBackground.forEach((obj, index)=>{
            if(index===this.selectedPokemonIndex){
                return;
            }
            obj.setAlpha(0.6);
        });

    }


    private updateInfoContainerText(){
        if(this.selectedPokemonIndex ===-1){
            this.InfoText.setText("Go Back");
            return ;
        }
        this.InfoText.setText('Choose Pokemon');
    }

    private createPokemonContainer(x:number , y :number , pokemonDetails : Pokemon  ){
        const container = this.add.container(x,y, []);
        const background = this.add.image(0,0,"switchbg").setOrigin(0).setScale(1,1);
        this.PokemonSwitchBackground.push(background);
        this.anims.create({
            key: `${pokemonDetails.name}_front`, 
            frames: this.anims.generateFrameNames(`${pokemonDetails.name}_front`), 
            frameRate: 5, 
            repeat: -1,    
        })
        const pokemonSprite = this.add.sprite(60, 60, pokemonDetails.name);
        pokemonSprite.setScale(2)
        pokemonSprite.play(`${pokemonDetails.name}_front`);
        
        const healthBar = new HealthBar(this,70,35,240,240);
        // console.log(pokemonDetails.name , pokemonDetails.currentHp,pokemonDetails.maxHp)
        
        healthBar.setMeterPercentageAnimated(pokemonDetails.currentHp/pokemonDetails.maxHp,{
            duration:0,
            skipBattleAnimations : true,
        })
        this.HealthBars.push(healthBar);
        

        const PokemonName = this.add.text(
            100,
            20,
            pokemonDetails.name.toLocaleUpperCase(),
            {
                color:'#000000' ,
                fontSize: '25px',
                fontStyle:"bold"
            }
        );
        const pokemonLevelText = this.add.text(
            380,20,
            `Lvl ${pokemonDetails.currentLevel}`,
            {
                color:'#000000' ,
                fontSize: '22px',
                fontStyle:"bold"
                }
            );
        const pokemonHPText = this.add.text(
            100,
            57,
            "HP",
            {
                color:'#000000' ,
                fontSize: '25px',
                fontStyle:'italic Bold',
                
            }
        );
        const HP = this.add.text(
            443 ,
            90 ,
            `${pokemonDetails.currentHp}/${pokemonDetails.maxHp}`,
            {
                color: '#000000',
                fontSize: '15px',
            }
        ).setOrigin(1, 0);




        container.add([ background,
                        pokemonSprite,
                        PokemonName, 
                        pokemonHPText,
                        pokemonLevelText,
                        HP,
                        healthBar.container    
                    ]);
        return container;

    }
    private goBackToPrevScene() {
        this.scene.stop("scene3");
        
    }
    
}