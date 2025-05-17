import { DialogueNode } from '../types/DialogManager';
import DialogManager from './DialogManager';

export default class DialogueTreeManager {
  private scene: Phaser.Scene;
  private dialogManager: DialogManager;
  private dialogueData: Record<string, DialogueNode>;
  private currentNodeId: string = '';

  constructor(scene: Phaser.Scene, dialogueData: Record<string, DialogueNode>) {
    this.scene = scene;
    this.dialogueData = dialogueData;
    this.dialogManager = new DialogManager(scene);
  }

  start(startId: string): void {
    this.currentNodeId = startId;
    this.displayCurrentNode();
  }

  private displayCurrentNode(): void {
    const node = this.dialogueData[this.currentNodeId];
    if (!node) return;

    // FUTURE: Apply theme (e.g. npc / quest / system)
    // this.dialogManager.setStyle(node.style ?? 'npc');

    // FUTURE: Show NPC portrait
    // if (node.speakerPortrait) this.dialogManager.showPortrait(node.speakerPortrait);

    // FUTURE: Typewriter animation
    if (node.typingSpeed) {
      this.typeText(`${node.speaker ?? ''}: ${node.text}`, node.typingSpeed);
    } else {
      this.dialogManager.showDialogue(`${node.speaker ?? ''}: ${node.text}`);
    }

    // Handle choices
    if (node.choices?.length) {
      node.choices.forEach((choice, i) => {
        this.scene.add.text(120, 520 + i * 30, choice.text, {
          fontSize: '16px',
          color: '#00ffff',
          backgroundColor: '#222222',
          padding: { x: 8, y: 4 }
        })
        .setInteractive()
        .on('pointerdown', () => {
          if (choice.action) choice.action();
          this.currentNodeId = choice.nextId;
          this.displayCurrentNode();
        });
      });
    } else if (node.next) {
      this.currentNodeId = node.next;
      this.scene.time.delayedCall(1200, () => this.displayCurrentNode());
    }
  }

  private typeText(text: string, speed: number): void {
    // TODO: Reveal text character by character using timers/tweens
    this.dialogManager.showDialogue(text); // TEMP fallback
  }
}
