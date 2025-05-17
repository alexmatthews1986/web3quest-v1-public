export type DialogueNode = {
  id: string;
  message: string;
  speaker?: string;
  portraitKey?: string;
  nextId?: string;
  style?: 'npc' | 'system' | 'quest';
  choices?: {
    text: string;
    nextId: string;
  }[];
};
