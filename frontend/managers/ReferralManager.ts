import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';

export default class ReferralManager {
  private db = getFirestore();

  /**
   * Logs a new referral connection between a referred user and their referrer.
   * Stores timestamp in a subcollection under the referrer.
   * @param userId - The ID of the newly referred user.
   * @param referrerId - The ID of the user who referred them.
   */
  async logReferral(userId: string, referrerId: string): Promise<void> {
    try {
      const ref = doc(this.db, 'users', referrerId, 'referrals', userId);
      await setDoc(ref, {
        referredAt: Date.now(),

        // FUTURE: Add campaign ID, referral source, bonus tier, etc.
      });
      console.log(`✅ Referral logged: ${userId} referred by ${referrerId}`);
    } catch (error) {
      console.error(`❌ Failed to log referral`, error);
      // TODO: Send error to analytics or retry system
    }
  }

  /**
   * Returns the total number of users referred by a specific referrer.
   * @param referrerId - The ID of the referring user.
   * @returns Number of referred users.
   */
  async getReferralCount(referrerId: string): Promise<number> {
    try {
      const ref = collection(this.db, 'users', referrerId, 'referrals');
      const snap = await getDocs(ref);
      return snap.size;
    } catch (error) {
      console.error(`❌ Failed to fetch referral count`, error);
      return 0;
    }
  }

  /**
   * FUTURE: Return a list of all referred user IDs or metadata.
   * Useful for leaderboards, reward unlocks, or gamified referral quests.
   */
  async getReferredUsers(referrerId: string): Promise<string[]> {
    const ref = collection(this.db, 'users', referrerId, 'referrals');
    const snap = await getDocs(ref);
    return snap.docs.map(doc => doc.id);
  }
}
