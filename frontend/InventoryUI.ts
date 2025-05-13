
import { InventoryItem } from '../types/InventoryTypes';

let inventory: InventoryItem[] = [
  { name: 'XP Orb', iconKey: 'icon_xp' },
  { name: 'Golden Scroll', iconKey: 'icon_scroll' },
  { name: 'Mystic Key', iconKey: 'icon_key' },
];

// Return current player inventory
export function getPlayerInventory(): InventoryItem[] {
  return inventory;
}

// Add an item to inventory
export function addItem(newItem: InventoryItem): void {
  inventory.push(newItem);
  console.log(`Added item: ${newItem.name}`);
}

// Remove an item by name
export function removeItem(itemName: string): void {
  inventory = inventory.filter(item => item.name !== itemName);
  console.log(`Removed item: ${itemName}`);
}

// Check if inventory has a specific item
export function hasItem(itemName: string): boolean {
  return inventory.some(item => item.name === itemName);
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
