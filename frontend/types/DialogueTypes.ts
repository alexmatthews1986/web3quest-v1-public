export interface DialogueNode {
  id: string;
  text: string;
  speaker?: string;
  speakerPortrait?: string; // FUTURE
  style?: 'npc' | 'system' | 'quest'; // FUTURE
  typingSpeed?: number; // FUTURE
  choices?: DialogueChoice[];
  next?: string;
}

export interface DialogueChoice {
  text: string;
  nextId: string;
  action?: () => void;
}
