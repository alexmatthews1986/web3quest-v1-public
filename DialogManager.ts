
import Phaser from 'phaser';

export default class DialogManager {
  private scene: Phaser.Scene;
  private dialogBox?: Phaser.GameObjects.Rectangle;
  private dialogText?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  show(message: string): void {
    this.hide(); // Clear any existing message

    this.dialogBox = this.scene.add.rectangle(400, 500, 700, 100, 0x000000, 0.85).setOrigin(0.5);
    this.dialogText = this.scene.add.text(120, 470, message, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      wordWrap: { width: 560 }
    });
  }

  hide(): void {
    this.dialogBox?.destroy();
    this.dialogText?.destroy();
  }
}

