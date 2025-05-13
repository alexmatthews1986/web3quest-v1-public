
import Phaser from 'phaser';

export default class XPOverlay {
  private scene: Phaser.Scene;
  private xpText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(xp: number): void {
    this.xpText = this.scene.add.text(20, 20, `XP: ${xp}`, {
      fontSize: '18px',
      color: '#00ff00',
      fontFamily: 'Arial',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 },
    }).setScrollFactor(0);
  }

  updateXP(xp: number): void {
    if (this.xpText) {
      this.xpText.setText(`XP: ${xp}`);
    }
  }
}


import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default class RewardManager {
  static async grantXP(userId: string, amount: number): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      xp: increment(amount)
    });
  }
}


import Phaser from 'phaser';
import XPOverlay from './XPOverlay';
import DialogManager from './DialogManager';

export default class MainScene extends Phaser.Scene {
  private xpOverlay!: XPOverlay;
  private dialog!: DialogManager;
  private currentXP: number = 0;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    this.load.image('scroll', 'scroll_popup.png');
  }

  create(): void {
    this.currentXP = 0; // Later fetch real value
    this.xpOverlay = new XPOverlay(this);
    this.xpOverlay.create(this.currentXP);

    this.dialog = new DialogManager(this);
    this.dialog.show("Welcome to Web3Quest! Tap to continue.");

    this.input.once('pointerdown', () => {
      this.dialog.hide();
      this.rewardXP(50);
    });
  }

  rewardXP(amount: number): void {
    this.currentXP += amount;
    this.xpOverlay.updateXP(this.currentXP);
  }
}

