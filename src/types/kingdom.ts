import type { ResourceType } from './world';

export interface Army {
  id: string;
  name: string;
  size: number;
  morale: number;
  experience: number;
  regionId: string;
}

export interface Kingdom {
  id: string;
  name: string;
  rulerId: string;
  regions: string[];
  treasury: number;
  resources: Record<ResourceType, number>;
  taxRate: number;
  armies: Army[];
  technologies: string[];
  allies: string[];
  enemies: string[];
  stability: number;
  population: number;
  culture: string;
  religion: string;
  isPlayerKingdom: boolean;
}