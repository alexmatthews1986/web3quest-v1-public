import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default class RewardManager {
  static async grantXP(userId: string, amount: number): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      xp: increment(amount)
    });
  }
}
