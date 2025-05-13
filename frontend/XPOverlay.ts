
// frontend/XPOverlay.ts
import Phaser from 'phaser';

export default class XPOverlay {
  private scene: Phaser.Scene;
  private xpText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(initialXP: number): void {
    this.xpText = this.scene.add.text(650, 20, `XP: ${initialXP}`, {
      fontSize: '18px',
      color: '#00ff99',
      fontFamily: 'Arial'
    });
  }

  updateXP(newXP: number): void {
    if (this.xpText) {
      this.xpText.setText(`XP: ${newXP}`);
    }
  }
}
