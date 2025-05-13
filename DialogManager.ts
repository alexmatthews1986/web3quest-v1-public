
import Phaser from 'phaser';

export default class DialogueManager {
  private scene: Phaser.Scene;
  private dialogBox!: Phaser.GameObjects.Rectangle;
  private dialogText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  showDialogue(message: string): void {
    if (this.dialogBox) this.dialogBox.destroy();
    if (this.dialogText) this.dialogText.destroy();

    this.dialogBox = this.scene.add.rectangle(400, 500, 700, 100, 0x000000, 0.8).setOrigin(0.5);
    this.dialogText = this.scene.add.text(120, 470, message, {
      fontSize: '18px',
      color: '#ffffff',
      wordWrap: { width: 560 }
    });
  }

  hideDialogue(): void {
    this.dialogBox?.destroy();
    this.dialogText?.destroy();
  }
}
