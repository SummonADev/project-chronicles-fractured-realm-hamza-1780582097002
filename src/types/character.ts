export interface PlayerSkill {
  name: string;
  level: number;
  experience: number;
  maxLevel: number;
  category: 'combat' | 'magic' | 'crafting' | 'social' | 'exploration' | 'stealth' | 'knowledge';
}

export interface PlayerCharacter {
  id: string;
  name: string;
  title: string;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  stamina: number;
  maxStamina: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  constitution: number;
  skills: PlayerSkill[];
  gold: number;
  reputation: number;
  regionId: string;
  kingdomId: string | null;
  companions: string[];
  questLog: string[];
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'potion' | 'material' | 'artifact' | 'food' | 'tool';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  value: number;
  stats: Record<string, number>;
}