
import Phaser from 'phaser';
import QuestManager from '../managers/QuestManager'; // NOTE: Adjust path if needed

export default class QuestBoardUI extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestBoardUI' });
  }

  create(): void {
    // Background panel
    this.add.rectangle(400, 300, 500, 400, 0x333333, 0.9);

    // Title text
    this.add.text(270, 160, 'Available Quests', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // Sample quest description
    const questText = this.add.text(240, 240, '🧭  Complete Tutorial Quest\n📜  Reach the XP Scroll\n🌍  Earn your first reward!', {
      fontSize: '18px',
      color: '#ffff88',
      lineSpacing: 12
    });

    // Accept button
    const acceptBtn = this.add.text(350, 370, '[ I Accept Quest ]', {
      fontSize: '20px',
      color: '#00ffcc',
      backgroundColor: '#002222'
    })
    .setPadding(10)
    .setInteractive()
    .on('pointerdown', async () => {
      // TODO: Replace hardcoded ID with dynamic quest ID when looping through JSON
      const questManager = new QuestManager();
      await questManager.acceptQuest('tutorial_scroll');
      this.scene.stop(); // Optional: resume main game instead
      // this.scene.resume('MainScene');
    });

    // FUTURE: Loop through multiple quests from Firestore/JSON
    /*
    quests.forEach((quest, i) => {
      this.add.text(250, 200 + i * 50, quest.title, {
        fontSize: '18px',
        color: '#ffffcc'
      });
    });
    */
  }
}

