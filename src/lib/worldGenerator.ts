import { createNoise2D } from 'simplex-noise';
import { v4 as uuidv4 } from 'uuid';
import { SeededRandom } from './random';
import { generateRegionName } from './nameGenerator';
import type { WorldState, WorldTile, Region, TerrainType, Climate, ResourceType } from '@/types/world';

function alea(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function terrainFromValues(elevation: number, moisture: number): TerrainType {
  if (elevation < 0.2) return 'ocean';
  if (elevation < 0.25) {
    if (moisture > 0.6) return 'swamp';
    return 'plains';
  }
  if (elevation > 0.8) {
    if (moisture < 0.2) return 'volcano';
    return 'mountain';
  }
  if (elevation > 0.65) return 'mountain';
  if (moisture > 0.7) return 'forest';
  if (moisture < 0.2) return 'desert';
  if (moisture > 0.5 && elevation < 0.35) return 'river';
  return 'plains';
}

function climateFromTemp(temp: number): Climate {
  if (temp > 0.8) return 'tropical';
  if (temp > 0.6) return 'arid';
  if (temp > 0.4) return 'temperate';
  if (temp > 0.2) return 'continental';
  return 'polar';
}

export function generateWorld(seed: number, width = 64, height = 64): WorldState {
  const rng = new SeededRandom(seed);
  const prng = alea(seed);
  const elevationNoise = createNoise2D(prng);
  const prng2 = alea(seed + 1);
  const moistureNoise = createNoise2D(prng2);
  const prng3 = alea(seed + 2);
  const tempNoise = createNoise2D(prng3);

  const tiles: WorldTile[][] = [];

  for (let y = 0; y < height; y++) {
    const row: WorldTile[] = [];
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const ny = y / height;
      const elevation = (elevationNoise(nx * 4, ny * 4) + 1) / 2;
      const moisture = (moistureNoise(nx * 3, ny * 3) + 1) / 2;
      const temperature = (tempNoise(nx * 2, ny * 2) + 1) / 2;
      const terrain = terrainFromValues(elevation, moisture);

      row.push({
        x,
        y,
        terrain,
        elevation,
        moisture,
        temperature,
        regionId: '',
      });
    }
    tiles.push(row);
  }

  const regionCount = rng.nextInt(12, 24);
  const regions: Region[] = [];
  const cultures = ['Imperial', 'Nordic', 'Desert', 'Elven', 'Dwarven', 'Orcish', 'Nomadic', 'Maritime', 'Sylvan', 'Arcane'];
  const religions = ['Order of Light', 'Shadow Cult', 'Nature Spirits', 'Ancestor Worship', 'The Old Gods', 'Fire Temple', 'Moon Faith', 'Star Seekers'];
  const alignments = ['lawful', 'neutral', 'chaotic', 'democratic', 'theocratic', 'monarchic'];

  const centers: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < regionCount; i++) {
    let cx: number, cy: number;
    let attempts = 0;
    do {
      cx = rng.nextInt(2, width - 3);
      cy = rng.nextInt(2, height - 3);
      attempts++;
    } while (tiles[cy][cx].terrain === 'ocean' && attempts < 50);
    centers.push({ x: cx, y: cy });
  }

  for (let i = 0; i < regionCount; i++) {
    const id = uuidv4();
    const resources: Record<ResourceType, number> = {
      wood: rng.nextInt(10, 100),
      stone: rng.nextInt(10, 100),
      iron: rng.nextInt(5, 60),
      gold: rng.nextInt(0, 30),
      food: rng.nextInt(20, 120),
      mana: rng.nextInt(0, 50),
      artifact: rng.nextInt(0, 5),
    };

    const avgTemp = tiles[centers[i].y][centers[i].x].temperature;

    regions.push({
      id,
      name: generateRegionName(rng),
      climate: climateFromTemp(avgTemp),
      resources,
      population: rng.nextInt(500, 10000),
      culture: rng.pick(cultures),
      religion: rng.pick(religions),
      politicalAlignment: rng.pick(alignments),
      kingdomId: null,
      tiles: [],
    });
  }

  // Assign tiles to nearest region center
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (tiles[y][x].terrain === 'ocean') continue;
      let minDist = Infinity;
      let closestIdx = 0;
      for (let i = 0; i < centers.length; i++) {
        const dist = Math.sqrt(Math.pow(x - centers[i].x, 2) + Math.pow(y - centers[i].y, 2));
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      }
      tiles[y][x].regionId = regions[closestIdx].id;
      regions[closestIdx].tiles.push({ x, y });
    }
  }

  return { width, height, tiles, regions, seed };
}