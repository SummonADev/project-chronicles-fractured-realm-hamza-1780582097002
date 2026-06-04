export type TerrainType = 'mountain' | 'river' | 'ocean' | 'forest' | 'swamp' | 'desert' | 'volcano' | 'cave' | 'plains' | 'tundra';

export type Climate = 'tropical' | 'arid' | 'temperate' | 'continental' | 'polar';

export type ResourceType = 'wood' | 'stone' | 'iron' | 'gold' | 'food' | 'mana' | 'artifact';

export interface WorldTile {
  x: number;
  y: number;
  terrain: TerrainType;
  elevation: number;
  moisture: number;
  temperature: number;
  regionId: string;
}

export interface Region {
  id: string;
  name: string;
  climate: Climate;
  resources: Record<ResourceType, number>;
  population: number;
  culture: string;
  religion: string;
  politicalAlignment: string;
  kingdomId: string | null;
  tiles: Array<{ x: number; y: number }>;
}

export interface WorldState {
  width: number;
  height: number;
  tiles: WorldTile[][];
  regions: Region[];
  seed: number;
}