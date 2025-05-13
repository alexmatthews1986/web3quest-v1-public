
import Phaser from 'phaser';

export default class QuestBoardUI extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestBoardUI' });
  }

  create(): void {
    this.add.rectangle(400, 300, 500, 400, 0x333333, 0.9);
    this.add.text(270, 160, 'Available Quests', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    const questText = this.add.text(240, 240, '🗺️  Complete Tutorial Quest\n🎯  Reach the XP Scroll\n🪙  Earn your first reward!', {
      fontSize: '18px',
      color: '#ffff88',
      lineSpacing: 12
    });

    const acceptBtn = this.add.text(350, 370, '[ Accept Quest ]', {
      fontSize: '20px',
      color: '#00ffcc',
      backgroundColor: '#002222'
    })
    .setPadding(10)
    .setInteractive()
    .on('pointerdown', () => {
      console.log('Quest Accepted!');
      this.scene.stop();
    });
  }
}
