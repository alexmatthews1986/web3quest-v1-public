
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

import { loadInventoryFromFirestore, saveInventoryToFirestore } from './managers/FirestoreSyncManager';
import { getPlayerInventory } from './managers/InventoryManager';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default class UserLoader {
  static async loadUserData(userId: string): Promise<any> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log('✅ User profile found:', userSnap.data());

      // 🔄 Load inventory
      const inventory = await loadInventoryFromFirestore();
      console.log('✅ Inventory loaded from Firestore:', inventory);

      // ☁️ Optionally sync back to Firestore (e.g. after a reward)
      await saveInventoryToFirestore(getPlayerInventory());

      return userSnap.data();
    } else {
      console.warn('⚠️ No user data found in Firestore');
      return null;
    }
  }
}
