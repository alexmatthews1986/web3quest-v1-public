
import Phaser from 'phaser';
import XPOverlay from './XPOverlay';
import DialogManager from './DialogManager';
import InventoryUI from './InventoryUI';
import PlayerManager from './managers/PlayerManager';

await PlayerManager.loadPlayerState(); // on login
await PlayerManager.rewardXP(50);      // after quest
await PlayerManager.rewardItem({ name: 'Golden Scroll', iconKey: 'icon_scroll' }); // drop

// 🎯 Example test quest reward
this.time.delayedCall(2000, async () => {
  this.dialog.show("You've found a secret scroll!");
  await PlayerManager.rewardItem({ name: 'Ancient Scroll', iconKey: 'icon_scroll' });
  await PlayerManager.rewardXP(25);
});

let inventoryUI: InventoryUI;

export default class MainScene extends Phaser.Scene {
  private xpOverlay!: XPOverlay;
  private dialog!: DialogManager;
  private currentXP: number = 0;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    // Preload inventory icons and background
    this.load.image('icon_xp', 'assets/icon_xp.png');
    this.load.image('icon_scroll', 'assets/icon_scroll.png');
    this.load.image('icon_key', 'assets/icon_key.png');
    this.load.image('inventory_bg', 'assets/inventory_bg.png');

    // Other UI assets
    this.load.image('scroll', 'scroll_popup.png');
  }

  create(): void {
    // Inventory UI
    inventoryUI = new InventoryUI(this);

    // Keybinding to toggle inventory
    this.input.keyboard.on('keydown-I', () => {
      inventoryUI.toggle();
    });

    // XP overlay logic
    this.currentXP = 0; // NOTE: Later fetch real value
    this.xpOverlay = new XPOverlay(this);
    this.xpOverlay.create(this.currentXP);

    // Dialog logic
    this.dialog = new DialogManager(this);
    this.dialog.show("Welcome to Web3Quest! Tap to continue.");

    // Initial user click handling
    this.input.once('pointerdown', () => {
      this.dialog.hide();
      this.rewardXP(50);
    });
  }

  rewardXP(amount: number): void {
    this.currentXP += amount;
    this.xpOverlay.update(this.currentXP);
  }
}
