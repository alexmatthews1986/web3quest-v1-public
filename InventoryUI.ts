
import Phaser from 'phaser';
import { InventoryItem } from '../types/InventoryTypes'; // FUTURE: create and import if needed
import { getPlayerInventory } from '../managers/InventoryManager'; // TODO: create InventoryManager.ts with dummy inventory

export default class InventoryUI extends Phaser.GameObjects.Container {
  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Image;
  private itemIcons: Phaser.GameObjects.Image[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;
    this.scene.add.existing(this);

    // Build UI
    this.background = this.scene.add.image(400, 300, 'inventory_bg'); // TODO: add asset
    this.background.setScale(0.8);
    this.add(this.background);

    this.setDepth(100); // Ensure UI is on top
    this.setVisible(false); // Hidden by default

    this.loadItems();
  }

  // Load inventory items visually
  private loadItems(): void {
    const inventory: InventoryItem[] = getPlayerInventory();

    inventory.forEach((item, index) => {
      const icon = this.scene.add.image(
        300 + (index % 5) * 70,
        220 + Math.floor(index / 5) * 70,
        item.iconKey
      );
      icon.setScale(0.6);
      icon.setInteractive();
      icon.on('pointerdown', () => this.handleItemClick(item));
      this.add(icon);
      this.itemIcons.push(icon);
    });
  }

  private handleItemClick(item: InventoryItem): void {
    // TODO: Show item details or trigger usage
    console.log('Clicked item:', item.name);
  }

  public toggle(): void {
    this.setVisible(!this.visible);
  }

  public refresh(): void {
    this.itemIcons.forEach(icon => icon.destroy());
    this.itemIcons = [];
    this.loadItems();
  }
}
