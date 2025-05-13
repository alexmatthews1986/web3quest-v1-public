
import Phaser from 'phaser';

export default class TravelMapUI extends Phaser.Scene {
  constructor() {
    super({ key: 'TravelMapUI' });
  }

  preload(): void {
    this.load.image('map_zone', 'assets/map_background.png');
  }

  create(): void {
    this.add.image(400, 300, 'map_zone').setAlpha(0.5);

    this.add.text(300, 60, 'Fast Travel Map', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    const zone1 = this.add.text(260, 250, '🌀 Training Grounds', {
      fontSize: '20px',
      color: '#00ccff',
      backgroundColor: '#000000'
    })
    .setPadding(10)
    .setInteractive()
    .on('pointerdown', () => {
      console.log('Travel to Training Grounds');
      this.scene.stop();
    });

    const zone2 = this.add.text(260, 320, '🏰 Founder’s Domain', {
      fontSize: '20px',
      color: '#00ccff',
      backgroundColor: '#000000'
    })
    .setPadding(10)
    .setInteractive()
    .on('pointerdown', () => {
      console.log('Travel to Founder Zone');
      this.scene.stop();
    });
  }
}
