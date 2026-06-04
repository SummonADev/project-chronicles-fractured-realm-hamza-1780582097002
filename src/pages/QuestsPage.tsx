import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Quest } from '@/types/quest';

const SAMPLE_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'The Missing Merchant',
    description: 'A wealthy merchant has gone missing on the road to Ashwood. Investigate his disappearance.',
    type: 'mystery',
    targetNpcId: 'npc5',
    targetRegionId: 'r2',
    reward: { gold: 200, reputation: 15, items: ['Iron Sword'] },
    difficulty: 3,
    timeLimit: 30,
    completed: false,
    failed: false,
    worldImpact: 'Trade routes to Ashwood may be disrupted.',
  },
  {
    id: 'q2',
    title: 'Dragon of Cinderpeak',
    description: 'A dragon has been terrorizing the mountain villages. Slay it or negotiate peace.',
    type: 'exploration',
    targetNpcId: null,
    targetRegionId: 'r5',
    reward: { gold: 1000, reputation: 50, items: ['Dragon Scale Armor'] },
    difficulty: 8,
    timeLimit: null,
    completed: false,
    failed: false,
    worldImpact: 'The mountain regions will be safe for trade and travel.',
  },
  {
    id: 'q3',
    title: 'Diplomatic Envoy',
    description: 'Deliver a peace treaty to the neighboring kingdom before war breaks out.',
    type: 'diplomacy',
    targetNpcId: 'npc12',
    targetRegionId: 'r8',
    reward: { gold: 500, reputation: 30, items: [] },
    difficulty: 5,
    timeLimit: 15,
    completed: false,
    failed: false,
    worldImpact: 'Preventing war will save thousands of lives.',
  },
];

export default function QuestsPage() {
  const navigate = useNavigate();
  const [quests] = useState<Quest[]>(SAMPLE_QUESTS);

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-realm-accent)' }}>Quest Journal</h1>
      <div className="flex flex-col gap-4 max-w-2xl">
        {quests.map((quest) => (
          <div key={quest.id} className="p-4 rounded" style={{ background: 'var(--color-realm-mid)', border: '1px solid var(--color-realm-light)' }}>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-realm-accent)' }}>{quest.title}</h2>
              <span className="px-2 py-1 rounded text-xs" style={{ background: 'var(--color-realm-light)', color: 'var(--color-realm-accent2)' }}>{quest.type}</span>
            </div>
            <p className="mb-2" style={{ color: 'var(--color-realm-text)' }}>{quest.description}</p>
            <div className="flex gap-4 text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>
              <span>Difficulty: {'★'.repeat(quest.difficulty)}</span>
              <span>Reward: {quest.reward.gold}g</span>
              {quest.timeLimit && <span>Time: {quest.timeLimit} days</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
