import Phaser from "phaser"

export class Background{
    private scene : Phaser.Scene;
    private backgroundGameObject !: Phaser.GameObjects.Image;

    constructor(scene:Phaser.Scene){
        this.scene= scene;
        this.backgroundGameObject =this.scene.add.image(0, -0, "battleScene");
        this.backgroundGameObject.setOrigin(0, 0);
        this.backgroundGameObject.setScale(
            this.scene.scale.width / this.backgroundGameObject.width,
            (this.scene.scale.height - 100) / this.backgroundGameObject.height
        );
        this.backgroundGameObject.y -= 50;

        this.backgroundGameObject.setAlpha(0);

    }

    showBackground(){
        this.backgroundGameObject.setAlpha(1);
    }


}