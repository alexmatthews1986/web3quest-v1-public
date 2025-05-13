
// frontend/MainScene.ts
import Phaser from 'phaser';
import XPOverlay from './XPOverlay';

export default class MainScene extends Phaser.Scene {
  private xpOverlay!: XPOverlay;
  private currentXP: number = 0;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    this.load.image('scroll', 'assets/scroll_popup.png');
    this.load.image('icon_xp', 'assets/icon_xp.png');
    this.load.image('map_bg', 'assets/map_background.png');
    this.load.image('milestone', 'assets/milestone_popup.png');
    this.load.image('npc', 'assets/npc_placeholder.png');
  }

  create(): void {
    this.add.image(400, 300, 'map_bg').setScale(1).setAlpha(0.8);
    this.add.image(400, 300, 'scroll');

    const xpIcon = this.add.image(50, 50, 'icon_xp').setScale(0.5);
    this.add.text(100, 50, 'Welcome to Web3Quest!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    this.xpOverlay = new XPOverlay(this);
    this.xpOverlay.create(this.currentXP);
  }
}
