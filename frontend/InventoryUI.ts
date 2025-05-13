
import Phaser from 'phaser';

export default class InventoryUI extends Phaser.Scene {
  constructor() {
    super({ key: 'InventoryUI' });
  }

  preload(): void {
    this.load.image('scroll', 'assets/scroll_popup.png');
    this.load.image('icon_xp', 'assets/icon_xp.png');
  }

  create(): void {
    this.add.rectangle(400, 300, 500, 400, 0x222222, 0.9);
    this.add.text(300, 160, 'Your Inventory', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    this.add.image(360, 260, 'scroll').setScale(0.7);
    this.add.image(440, 260, 'icon_xp').setScale(0.7);

    this.add.text(330, 340, 'XP Scroll Unlocked', {
      fontSize: '16px',
      color: '#fff',
      fontStyle: 'italic'
    });
  }
}
