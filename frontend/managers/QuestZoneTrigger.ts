import DialogueTreeManager from './DialogueTreeManager';
import { DialogueNode } from '../types/DialogManager';
// NOTE: Replace with dynamic import if using Webpack or load from Firestore if needed
import mentorDialogue from '../assets/dialogue/mentor.json';

export default class QuestZoneTrigger {
  private scene: Phaser.Scene;
  private dialogueTree: DialogueTreeManager;

  constructor(scene: Phaser.Scene, dialogueData?: Record<string, DialogueNode>) {
    this.scene = scene;

    const parsedDialogue: Record<string, DialogueNode> = dialogueData ?? mentorDialogue;
    this.dialogueTree = new DialogueTreeManager(scene, parsedDialogue);
  }

  /**
   * Creates a quantum-safe zone that triggers a dialogue chain with XP/item grants or quest logic.
   * @param config - full zone configuration object
   */
  createQuantumTrigger(config: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    nodeId: string;
    npcName?: string;
    visible?: boolean;
    onTrigger?: () => void;
    glowEffect?: boolean;
    rewardXP?: number;
    grantItem?: () => void;
  }): void {
    const {
      x, y, width = 100, height = 100,
      nodeId, npcName,
      visible = false,
      onTrigger,
      glowEffect = false,
      rewardXP,
      grantItem
    } = config;

    const zone = this.scene.add.rectangle(x, y, width, height, 0x00ffcc, visible ? 0.3 : 0)
      .setInteractive()
      .on('pointerdown', () => {
        if (onTrigger) onTrigger();
        if (rewardXP && this.scene.registry) {
          let xp = this.scene.registry.get('xp') || 0;
          this.scene.registry.set('xp', xp + rewardXP);
        }
        if (grantItem) grantItem();
        this.dialogueTree.start(nodeId);
      });

    if (glowEffect) {
      const glow = this.scene.add.graphics();
      glow.lineStyle(2, 0xffff66);
      glow.strokeRectShape(zone.getBounds());
    }

    if (npcName) {
      this.scene.add.text(x - 40, y - height / 2 - 20, npcName, {
        fontSize: '14px',
        color: '#00ffff'
      });
    }
  }
}
