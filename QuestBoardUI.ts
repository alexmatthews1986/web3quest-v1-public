
import Phaser from 'phaser';

export default class QuestBoardUI extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    const bg = scene.add.rectangle(400, 300, 600, 400, 0x111111).setOrigin(0.5);
    const title = scene.add.text(400, 150, 'Quest Board', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add([bg, title]);
    scene.add.existing(this);
  }
}
