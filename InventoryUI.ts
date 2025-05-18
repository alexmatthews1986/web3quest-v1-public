import Phaser from 'phaser';

/**
 * InventoryItem represents a single inventory entry.
 */
export interface InventoryItem {
  id: string;
  name: string;
  iconKey: string; // Corresponds to loaded Phaser image asset key
  quantity: number;
}

import { getPlayerInventory } from '../managers/InventoryManager'; // ensure this returns InventoryItem[]

export default class InventoryUI extends Phaser.GameObjects.Container {
  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Image;
  private itemIcons: Phaser.GameObjects.Image[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;
    this.scene.add.existing(this);

    // Build UI background
    this.background = this.scene.add.image(400, 300, 'inventory_bg');
    this.background.setScale(0.8);
    this.add(this.background);

    this.setDepth(100); // Bring to front
    this.setVisible(false); // Hidden by default

    this.loadItems();
  }

  /** Loads player inventory items visually */
  private loadItems(): void {
    const inventory: InventoryItem[] = getPlayerInventory();

    inventory.forEach((item, index) => {
      const icon = this.scene.add.image(
        300 + (index % 5) * 70,
        220 + Math.floor(index / 5) * 70,
        item.iconKey
      );
      this.add(icon);
      this.itemIcons.push(icon);
    });
  }
}
