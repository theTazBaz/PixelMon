import Phaser from "phaser";
import "./style.css"

export default class scene1 extends Phaser.Scene
{
    constructor(){
        super("bootGame");
    }
    preload()
    {
        
        this.load.image("startscreen","src/assets/images/startscreen.jpg");
    }
    create() {
        this.add.image(480, 270, "startscreen"); // Add the image
    
        this.add.text(480, 350, "Press Enter to Start", {
            font: "48px DigitalClock", // Use your custom font
            color: "#ffffff",
            stroke: "#000000", // Black outline
            strokeThickness: 6,
        }).setOrigin(0.5); // Center the text

        // Add input listener for the "Enter" key
        const enterKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Ensure `enterKey` is not null
        if (!enterKey) {
            console.error("Keyboard plugin or 'Enter' key mapping is not available.");
            return;
        }

        // Start the next scene when the "Enter" key is pressed
        enterKey.on("down", () => {
            if (this.scene) {
                this.scene.start("scene2");
            } else {
                console.error("Scene Manager is not available.");
            }
        });
    }
    
    
}