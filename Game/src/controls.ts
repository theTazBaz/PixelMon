import { Direction, DIRECTION } from "./direction";

export class Controls{
    private scene : Phaser.Scene;
    private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    private enterKey!: Phaser.Input.Keyboard.Key;

    private lockPlayerInput:boolean;
    
    constructor(scene:Phaser.Scene){
        this.scene = scene
        this.cursorKeys = this.scene.input.keyboard!.createCursorKeys();
        this.enterKey = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.lockPlayerInput=false;
    }
    get isInputLocked(){
        return this.lockPlayerInput;
    }

    set lockInput(val:boolean){
        this.lockPlayerInput=val;
    }

    wasEnterKeyPressed(){
        if(this.enterKey===undefined){
            return false;
        }
        return Phaser.Input.Keyboard.JustDown(this.enterKey);
        

    }
    wasShiftKeyPressed(){
        if(this.cursorKeys===undefined){
            return false;
        }
        return Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift);

    }
    getDirectionKeyPressedDown(){
        if(this.cursorKeys===undefined){
            return DIRECTION.NONE;
        }
        let selectedDirection :Direction= DIRECTION.NONE;
        if(this.cursorKeys.left.isDown){
            selectedDirection=DIRECTION.LEFT
        }else if(this.cursorKeys.right.isDown){
            selectedDirection=DIRECTION.RIGHT
        }else if(this.cursorKeys.up.isDown){
            selectedDirection=DIRECTION.UP
        }else if(this.cursorKeys.down.isDown){
            selectedDirection=DIRECTION.DOWN
        }
    
        return selectedDirection;
    }
    getDirectionKeyJustPressed(){
        if(this.cursorKeys===undefined){
            return DIRECTION.NONE;
        }
        let selectedDirection :Direction= DIRECTION.NONE;
        if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)){
            selectedDirection=DIRECTION.LEFT
        }else if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)){
            selectedDirection=DIRECTION.RIGHT
        }else if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)){
            selectedDirection=DIRECTION.UP
        }else if(Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)){
            selectedDirection=DIRECTION.DOWN
        }
    
        return selectedDirection;
    }
}