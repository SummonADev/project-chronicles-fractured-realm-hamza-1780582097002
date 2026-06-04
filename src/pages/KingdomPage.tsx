import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Kingdom } from '@/types/kingdom';

const SAMPLE_KINGDOM: Kingdom = {
  id: 'k1',
  name: 'The Grand Empire',
  rulerId: 'npc1',
  regions: ['r1', 'r2', 'r3'],
  treasury: 15000,
  resources: { wood: 500, stone: 300, iron: 150, gold: 80, food: 1000, mana: 50, artifact: 2 },
  taxRate: 0.15,
  armies: [{ id: 'a1', name: 'Royal Guard', size: 500, morale: 85, experience: 60, regionId: 'r1' }],
  technologies: ['agriculture_1', 'military_1'],
  allies: [],
  enemies: [],
  stability: 72,
  population: 25000,
  culture: 'Imperial',
  religion: 'Order of Light',
  isPlayerKingdom: true,
};

export default function KingdomPage() {
  const navigate = useNavigate();
  const [kingdom] = useState<Kingdom>(SAMPLE_KINGDOM);

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-realm-accent)' }}>{kingdom.name}</h1>
      <div className="grid grid-cols-2 gap-6 max-w-2xl">
        <div className="p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Overview</h2>
          <p>Population: {kingdom.population.toLocaleString()}</p>
          <p>Stability: {kingdom.stability}%</p>
          <p>Treasury: {kingdom.treasury} gold</p>
          <p>Tax Rate: {(kingdom.taxRate * 100).toFixed(0)}%</p>
        </div>
        <div className="p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Resources</h2>
          {Object.entries(kingdom.resources).map(([key, val]) => (
            <p key={key}>{key}: {val}</p>
          ))}
        </div>
        <div className="p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Culture</h2>
          <p>Culture: {kingdom.culture}</p>
          <p>Religion: {kingdom.religion}</p>
          <p>Regions: {kingdom.regions.length}</p>
        </div>
        <div className="p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Military</h2>
          {kingdom.armies.map((army) => (
            <div key={army.id}>
              <p>{army.name}: {army.size} troops</p>
              <p>Morale: {army.morale}% | XP: {army.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
