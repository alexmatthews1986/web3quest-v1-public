
import Phaser from 'phaser';
import { InventoryItem } from '../types/InventoryTypes';
import { getPlayerInventory } from '../managers/InventoryManager';

export default class InventoryUI extends Phaser.GameObjects.Container {
  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Image;
  private itemIcons: Phaser.GameObjects.Image[] = [];

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene = scene;
    this.scene.add.existing(this);

    this.background = this.scene.add.image(400, 300, 'inventory_bg');
    this.background.setScale(0.8);
    this.add(this.background);

    this.setDepth(100);
    this.setVisible(false);

    this.loadItems();
  }

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
