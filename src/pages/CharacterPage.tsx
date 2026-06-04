import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PlayerCharacter } from '@/types/character';

const SAMPLE_CHARACTER: PlayerCharacter = {
  id: 'player1',
  name: 'Aldric Stormwind',
  title: 'Wandering Knight',
  level: 5,
  experience: 2400,
  health: 85,
  maxHealth: 100,
  mana: 40,
  maxMana: 60,
  stamina: 70,
  maxStamina: 80,
  strength: 14,
  dexterity: 12,
  intelligence: 10,
  wisdom: 11,
  charisma: 13,
  constitution: 15,
  skills: [
    { name: 'Swordsmanship', level: 8, experience: 340, maxLevel: 20, category: 'combat' },
    { name: 'Diplomacy', level: 5, experience: 120, maxLevel: 20, category: 'social' },
    { name: 'Herbalism', level: 3, experience: 60, maxLevel: 20, category: 'crafting' },
  ],
  gold: 350,
  reputation: 45,
  regionId: 'r1',
  kingdomId: 'k1',
  companions: [],
  questLog: [],
  inventory: [],
};

export default function CharacterPage() {
  const navigate = useNavigate();
  const [char] = useState<PlayerCharacter>(SAMPLE_CHARACTER);

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-realm-accent)' }}>{char.name}</h1>
      <p className="mb-6" style={{ color: 'var(--color-realm-text-dim)' }}>{char.title} — Level {char.level}</p>
      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        <div className="p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Stats</h2>
          <p>Health: {char.health}/{char.maxHealth}</p>
          <p>Mana: {char.mana}/{char.maxMana}</p>
          <p>Stamina: {char.stamina}/{char.maxStamina}</p>
          <p>Gold: {char.gold}</p>
          <p>Reputation: {char.reputation}</p>
        </div>
        <div className="p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Attributes</h2>
          <p>STR: {char.strength}</p>
          <p>DEX: {char.dexterity}</p>
          <p>INT: {char.intelligence}</p>
          <p>WIS: {char.wisdom}</p>
          <p>CHA: {char.charisma}</p>
          <p>CON: {char.constitution}</p>
        </div>
        <div className="p-4 rounded col-span-2" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Skills</h2>
          {char.skills.map((skill) => (
            <div key={skill.name} className="flex justify-between mb-1">
              <span>{skill.name} ({skill.category})</span>
              <span>Lv.{skill.level}/{skill.maxLevel}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
