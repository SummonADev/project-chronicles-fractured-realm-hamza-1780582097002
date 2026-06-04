export type PersonalityTrait = 'brave' | 'cowardly' | 'greedy' | 'generous' | 'cunning' | 'honest' | 'cruel' | 'kind' | 'ambitious' | 'content' | 'loyal' | 'treacherous' | 'wise' | 'foolish' | 'charismatic' | 'shy';

export type Profession = 'farmer' | 'blacksmith' | 'merchant' | 'soldier' | 'mage' | 'priest' | 'noble' | 'thief' | 'healer' | 'scholar' | 'hunter' | 'miner' | 'fisher' | 'artisan' | 'baker' | 'guard' | 'spy' | 'diplomat' | 'sailor' | 'alchemist';

export interface NPCRelationship {
  targetId: string;
  type: 'friend' | 'enemy' | 'spouse' | 'parent' | 'child' | 'ally' | 'rival' | 'lover';
  strength: number;
}

export interface NPC {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  alive: boolean;
  personality: PersonalityTrait[];
  goals: string[];
  relationships: NPCRelationship[];
  skills: Record<string, number>;
  profession: Profession;
  wealth: number;
  reputation: number;
  fears: string[];
  loyalty: number;
  regionId: string;
  kingdomId: string | null;
  factionId: string | null;
  memories: string[];
}