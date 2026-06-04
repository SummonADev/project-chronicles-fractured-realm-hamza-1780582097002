import { v4 as uuidv4 } from 'uuid';
import { SeededRandom } from './random';
import { generateName } from './nameGenerator';
import type { NPC, PersonalityTrait, Profession } from '@/types/npc';
import type { Region } from '@/types/world';

const ALL_TRAITS: PersonalityTrait[] = ['brave', 'cowardly', 'greedy', 'generous', 'cunning', 'honest', 'cruel', 'kind', 'ambitious', 'content', 'loyal', 'treacherous', 'wise', 'foolish', 'charismatic', 'shy'];
const ALL_PROFESSIONS: Profession[] = ['farmer', 'blacksmith', 'merchant', 'soldier', 'mage', 'priest', 'noble', 'thief', 'healer', 'scholar', 'hunter', 'miner', 'fisher', 'artisan', 'baker', 'guard', 'spy', 'diplomat', 'sailor', 'alchemist'];
const ALL_FEARS = ['death', 'darkness', 'dragons', 'poverty', 'betrayal', 'magic', 'plague', 'war', 'loneliness', 'fire'];
const ALL_GOALS = ['gain wealth', 'find love', 'gain power', 'protect family', 'achieve fame', 'explore world', 'master a craft', 'serve the gods', 'avenge fallen kin', 'build an empire'];
const ALL_SKILLS = ['swordsmanship', 'archery', 'magic', 'alchemy', 'smithing', 'cooking', 'diplomacy', 'stealth', 'herbalism', 'mining', 'fishing', 'farming', 'leadership', 'tactics', 'healing', 'enchanting', 'navigation', 'tracking', 'lockpicking', 'persuasion'];

export function generateNPC(rng: SeededRandom, region: Region): NPC {
  const gender = rng.chance(0.5) ? 'male' : 'female' as const;
  const traitCount = rng.nextInt(2, 4);
  const traits: PersonalityTrait[] = [];
  const shuffledTraits = rng.shuffle(ALL_TRAITS);
  for (let i = 0; i < traitCount; i++) traits.push(shuffledTraits[i]);

  const skills: Record<string, number> = {};
  const skillCount = rng.nextInt(3, 8);
  const shuffledSkills = rng.shuffle(ALL_SKILLS);
  for (let i = 0; i < skillCount; i++) {
    skills[shuffledSkills[i]] = rng.nextInt(1, 80);
  }

  const fearCount = rng.nextInt(1, 3);
  const shuffledFears = rng.shuffle(ALL_FEARS);
  const fears: string[] = [];
  for (let i = 0; i < fearCount; i++) fears.push(shuffledFears[i]);

  const goalCount = rng.nextInt(1, 3);
  const shuffledGoals = rng.shuffle(ALL_GOALS);
  const goals: string[] = [];
  for (let i = 0; i < goalCount; i++) goals.push(shuffledGoals[i]);

  return {
    id: uuidv4(),
    name: generateName(rng, gender),
    age: rng.nextInt(16, 75),
    gender,
    alive: true,
    personality: traits,
    goals,
    relationships: [],
    skills,
    profession: rng.pick(ALL_PROFESSIONS),
    wealth: rng.nextInt(0, 5000),
    reputation: rng.nextInt(-50, 100),
    fears,
    loyalty: rng.nextInt(10, 100),
    regionId: region.id,
    kingdomId: region.kingdomId,
    factionId: null,
    memories: [],
  };
}

export function generateNPCPopulation(rng: SeededRandom, regions: Region[], count: number): NPC[] {
  const npcs: NPC[] = [];
  const landRegions = regions.filter(r => r.tiles.length > 0);
  if (landRegions.length === 0) return npcs;
  for (let i = 0; i < count; i++) {
    const region = rng.pick(landRegions);
    npcs.push(generateNPC(rng, region));
  }
  return npcs;
}