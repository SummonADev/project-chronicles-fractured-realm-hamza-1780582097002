import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateWorld } from '@/lib/worldGenerator';
import { generateNPCPopulation } from '@/lib/npcGenerator';
import { SeededRandom } from '@/lib/random';
import type { NPC } from '@/types/npc';

export default function NPCPage() {
  const navigate = useNavigate();

  const npcs = useMemo(() => {
    const world = generateWorld(42, 32, 32);
    const rng = new SeededRandom(42 + 999);
    return generateNPCPopulation(rng, world.regions, 20);
  }, []);

  const [selectedNpc, setSelectedNpc] = useState<NPC | null>(null);

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-realm-accent)' }}>NPCs</h1>
      <div className="flex gap-6 max-w-5xl">
        <div className="flex flex-col gap-2 w-72 flex-shrink-0">
          {npcs.map(npc => (
            <button
              key={npc.id}
              onClick={() => setSelectedNpc(npc)}
              className="p-3 rounded text-left transition-colors"
              style={{
                background: selectedNpc?.id === npc.id ? 'var(--color-realm-light)' : 'var(--color-realm-mid)',
                border: `1px solid ${selectedNpc?.id === npc.id ? 'var(--color-realm-accent)' : 'var(--color-realm-light)'}`,
                color: 'var(--color-realm-text)',
              }}
            >
              <p className="font-semibold">{npc.name}</p>
              <p className="text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>{npc.profession} • Age {npc.age}</p>
            </button>
          ))}
        </div>
        {selectedNpc ? (
          <div className="flex-1 p-6 rounded" style={{ background: 'var(--color-realm-mid)', border: '1px solid var(--color-realm-light)' }}>
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-realm-accent)' }}>{selectedNpc.name}</h2>
            <p className="mb-4" style={{ color: 'var(--color-realm-text-dim)' }}>{selectedNpc.profession} • {selectedNpc.gender} • Age {selectedNpc.age}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-realm-accent2)' }}>Personality</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedNpc.personality.map(trait => (
                    <span key={trait} className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--color-realm-light)', color: 'var(--color-realm-text)' }}>{trait}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-realm-accent2)' }}>Goals</h3>
                {selectedNpc.goals.map((goal, i) => (
                  <p key={i} className="text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>• {goal}</p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-realm-accent2)' }}>Fears</h3>
                {selectedNpc.fears.map((fear, i) => (
                  <p key={i} className="text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>• {fear}</p>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-realm-accent2)' }}>Info</h3>
                <p className="text-sm">Wealth: {selectedNpc.wealth}g</p>
                <p className="text-sm">Reputation: {selectedNpc.reputation}</p>
                <p className="text-sm">Loyalty: {selectedNpc.loyalty}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-realm-accent2)' }}>Skills</h3>
                <div className="grid grid-cols-3 gap-1">
                  {Object.entries(selectedNpc.skills).map(([skill, level]) => (
                    <div key={skill} className="flex justify-between text-sm">
                      <span>{skill}</span>
                      <span style={{ color: 'var(--color-realm-accent)' }}>{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center" style={{ color: 'var(--color-realm-text-dim)' }}>
            <p>Select an NPC to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
