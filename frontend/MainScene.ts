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
