import Phaser from "phaser";
import { DIRECTION, Direction } from "./direction";
import { CURSORS } from "./asset_keys";

const Style = {
    fontSize: "20px",
    color: "#fff",
}


const BATTLE_MENU_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT' , 
    RUN : 'RUN',
    SWITCH: 'SWITCH'
} as const )

export type BattleOPtions = keyof typeof BATTLE_MENU_OPTIONS;

const ACTIVE_BATTLE_MENU = Object.freeze({
    BATTLE_MAIN: 'BATTLE_MAIN',
    BATTLE_MOVE_SELECT: 'BATTLE_MOVE_SELECT',
    FIGHT: 'FIGHT',
    RUN: 'RUN',
    SWITCH: 'SWITCH',
} as const);

type ActiveBattleMenu = keyof typeof ACTIVE_BATTLE_MENU;

const MOVES_LIST = Object.freeze({
    MOVE_1: 'MOVE_1',
    MOVE_2: 'MOVE_2',
    MOVE_3: 'MOVE_3',
    MOVE_4: 'MOVE_4',


});
type MoveList = keyof typeof MOVES_LIST;


export class BattleMenu{
    private scene : Phaser.Scene;
    private PlayerOptions!: Phaser.GameObjects.Container ;
    private MainMenu! : Phaser.GameObjects.Container;
    private cursorObject! : Phaser.GameObjects.Image;
    private textLine1! : Phaser.GameObjects.Text;
    // private textLine2! : Phaser.GameObjects.Text;
    private selectedBattleMenuOption :  BattleOPtions; // this is for the player options light Fight Run Switch 
    private attackCursorObject! : Phaser.GameObjects.Image;
    private InfoPanelMessages: string[] ;
    private InfoPanelCallBack ?: ()=>void;
    private WaitForPlayerInput: boolean ; 
    private SelectedAttackIndex: number |undefined;
    private activeBattleMenu: ActiveBattleMenu;
    private selectedMove: MoveList;
    private PokemonAttackList! : Phaser.GameObjects.Container;





    constructor(scene: Phaser.Scene){
        this.scene= scene
        this.createMainInfoPane();
        this.createMainBattleMenu();
        this.PokemonAttackSubMenu();
        this.HidePokemonAttackMenu();
        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        this.InfoPanelCallBack= undefined;
        this.InfoPanelMessages= [];
        this.WaitForPlayerInput=false;
        this.SelectedAttackIndex=undefined
        this.activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
        this.selectedMove = MOVES_LIST.MOVE_1;

    }

    //returns the attack index 0 ,1,2,3 
    get selectedAttack(){
        if(this.activeBattleMenu ===ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT)
            return this.SelectedAttackIndex;
    }

    //To show the initial Info Pane about pokemon appearing and player options 
    showMainBattleMenu(){
        this.activeBattleMenu =ACTIVE_BATTLE_MENU.BATTLE_MAIN;
        this.MainMenu.setAlpha(1);
        //setting default to FIGHT so the the cursor is there 
        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT
        this.cursorObject.setPosition(60,45)
        this.SelectedAttackIndex=undefined
        //this is the pokemon attacks Menu 
        this.HidePokemonAttackMenu();
    }

    //To hide the main Info Pane
    hideMainBattleMenu(){
        this.MainMenu.setAlpha(0); 
    }
    
    //To Show the Player Options 
    // showPlayerOptionsList(){
    //     this.PlayerOptions.setAlpha(1);
    // }

    // //To hide the player options 
    // hidePlayerOptionsList(){
    //     this.PlayerOptions.setAlpha(0);
    // }

    // this is Pokemon Attcks Part 

    ShowPokemonAttackMenu(){
        this.activeBattleMenu =ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT;
        this.PokemonAttackList.setAlpha(1);
    }

    HidePokemonAttackMenu(){
        this.PokemonAttackList.setAlpha(0);
    }

