
import { loadInventoryFromFirestore, saveInventoryToFirestore } from './FirestoreSyncManager';
import { getPlayerInventory, addItem } from './InventoryManager';
import { InventoryItem } from '../types/InventoryTypes';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export default class PlayerManager {
  static currentXP: number = 0;

  // 🔐 Get user ID
  static getUserId(): string {
    const user = auth.currentUser;
    return user ? user.uid : 'guest';
  }

  // 🔄 Load full player state (XP + inventory for now)
  static async loadPlayerState(): Promise<void> {
    const uid = this.getUserId();

    // Load XP
    const xpSnap = await getDoc(doc(db, 'users', uid, 'meta', 'xp'));
    if (xpSnap.exists()) {
      this.currentXP = xpSnap.data().amount || 0;
      console.log('✅ XP loaded:', this.currentXP);
    }

    // Load inventory
    const inventory = await loadInventoryFromFirestore();
    console.log('✅ Inventory loaded:', inventory);
  }

  // ☁️ Save full state
  static async savePlayerState(): Promise<void> {
    const uid = this.getUserId();

    // Save XP
    await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { amount: this.currentXP }, { merge: true });

    // Save inventory
    await saveInventoryToFirestore(getPlayerInventory());

    console.log('✅ Player state saved to Firestore');
  }

  // 🧮 Reward XP
  static async rewardXP(amount: number): Promise<void> {
    this.currentXP += amount;
    console.log(`🪙 Gained XP: +${amount} → Total: ${this.currentXP}`);
    await this.savePlayerState();
  }

  // 🎁 Reward Item
  static async rewardItem(item: InventoryItem): Promise<void> {
    addItem(item);
    console.log(`🎁 Item rewarded: ${item.name}`);
    await this.savePlayerState();
  }
}
