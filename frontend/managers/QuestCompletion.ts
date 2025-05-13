import FirestoreManager from './FirestoreManager'

export default class QuestCompletion {
  private scene: Phaser.Scene
  private firestore: FirestoreManager
  private userId: string

  constructor(scene: Phaser.Scene, userId: string = 'guest') {
    this.scene = scene
    this.userId = userId
    this.firestore = new FirestoreManager()
  }

  createCompletionZone(x: number, y: number, questId: string) {
    const zone = this.scene.add.zone(x, y, 100, 100).setOrigin(0.5)
    zone.setInteractive().on('pointerdown', async () => {
      await this.firestore.setQuestStatus(this.userId, questId, 'completed')
      this.scene.add.text(x - 40, y - 30, 'Quest Complete!', {
        fontSize: '16px',
        color: '#66ff66'
      })
    })
  }
}
