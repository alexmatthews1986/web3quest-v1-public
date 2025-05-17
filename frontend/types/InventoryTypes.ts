/**
 * Represents an item stored in a player's inventory.
 * Extendable for metadata, rarity, utility, and ownership.
 */
export interface InventoryItem {
  name: string;            // Human-readable name of the item
  iconKey: string;         // Key used to fetch the item's sprite or icon
  type?: string;           // e.g. 'scroll', 'key', 'badge', 'token'
  description?: string;    // Short lore or functional description
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'; // Optional tier
  nftId?: string;          // FUTURE: On-chain token ID (if minted)
  quantity?: number;       // For stackable items (e.g. coins)
  isLocked?: boolean;      // For gated items (e.g. unlock via quest)
  createdAt?: number;      // Timestamp for tracking item history
}
