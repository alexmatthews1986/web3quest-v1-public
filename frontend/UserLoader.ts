
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default class UserLoader {
  static async loadUserData(userId: string): Promise<any> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.warn('No user data found');
      return null;
    }
  }
}
