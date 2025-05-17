
import Phaser from 'phaser'

/**
 * Handles displaying and hiding in-game dialogue boxes.
 * Can be extended for NPC conversations, choices, or animated text.
 */
export default class DialogManager {
  private scene: Phaser.Scene;
  private dialogBox!: Phaser.GameObjects.Rectangle;
  private dialogText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Shows a dialogue box with the provided message.
   * @param message - The string to display (can later support markup or multiline).
   */
  showDialogue(message: string): void {
    // Remove any existing dialog elements before showing a new one
    if (this.dialogBox) this.dialogBox.destroy();
    if (this.dialogText) this.dialogText.destroy();

    // Background box (semi-transparent black)
    this.dialogBox = this.scene.add.rectangle(400, 500, 700, 100, 0x000000, 0.8).setOrigin(0.5);

    // Text message, styled and wrapped
    this.dialogText = this.scene.add.text(120, 470, message, {
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: 560 }, // Prevents overflow
    });

    // FUTURE: Add speaker name, animated text, typewriter effect, branching logic, etc.
  }

  /**
   * Hides the currently visible dialogue box and text.
   */
  hideDialogue(): void {
    this.dialogBox?.destroy();
    this.dialogText?.destroy();
  }
}