    playerInput(input: 'OK' | 'CANCEL' |Direction  ){

        if(this.WaitForPlayerInput && (input === 'CANCEL' ||input==='OK')){
            this.updateInfoPaneWithMessage();
            return;
        }

        if (input === 'CANCEL'){
            this.SwitchToMainBattleMenu();
            
            return ; }

        if(input ==='OK'){  
            if(this.activeBattleMenu= ACTIVE_BATTLE_MENU.BATTLE_MAIN){
                this.chooseMainBattleOption();                
                return
            }
            if(this.activeBattleMenu= ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT){
                this.ChosenAttack();
                return
            }
            return;
        }
        this.updateSelectedBattleMenuOptions(input);
        this.updatePokemonAttackOptions(input);
        this.updateCursorPosition();
        this.updateAttackCursorPosition();

        
    }

    // This is for messages in the Player options  
    updateInfoPaneMsgsWaitForPlayerInput(messages: string[], callback?: ()=>void ){
        this.InfoPanelMessages=messages;
        this.InfoPanelCallBack=callback;
        this.updateInfoPaneWithMessage();

    }

    // This is for Displaing the Msgs 
    private updateInfoPaneWithMessage(){
        this.WaitForPlayerInput= false;
        this.addText();

        if(this.InfoPanelMessages.length===0){
            if(this.InfoPanelCallBack){
                const callback = this.InfoPanelCallBack;
                this.InfoPanelCallBack = undefined
                callback();
            }
            return;
        }
        const msgToDisplay: string = this.InfoPanelMessages.shift() ?? "Default message";
        this.addText(msgToDisplay)
        this.WaitForPlayerInput = true;

    }

    private createMainBattleMenu(){
        this.MainMenu =  this.scene.add.container(0,390,[
            this.scene.add.text(50, 60, "What Should Pikachu Do?", {
                fontSize: "20px",
                color: "#fff",
            })]) ;
        
        this.cursorObject = this.scene.add.image(60, 45, CURSORS.CURSOR , 0).setOrigin(0.5).setScale(2.5)

        
        this.PlayerOptions = this.scene.add.container(500,395,[            
            this.createMainInfoSubPane(),
            this.scene.add.text(70,35 , BATTLE_MENU_OPTIONS.FIGHT, Style),
            this.scene.add.text(230,35 , BATTLE_MENU_OPTIONS.RUN, Style),
            this.scene.add.text(70,90 , BATTLE_MENU_OPTIONS.SWITCH, Style ),
            this.cursorObject,
        ])        
        this.hideMainBattleMenu();
        
    }
    
    private PokemonAttackSubMenu(){
        this.attackCursorObject = this.scene.add.image(60, 45 , CURSORS.CURSOR, 0 ).setOrigin(0.5).setScale(2.5);
        this.PokemonAttackList =  this.scene.add.container(0,395, [
            this.scene.add.text(70,35 , MOVES_LIST.MOVE_1, Style),
            this.scene.add.text(290,35 , MOVES_LIST.MOVE_2, Style),
            this.scene.add.text(70,90 , MOVES_LIST.MOVE_3, Style ),
            this.scene.add.text(290,90 , MOVES_LIST.MOVE_4, Style ),
            this.attackCursorObject
        ])

        this.HidePokemonAttackMenu();
    }


    private createMainInfoPane(){
        const padding = 4 
        const rectheight = 142
        return this.scene.add.rectangle(0, this.scene.scale.height - rectheight -padding, this.scene.scale.width ,rectheight, 0x000000)
        .setOrigin(0)
        .setStrokeStyle(8,0xffff77,1)
    }

    //ui stuff for the side menu
    private createMainInfoSubPane(){
        
        const rectheight = 142
        const rectwidth=460
        return this.scene.add.rectangle(0,0,rectwidth,rectheight, 0x000000)
        .setOrigin(0)
        .setStrokeStyle(8,0xffff77,1)

    }


    private updateSelectedBattleMenuOptions(direction: Direction) {

        const currentOption = this.selectedBattleMenuOption;

        if (currentOption === BATTLE_MENU_OPTIONS.FIGHT) {
            if (direction === DIRECTION.RIGHT) {
                this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.RUN;
            } else if (direction === DIRECTION.DOWN) {
                this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
            }
        } else if (currentOption === BATTLE_MENU_OPTIONS.RUN && direction === DIRECTION.LEFT) {
            this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        } else if (currentOption === BATTLE_MENU_OPTIONS.SWITCH && direction === DIRECTION.UP) {
            this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        }

        // Update cursor position
        this.updateCursorPosition();
    }

