
export default class ReferralManager {
  async logReferral(userId: string, referrerId: string): Promise<void> {
    const db = getFirestore();
    const ref = doc(db, 'users', referrerId, 'referrals', userId);
    await setDoc(ref, { referredAt: Date.now() });
  }

  async getReferralCount(referrerId: string): Promise<number> {
    const ref = collection(db, 'users', referrerId, 'referrals');
    const snap = await getDocs(ref);
    return snap.size;
  }
}
