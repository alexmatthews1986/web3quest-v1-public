export interface DialogueNode {
  id: string;
  text: string;
  speaker?: string;
  speakerPortrait?: string;
  style?: 'npc' | 'system' | 'quest';
  typingSpeed?: number;
  choices?: DialogueChoice[];
  next?: string;
}

export interface DialogueChoice {
  text: string;
  nextId: string;
  action?: () => void;
}
