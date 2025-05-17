
import Phaser from 'phaser';
import XPOverlay from './XPOverlay';
import DialogManager from './DialogManager';
import InventoryUI from './InventoryUI';
import QuestManager from './managers/QuestManager';

let inventoryUI: InventoryUI;

export default class MainScene extends Phaser.Scene {
  private xpOverlay!: XPOverlay;
  private dialog!: DialogManager;
  private currentXP: number = 0;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    // Load icon and UI assets
    this.load.image('icon_xp', 'assets/icon_xp.png');
    this.load.image('scroll', 'scroll_popup.png');
    // NOTE: Add more assets here as needed
  }

  create(): void {
    // Inventory UI
    inventoryUI = new InventoryUI(this);

    // Toggle inventory with "I" key
    this.input.keyboard.on('keydown-I', () => {
      inventoryUI.toggle();
    });

    // XP overlay setup
    this.currentXP = 0; // NOTE: Later fetch real value
    this.xpOverlay = new XPOverlay(this);
    this.xpOverlay.create(this.currentXP);

    // Dialog intro
    this.dialog = new DialogManager(this);
    this.dialog.show("Welcome to Web3Quest! Tap to continue.");

    // On first click, hide dialog and give XP
    this.input.once('pointerdown', () => {
      this.dialog.hide();
      this.rewardXP(50);
    });

    // 🧭 TEMP QUEST BOARD ZONE (click to open QuestBoardUI)
    const questBoardZone = this.add.rectangle(600, 200, 100, 100, 0x00ffcc, 0.3)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.launch('QuestBoardUI'); // Open quest UI
        this.scene.pause(); // Pause game while quest UI is open
      });

    // TODO: Replace with NPC click or map zimport Phaser from 'phaser';
import XPOverlay from './XPOverlay';
import DialogManager from './DialogManager';
import InventoryUI from './InventoryUI';
import QuestManager from './managers/QuestManager';

let inventoryUI: InventoryUI;

export default class MainScene extends Phaser.Scene {
  private xpOverlay!: XPOverlay;
  private dialog!: DialogManager;
  private currentXP: number = 0;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    // Load UI assets
    this.load.image('icon_xp', 'assets/icon_xp.png');
    this.load.image('scroll', 'scroll_popup.png');

    // 🎤 Speaker portrait (future)
    this.load.image('mentor_portrait', 'assets/portraits/mentor.png');

    // 🎵 Scroll sound FX (hook-ready)
    this.load.audio('dialogue_scroll_fx', 'assets/audio/scroll_open.mp3');

    // NOTE: Add more NPCs, themes, and sounds here
  }

  create(): void {
    // 🧰 Inventory UI
    inventoryUI = new InventoryUI(this);
    this.input.keyboard.on('keydown-I', () => inventoryUI.toggle());

    // 🧪 XP Overlay
    this.currentXP = 0; // Replace with Firestore value later
    this.xpOverlay = new XPOverlay(this);
    this.xpOverlay.create(this.currentXP);

    // 📜 Dialogue Intro (enhanced)
    this.dialog = new DialogManager(this);
    this.dialog.showPortrait('mentor_portrait');         // Show mentor face
    this.dialog.showSpeaker('Mentor');                   // Show name
    this.dialog.typeText('Welcome to Web3Quest! Tap to continue.', 40); // Typewriter effect

    // 🎯 First click: Close dialog + grant XP
    this.input.once('pointerdown', () => {
      this.dialog.hideDialogue();
      this.rewardXP(50);
    });

    // 🧭 TEMP QUEST BOARD ZONE (open QuestBoardUI)
    const questBoardZone = this.add.rectangle(600, 200, 100, 100, 0x00ffcc, 0.3)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.launch('QuestBoardUI');
        this.scene.pause();
      });

    // TODO: Replace with NPC or trigger zone logic
  }

  rewardXP(amount: number): void {
    this.currentXP += amount;
    this.xpOverlay.update(this.currentXP);
  }
}
one trigger
  }

  rewardXP(amount: number): void {
    this.currentXP += amount;
    this.xpOverlay.update(this.currentXP);
  }
}

