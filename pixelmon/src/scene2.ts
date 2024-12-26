import Phaser from "phaser";

export default class scene2 extends Phaser.Scene {
    constructor() {
        super("scene2");
    }

    create() {
        this.add.text(480, 270, "Welcome to Scene 2", {
            font: "48px Arial",
            color: "#ffffff",
        }).setOrigin(0.5);
    }
}
