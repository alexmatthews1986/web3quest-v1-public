
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'

export default class FirestoreManager {
  private db = getFirestore()

  async logEvent(event: string, userId: string = 'guest') {
    try {
      await addDoc(collection(this.db, 'logs'), {
        event,
        userId,
        timestamp: serverTimestamp()
      })
      console.log(`[Firestore] Logged event: ${event}`)
    } catch (err) {
      console.error('[Firestore] Log error:', err)
    }
  }

  async updateXP(userId: string, xp: number) {
    try {
      await setDoc(doc(this.db, 'users', userId), {
        xp,
        updated: serverTimestamp()
      }, { merge: true })
      console.log(`[Firestore] XP updated: ${xp}`)
    } catch (err) {
      console.error('[Firestore] XP update failed:', err)
    }
  }

  async setQuestStatus(userId: string, questId: string, status: 'accepted' | 'completed') {
    try {
      const path = doc(this.db, 'users', userId, 'quests', questId)
      await setDoc(path, {
        status,
        timestamp: serverTimestamp()
      }, { merge: true })
      console.log(`[Firestore] Quest ${status}: ${questId}`)
    } catch (err) {
      console.error('[Firestore] Quest update failed:', err)
    }
  }
}
