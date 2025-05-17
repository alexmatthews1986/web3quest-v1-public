// FUTURE: Dialogue tree system with branches, choices, speaker logic, and progress tracking
export type DialogueNode = {
  id: string;
  speaker?: string;
  message: string;
  nextId?: string;
  choices?: { text: string; nextId: string }[];
  portraitKey?: string;
  style?: 'npc' | 'system' | 'quest';
};

export default class DialogueTreeManager {
  private tree: Record<string, DialogueNode> = {};

  loadTree(dialogueData: DialogueNode[]): void {
    dialogueData.forEach((node) => {
      this.tree[node.id] = node;
    });
  }

  getNode(id: string): DialogueNode | null {
    return this.tree[id] || null;
  }

  getNext(nodeId: string, choiceIndex?: number): string | null {
    const node = this.getNode(nodeId);
    if (!node) return null;
    if (node.choices && choiceIndex !== undefined) {
      return node.choices[choiceIndex]?.nextId || null;
    }
    return node.nextId || null;
  }
}
