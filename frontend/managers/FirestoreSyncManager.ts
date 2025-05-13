
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getPlayerInventory } from './InventoryManager';
import { InventoryItem } from '../types/InventoryTypes';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

function getUserId(): string {
  const user = auth.currentUser;
  return user ? user.uid : 'guest';
}

// 🔄 Load inventory from Firestore
export async function loadInventoryFromFirestore(): Promise<InventoryItem[]> {
  const uid = getUserId();
  const ref = doc(db, 'users', uid, 'meta', 'inventory');
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data().items || [];
  } else {
    return getPlayerInventory(); // fallback
  }
}

// ☁️ Save current inventory to Firestore
export async function saveInventoryToFirestore(inventory: InventoryItem[]): Promise<void> {
  const uid = getUserId();
  const ref = doc(db, 'users', uid, 'meta', 'inventory');
  await setDoc(ref, { items: inventory }, { merge: true });
  console.log('Inventory saved to Firestore');
}
