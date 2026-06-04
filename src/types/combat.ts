export type DamageType = 'physical' | 'fire' | 'ice' | 'lightning' | 'poison' | 'holy' | 'dark';

export interface CombatUnit {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  morale: number;
  statusEffects: StatusEffect[];
  isPlayer: boolean;
  position: { x: number; y: number };
}

export interface StatusEffect {
  name: string;
  duration: number;
  damagePerTurn: number;
  statModifiers: Record<string, number>;
}

export interface CombatState {
  active: boolean;
  turn: number;
  playerUnits: CombatUnit[];
  enemyUnits: CombatUnit[];
  log: string[];
  terrain: 'plains' | 'forest' | 'mountain' | 'swamp' | 'desert';
  weather: 'clear' | 'rain' | 'snow' | 'fog' | 'storm';
}