import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CombatState, CombatUnit } from '@/types/combat';

function createUnit(id: string, name: string, isPlayer: boolean, x: number, y: number): CombatUnit {
  return {
    id,
    name,
    health: 100,
    maxHealth: 100,
    attack: Math.floor(Math.random() * 15) + 10,
    defense: Math.floor(Math.random() * 10) + 5,
    speed: Math.floor(Math.random() * 10) + 5,
    morale: 80,
    statusEffects: [],
    isPlayer,
    position: { x, y },
  };
}

export default function CombatPage() {
  const navigate = useNavigate();
  const [combat, setCombat] = useState<CombatState>({
    active: true,
    turn: 1,
    playerUnits: [
      createUnit('p1', 'Knight', true, 1, 2),
      createUnit('p2', 'Archer', true, 1, 4),
      createUnit('p3', 'Mage', true, 1, 6),
    ],
    enemyUnits: [
      createUnit('e1', 'Goblin Warrior', false, 8, 2),
      createUnit('e2', 'Goblin Archer', false, 8, 4),
      createUnit('e3', 'Goblin Shaman', false, 8, 6),
    ],
    log: ['Combat begins!'],
    terrain: 'plains',
    weather: 'clear',
  });

  const attack = (attacker: CombatUnit, defender: CombatUnit) => {
    const damage = Math.max(1, attacker.attack - defender.defense + Math.floor(Math.random() * 6) - 3);
    const newHealth = Math.max(0, defender.health - damage);
    const logEntry = `${attacker.name} attacks ${defender.name} for ${damage} damage!`;

    setCombat((prev) => {
      const updateUnits = (units: CombatUnit[]) =>
        units.map((u) => (u.id === defender.id ? { ...u, health: newHealth } : u)).filter((u) => u.health > 0);

      return {
        ...prev,
        turn: prev.turn + 1,
        playerUnits: updateUnits(prev.playerUnits),
        enemyUnits: updateUnits(prev.enemyUnits),
        log: [...prev.log, logEntry, ...(newHealth <= 0 ? [`${defender.name} has been defeated!`] : [])],
        active: updateUnits(prev.playerUnits).length > 0 && updateUnits(prev.enemyUnits).length > 0,
      };
    });
  };

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-realm-accent)' }}>Combat</h1>
      <p className="mb-4" style={{ color: 'var(--color-realm-text-dim)' }}>Turn {combat.turn} | Terrain: {combat.terrain} | Weather: {combat.weather}</p>
      <div className="flex gap-8 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-realm-green)' }}>Your Forces</h2>
          {combat.playerUnits.map((u) => (
            <div key={u.id} className="p-3 rounded mb-2" style={{ background: 'var(--color-realm-mid)' }}>
              <p className="font-semibold">{u.name}</p>
              <p>HP: {u.health}/{u.maxHealth} | ATK: {u.attack} | DEF: {u.defense}</p>
              {combat.active && combat.enemyUnits.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {combat.enemyUnits.map((e) => (
                    <button key={e.id} onClick={() => attack(u, e)} className="px-2 py-1 rounded text-sm" style={{ background: 'var(--color-realm-red)', color: '#fff' }}>Attack {e.name}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-realm-red)' }}>Enemies</h2>
          {combat.enemyUnits.map((u) => (
            <div key={u.id} className="p-3 rounded mb-2" style={{ background: 'var(--color-realm-mid)' }}>
              <p className="font-semibold">{u.name}</p>
              <p>HP: {u.health}/{u.maxHealth} | ATK: {u.attack} | DEF: {u.defense}</p>
            </div>
          ))}
          {combat.enemyUnits.length === 0 && <p style={{ color: 'var(--color-realm-green)' }}>All enemies defeated! Victory!</p>}
        </div>
      </div>
      {!combat.active && combat.playerUnits.length === 0 && <p className="text-xl" style={{ color: 'var(--color-realm-red)' }}>Defeat! All your units have fallen.</p>}
      <div className="p-4 rounded max-w-lg max-h-48 overflow-auto" style={{ background: 'var(--color-realm-mid)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--color-realm-accent2)' }}>Combat Log</h3>
        {combat.log.map((entry, i) => (
          <p key={i} className="text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>{entry}</p>
        ))}
      </div>
    </div>
  );
}
