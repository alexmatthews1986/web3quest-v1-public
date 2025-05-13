
import { InventoryItem } from '../types/InventoryTypes';

export function getPlayerInventory(): InventoryItem[] {
  return [
    { name: 'XP Orb', iconKey: 'icon_xp' },
    { name: 'Golden Scroll', iconKey: 'icon_scroll' },
    { name: 'Mystic Key', iconKey: 'icon_key' }
  ];
}
