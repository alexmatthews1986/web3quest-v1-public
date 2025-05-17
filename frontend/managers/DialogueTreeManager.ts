import { DialogueNode } from '../types/DialogManager';
import DialogManager from './DialogManager';

export default class DialogueTreeManager {
  private scene: Phaser.Scene;
  private dialogManager: DialogManager;
  private dialogueData: Record<string, DialogueNode>;
  private currentNodeId: string = '';
  private choiceTexts: Phaser.GameObjects.Text[] = [];

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

    this.dialogManager.hideDialogue();
    this.clearChoices();

    if (node.speaker) this.dialogManager.showSpeaker(node.speaker);
    if (node.speakerPortrait) this.dialogManager.showPortrait(node.speakerPortrait);

    if (node.typingSpeed) {
      this.dialogManager.typeText(node.text, node.typingSpeed);
    } else {
      this.dialogManager.showDialogue(node.text);
    }

    if (node.choices?.length) {
      node.choices.forEach((choice, i) => {
        const textObj = this.scene.add.text(120, 520 + i * 30, `> ${choice.text}`, {
          fontSize: '16px',
          color: '#00ffff',
          backgroundColor: '#111111',
          padding: { left: 10, right: 10, top: 4, bottom: 4 }
        }).setInteractive();

        textObj.on('pointerdown', () => {
          this.clearChoices();
          if (choice.action) choice.action();
          this.currentNodeId = choice.nextId;
          this.displayCurrentNode();
        });

        this.choiceTexts.push(textObj);
      });
    } else if (node.next) {
      this.scene.input.once('pointerdown', () => {
        this.currentNodeId = node.next!;
        this.displayCurrentNode();
      });
    }
  }

  private clearChoices(): void {
    this.choiceTexts.forEach(t => t.destroy());
    this.choiceTexts = [];
  }
}
