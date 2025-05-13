
import FirestoreManager from './FirestoreManager'

export default class QuestManager {
  private firestore = new FirestoreManager()
  private userId: string = 'guest'

  async acceptQuest(questId: string) {
    await this.firestore.setQuestStatus(this.userId, questId, 'accepted')
  }

  async completeQuest(questId: string) {
    await this.firestore.setQuestStatus(this.userId, questId, 'completed')
  }
}
