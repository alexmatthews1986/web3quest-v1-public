
export default class QuestChainManager {
  private questChains: Record<string, string[]> = {
    'main_chain': ['tutorial_scroll', 'founder_scroll', 'nft_mint_scroll']
  };

  getNextQuest(currentQuestId: string): string | null {
    for (const chain of Object.values(this.questChains)) {
      const index = chain.indexOf(currentQuestId);
      if (index !== -1 && index + 1 < chain.length) return chain[index + 1];
    }
    return null;
  }
}
