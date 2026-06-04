import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateWorld } from '@/lib/worldGenerator';
import { generateNPCPopulation } from '@/lib/npcGenerator';
import { SeededRandom } from '@/lib/random';
import type { WorldState } from '@/types/world';
import type { NPC } from '@/types/npc';

export default function GamePage() {
  const navigate = useNavigate();
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [world, setWorld] = useState<WorldState | null>(null);
  const [npcs, setNpcs] = useState<NPC[]>([]);
  const [started, setStarted] = useState(false);

  const handleGenerate = () => {
    const w = generateWorld(seed);
    const rng = new SeededRandom(seed + 999);
    const population = generateNPCPopulation(rng, w.regions, 50);
    setWorld(w);
    setNpcs(population);
    setStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="absolute top-4 left-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-realm-accent)' }}>Game Setup</h1>
      {!started ? (
        <div className="flex flex-col items-center gap-4">
          <label style={{ color: 'var(--color-realm-text)' }}>
            World Seed:
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="ml-2 px-3 py-1 rounded"
              style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)', border: '1px solid var(--color-realm-light)' }}
            />
          </label>
          <button onClick={handleGenerate} className="px-6 py-3 rounded text-lg font-semibold" style={{ background: 'var(--color-realm-accent)', color: 'var(--color-realm-darker)' }}>Generate World</button>
        </div>
      ) : (
        <div className="text-center" style={{ color: 'var(--color-realm-text)' }}>
          <p className="text-xl mb-2">World Generated!</p>
          <p>Regions: {world?.regions.length}</p>
          <p>NPCs: {npcs.length}</p>
          <p>Map Size: {world?.width}x{world?.height}</p>
          <div className="flex gap-4 mt-6 justify-center">
            <button onClick={() => navigate('/world')} className="px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)', border: '1px solid var(--color-realm-light)' }}>View World Map</button>
            <button onClick={() => navigate('/npcs')} className="px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)', border: '1px solid var(--color-realm-light)' }}>View NPCs</button>
          </div>
        </div>
      )}
    </div>
  );
}
