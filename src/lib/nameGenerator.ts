import { SeededRandom } from './random';

const PREFIXES = ['Al', 'Bel', 'Cor', 'Dar', 'El', 'Fen', 'Gor', 'Hal', 'Ir', 'Jar', 'Kal', 'Lor', 'Mor', 'Nor', 'Or', 'Per', 'Quel', 'Ren', 'Sar', 'Tor', 'Ul', 'Val', 'War', 'Xen', 'Yar', 'Zel'];
const MIDDLES = ['', 'an', 'en', 'in', 'on', 'ar', 'er', 'ir', 'or', 'al', 'el', 'il', 'ol', 'ath', 'eth', 'ith', 'oth'];
const SUFFIXES_M = ['ric', 'dan', 'wen', 'thor', 'grim', 'vald', 'bert', 'mund', 'gar', 'fred', 'helm', 'ward', 'win', 'stan', 'rod'];
const SUFFIXES_F = ['ra', 'na', 'la', 'tha', 'wen', 'lyn', 'dra', 'ria', 'sia', 'dia', 'mia', 'via', 'ael', 'iel', 'ael'];

const KINGDOM_ADJ = ['Grand', 'High', 'Iron', 'Golden', 'Silver', 'Shadow', 'Storm', 'Fire', 'Frost', 'Ancient', 'Holy', 'Dark', 'Free', 'Crimson', 'Azure'];
const KINGDOM_NOUN = ['Kingdom', 'Empire', 'Dominion', 'Republic', 'Realm', 'Confederacy', 'Theocracy', 'Duchy', 'Principality', 'League'];
const REGION_NAMES = ['Ashwood', 'Brighthollow', 'Cinderpeak', 'Duskmeadow', 'Embervale', 'Frostmere', 'Gloomfen', 'Havenshire', 'Ironhold', 'Jadecrest', 'Kingsreach', 'Lakewell', 'Moonridge', 'Northwatch', 'Oakenheart', 'Pineford', 'Queensgrace', 'Ravenholm', 'Silverdale', 'Thornwick', 'Umbervale', 'Verdantis', 'Windmere', 'Xenith', 'Yellowstone', 'Zephyrdale'];

export function generateName(rng: SeededRandom, gender: 'male' | 'female'): string {
  const prefix = rng.pick(PREFIXES);
  const middle = rng.pick(MIDDLES);
  const suffix = gender === 'male' ? rng.pick(SUFFIXES_M) : rng.pick(SUFFIXES_F);
  return prefix + middle + suffix;
}

export function generateKingdomName(rng: SeededRandom): string {
  return `The ${rng.pick(KINGDOM_ADJ)} ${rng.pick(KINGDOM_NOUN)}`;
}

export function generateRegionName(rng: SeededRandom): string {
  return rng.pick(REGION_NAMES) + (rng.chance(0.3) ? ' ' + rng.pick(['North', 'South', 'East', 'West', 'Upper', 'Lower']) : '');
}