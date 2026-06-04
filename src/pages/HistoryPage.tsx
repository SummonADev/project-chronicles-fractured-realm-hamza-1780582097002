import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { HistoryEvent } from '@/types/history';

const SAMPLE_EVENTS: HistoryEvent[] = [
  { id: 'h1', year: 1, type: 'founding', title: 'The Founding', description: 'The Grand Empire was founded by King Aldric the Great, uniting the fractured lands under one banner.', involvedKingdoms: ['k1'], involvedNpcs: ['npc1'], impact: 'A new era of unity began.' },
  { id: 'h2', year: 45, type: 'war', title: 'The War of Shadows', description: 'The Shadow Cult launched a massive assault on the northern provinces, leading to three years of brutal warfare.', involvedKingdoms: ['k1', 'k2'], involvedNpcs: ['npc2', 'npc3'], impact: 'The northern regions were devastated but ultimately held.' },
  { id: 'h3', year: 102, type: 'discovery', title: 'Discovery of Mana Wells', description: 'Ancient mana wells were discovered beneath the Cinderpeak mountains, revolutionizing magical research.', involvedKingdoms: ['k1'], involvedNpcs: ['npc7'], impact: 'Magic became more accessible to common people.' },
  { id: 'h4', year: 156, type: 'plague', title: 'The Crimson Plague', description: 'A devastating plague swept across the continent, killing nearly a third of the population.', involvedKingdoms: ['k1', 'k2', 'k3'], involvedNpcs: [], impact: 'Population decline led to economic upheaval.' },
  { id: 'h5', year: 203, type: 'dragon_attack', title: 'The Dragon\'s Wrath', description: 'An ancient dragon awakened and laid waste to the eastern provinces before being driven back.', involvedKingdoms: ['k1'], involvedNpcs: ['npc10'], impact: 'The eastern regions still bear the scars of dragonfire.' },
];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [events] = useState<HistoryEvent[]>(SAMPLE_EVENTS);

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-realm-accent)' }}>World History</h1>
      <div className="max-w-2xl">
        {events.map((event, idx) => (
          <div key={event.id} className="flex gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-realm-accent)' }} />
              {idx < events.length - 1 && <div className="w-0.5 flex-1" style={{ background: 'var(--color-realm-light)' }} />}
            </div>
            <div className="p-4 rounded flex-1" style={{ background: 'var(--color-realm-mid)' }}>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-realm-accent)' }}>{event.title}</h2>
                <span style={{ color: 'var(--color-realm-text-dim)' }}>Year {event.year}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded mb-2 inline-block" style={{ background: 'var(--color-realm-light)', color: 'var(--color-realm-accent2)' }}>{event.type}</span>
              <p className="mt-1" style={{ color: 'var(--color-realm-text)' }}>{event.description}</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>Impact: {event.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
