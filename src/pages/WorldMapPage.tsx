import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateWorld } from '@/lib/worldGenerator';
import type { TerrainType } from '@/types/world';

const TERRAIN_COLORS: Record<TerrainType, string> = {
  ocean: '#1a3a5c',
  plains: '#7caa2d',
  forest: '#2d6e2d',
  mountain: '#8c8c8c',
  desert: '#d4b655',
  swamp: '#4a6e4a',
  river: '#3a7abf',
  volcano: '#c44040',
  cave: '#4a3a2a',
  tundra: '#b0c4d4',
};

export default function WorldMapPage() {
  const navigate = useNavigate();
  const [seed] = useState(42);
  const world = useMemo(() => generateWorld(seed, 48, 48), [seed]);

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="absolute top-4 left-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-realm-accent)' }}>World Map</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${world.width}, 8px)`, gap: '0px' }}>
        {world.tiles.flat().map((tile) => (
          <div
            key={`${tile.x}-${tile.y}`}
            style={{
              width: 8,
              height: 8,
              backgroundColor: TERRAIN_COLORS[tile.terrain] || '#333',
            }}
            title={`${tile.terrain} (${tile.x},${tile.y})`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        {Object.entries(TERRAIN_COLORS).map(([terrain, color]) => (
          <div key={terrain} className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>
            <div style={{ width: 12, height: 12, backgroundColor: color, borderRadius: 2 }} />
            {terrain}
          </div>
        ))}
      </div>
    </div>
  );
}
