import DialogueTreeManager from './DialogueTreeManager';
import { DialogueNode } from '../types/DialogManager';
import mentorDialogue from '../assets/dialogue/mentor.json'; // ensure JSON import is allowed

export default class QuestZoneTrigger {
  private scene: Phaser.Scene;
  private dialogueTree: DialogueTreeManager;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // ⚠️ If JSON import not allowed directly, convert to object or fetch from Firestore
    const parsedDialogue: Record<string, DialogueNode> = mentorDialogue;
    this.dialogueTree = new DialogueTreeManager(scene, parsedDialogue);
  }

  /**
   * Creates an interactive zone on the map that launches a dialogue tree.
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param width - zone width
   * @param height - zone height
   * @param startNodeId - starting dialogue node
   */
  createDialogueZone(x: number, y: number, width: number, height: number, startNodeId: string): void {
    const zone = this.scene.add.rectangle(x, y, width, height, 0x00ffcc, 0.3)
      .setInteractive()
      .on('pointerdown', () => {
        this.dialogueTree.start(startNodeId);
      });

    zone.setStrokeStyle(1, 0x00ffcc); // Optional visible border
  }
}
