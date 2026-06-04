export type TechCategory = 'agriculture' | 'military' | 'magic' | 'engineering' | 'alchemy' | 'naval' | 'governance' | 'commerce' | 'espionage' | 'culture';

export interface Technology {
  id: string;
  name: string;
  description: string;
  category: TechCategory;
  tier: number;
  cost: number;
  prerequisites: string[];
  effects: string[];
  researched: boolean;
}