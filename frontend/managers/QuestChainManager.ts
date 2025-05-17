// FUTURE: Consider loading this config dynamically from Firestore or a local JSON file
// to allow runtime updates and creator-added chains in future expansions.

export default class QuestChainManager {
  // Holds named chains. Each chain is a sequential list of quest IDs.
  private questChains: Record<string, string[]> = {
    main_chain: ['tutorial_scroll', 'founder_scroll', 'nft_mint_scroll'],

    // FUTURE: Add themed or seasonal chains here
    // e.g. seasonal_chain: ['holiday_quest_1', 'holiday_quest_2']
  };

  /**
   * Returns the next quest ID in the chain after completing the current one.
   * @param currentQuestId - The quest ID just completed.
   * @returns Next quest ID in chain, or null if none exists.
   */
  getNextQuest(currentQuestId: string): string | null {
    for (const chain of Object.values(this.questChains)) {
      const index = chain.indexOf(currentQuestId);

      // If quest found and there's a next one in the chain
      if (index !== -1 && index + 1 < chain.length) {
        return chain[index + 1];
      }
    }

    // No matching quest chain or end of chain
    return null;
  }

  /**
   * FUTURE: Get full chain by name (optional utility).
   * Useful for debugging, analytics, or previewing chains in UI.
   */
  getChain(chainName: string): string[] | null {
    return this.questChains[chainName] || null;
  }

  /**
   * FUTURE: Dynamically inject quest chains at runtime (e.g. for creator quests or user-generated zones).
   * This allows external systems to register chains during play.
   */
  addQuestChain(chainName: string, questList: string[]): void {
    this.questChains[chainName] = questList;
  }
}