    private updateCursorPosition() {
        switch (this.selectedBattleMenuOption) {
            case BATTLE_MENU_OPTIONS.FIGHT:
                this.cursorObject.setPosition(60, 45);
                break;
            case BATTLE_MENU_OPTIONS.RUN:
                this.cursorObject.setPosition(220, 45);
                break;
            case BATTLE_MENU_OPTIONS.SWITCH:
                this.cursorObject.setPosition(60, 97);
                break;
            default:
                console.warn("Unknown menu option:", this.selectedBattleMenuOption);
                break;
        }
    }

    private updatePokemonAttackOptions(direction:Direction){
        if (this.activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT) {
            return;
        }
        const transitions: Record<MoveList, Partial<Record<Direction, MoveList>>> = {
            MOVE_1: {
                RIGHT: "MOVE_2",
                DOWN: "MOVE_3",
            },
            MOVE_2: {
                LEFT: "MOVE_1",
                DOWN: "MOVE_4",
            },
            MOVE_3: {
                RIGHT: "MOVE_4",
                UP: "MOVE_1",
            },
            MOVE_4: {
                LEFT: "MOVE_3",
                UP: "MOVE_2",
            },
        };

    const newOption = transitions[this.selectedMove]?.[direction];
    if (newOption) {
        this.selectedMove = newOption;
    }
}




    private updateAttackCursorPosition(){
        if(this.activeBattleMenu !==ACTIVE_BATTLE_MENU.BATTLE_MOVE_SELECT){
            return ;

        }

        switch(this.selectedMove){
            case MOVES_LIST.MOVE_1:
                this.attackCursorObject.setPosition(40,55);
                return;
            case MOVES_LIST.MOVE_2:
                this.attackCursorObject.setPosition(40,55);
                return;
            case MOVES_LIST.MOVE_3:
                this.attackCursorObject.setPosition(40,55);
                return;
            case MOVES_LIST.MOVE_4:
                this.attackCursorObject.setPosition(40,55);
                return;
        }

    }
    



    private SwitchToMainBattleMenu(){

        this.HidePokemonAttackMenu();
        this.showMainBattleMenu();
        this.addText();
    }

    private  chooseMainBattleOption(){
        
        this.hideMainBattleMenu();

        if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT){
            this.hideMainBattleMenu();
            this.ShowPokemonAttackMenu();
            return; 


        }
        if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.RUN){
            console.log(this.selectedBattleMenuOption)
            this.activeBattleMenu = ACTIVE_BATTLE_MENU.RUN
            
            this.updateInfoPaneMsgsWaitForPlayerInput(["Running Away ... "], ()=>{
                console.log("run")
                this.SwitchToMainBattleMenu();
            })
            
            return;
        }
        if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH){
            console.log(this.selectedBattleMenuOption)
            this.activeBattleMenu = ACTIVE_BATTLE_MENU.SWITCH
            this.updateInfoPaneMsgsWaitForPlayerInput(["No Other Pokemon.."], ()=>{
                this.SwitchToMainBattleMenu();
            })
            return;
        }

}
    private ChosenAttack(){
        let SelectedAttackIndex =0 ;
        switch(this.selectedMove){
            case MOVES_LIST.MOVE_1:
                SelectedAttackIndex =0
                break;
            case MOVES_LIST.MOVE_2:
                SelectedAttackIndex =1
                break;
            case MOVES_LIST.MOVE_3:
                SelectedAttackIndex =2
                break;
            case MOVES_LIST.MOVE_4:
                SelectedAttackIndex =3
                break;
            default:
                return

        }
        this.SelectedAttackIndex = SelectedAttackIndex

    }

    private addText(msg? : string ){
        if(!this.textLine1){
            this.textLine1 = this.scene.add.text(50, 450, "",{ fontSize: "20px",
                color: "#fff",
            })
        }
        if(msg){
            this.textLine1.setText(msg);
        }else{
            this.textLine1.setText("");
        }

    }
}