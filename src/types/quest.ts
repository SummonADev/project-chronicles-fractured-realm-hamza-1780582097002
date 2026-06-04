export type QuestType = 'rescue' | 'assassination' | 'diplomacy' | 'rebellion' | 'exploration' | 'trade' | 'war' | 'mystery' | 'escort' | 'theft';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  targetNpcId: string | null;
  targetRegionId: string | null;
  reward: {
    gold: number;
    reputation: number;
    items: string[];
  };
  difficulty: number;
  timeLimit: number | null;
  completed: boolean;
  failed: boolean;
  worldImpact: string;
}