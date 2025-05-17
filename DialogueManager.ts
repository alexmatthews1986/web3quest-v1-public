/**
 * DialogueTreeManager
 * Handles branching NPC conversations, player choices, and dialogue sequences.
 * Future expansions: emotional tone, quest links, NPC memory.
 */

export interface DialogueNode {
  id: string;
  text: string;
  speaker?: string;
  choices?: DialogueChoice[];
  next?: string; // fallback continuation
}

export interface DialogueChoice {
  text: string;
  nextId: string;
  action?: () => void; // Optional trigger (e.g., accept quest)
}

export default class DialogueTreeManager {
  private scene: Phaser.Scene;
  private dialogueData: Record<string, DialogueNode>;
  private currentNodeId: string | null = null;

  constructor(scene: Phaser.Scene, dialogueData: Record<string, DialogueNode>) {
    this.scene = scene;
    this.dialogueData = dialogueData;
  }

  /**
   * Start the dialogue tree from a specific node.
   */
  start(nodeId: string): void {
    this.currentNodeId = nodeId;
    this.displayCurrentNode();
  }

  /**
   * Render current dialogue node and choices.
   */
  private displayCurrentNode(): void {
    if (!this.currentNodeId) return;

    const node = this.dialogueData[this.currentNodeId];
    if (!node) return;

    // Show main dialogue text (use your DialogManager)
    const speaker = node.speaker ? `${node.speaker}: ` : '';
    const fullMessage = `${speaker}${node.text}`;

    const dialogManager = new DialogManager(this.scene);
    dialogManager.showDialogue(fullMessage);

    // TODO: Display choices if any
    if (node.choices && node.choices.length > 0) {
      node.choices.forEach((choice, index) => {
        const y = 500 + index * 30;
        const choiceText = this.scene.add.text(120, y, choice.text, {
          fontSize: '16px',
          color: '#00ffff',
        }).setInteractive();

        choiceText.on('pointerdown', () => {
          if (choice.action) choice.action();
          this.currentNodeId = choice.nextId;
          dialogManager.hideDialogue();
          this.displayCurrentNode();
        });
      });
    } else if (node.next) {
      // No choices, auto-continue
      this.currentNodeId = node.next;
      this.scene.input.once('pointerdown', () => {
        dialogManager.hideDialogue();
        this.displayCurrentNode();
      });
    }
  }
}
