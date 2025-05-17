import { DialogueNode } from '../../types/DialogManager';

export const sampleDialogue: Record<string, DialogueNode> = {
  'intro': {
    id: 'intro',
    speaker: 'Mentor',
    text: 'Welcome, explorer. Ready to choose your path?',
    choices: [
      { text: 'Begin Quest', nextId: 'start_quest', action: () => console.log('Quest Accepted') },
      { text: 'Maybe later', nextId: 'goodbye' }
    ]
  },
  'start_quest': {
    id: 'start_quest',
    text: 'A wise choice. The Scroll awaits.',
    next: 'end'
  },
  'goodbye': {
    id: 'goodbye',
    text: 'Come back when you feel ready.',
    next: 'end'
  },
  'end': {
    id: 'end',
    text: 'Farewell for now.'
  }
};
