import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Technology } from '@/types/technology';

const SAMPLE_TECHNOLOGIES: Technology[] = [
  { id: 'agriculture_1', name: 'Basic Agriculture', description: 'Improved farming techniques increase food production.', cost: 100, researched: true, prerequisites: [], category: 'economy' },
  { id: 'agriculture_2', name: 'Advanced Agriculture', description: 'Crop rotation and irrigation dramatically boost yields.', cost: 300, researched: false, prerequisites: ['agriculture_1'], category: 'economy' },
  { id: 'military_1', name: 'Basic Military Training', description: 'Organized military drills improve soldier effectiveness.', cost: 150, researched: true, prerequisites: [], category: 'military' },
  { id: 'military_2', name: 'Advanced Tactics', description: 'Complex battlefield maneuvers and formations.', cost: 400, researched: false, prerequisites: ['military_1'], category: 'military' },
  { id: 'magic_1', name: 'Arcane Fundamentals', description: 'Basic understanding of magical forces.', cost: 200, researched: false, prerequisites: [], category: 'magic' },
  { id: 'magic_2', name: 'Elemental Mastery', description: 'Control over fire, ice, lightning and earth.', cost: 500, researched: false, prerequisites: ['magic_1'], category: 'magic' },
  { id: 'construction_1', name: 'Stoneworking', description: 'Ability to construct stone buildings and fortifications.', cost: 200, researched: false, prerequisites: [], category: 'infrastructure' },
  { id: 'construction_2', name: 'Fortifications', description: 'Advanced walls and defensive structures.', cost: 350, researched: false, prerequisites: ['construction_1', 'military_1'], category: 'infrastructure' },
  { id: 'trade_1', name: 'Trade Routes', description: 'Establish trade connections between regions.', cost: 250, researched: false, prerequisites: ['agriculture_1'], category: 'economy' },
  { id: 'diplomacy_1', name: 'Diplomacy', description: 'Formal diplomatic relations with other kingdoms.', cost: 300, researched: false, prerequisites: [], category: 'social' },
];

export default function TechTreePage() {
  const navigate = useNavigate();
  const [techs, setTechs] = useState<Technology[]>(SAMPLE_TECHNOLOGIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(techs.map(t => t.category)))];
  const filtered = selectedCategory === 'all' ? techs : techs.filter(t => t.category === selectedCategory);

  const canResearch = (tech: Technology) => {
    if (tech.researched) return false;
    return tech.prerequisites.every(preId => techs.find(t => t.id === preId)?.researched);
  };

  const research = (id: string) => {
    setTechs(prev => prev.map(t => t.id === id ? { ...t, researched: true } : t));
  };

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-realm-accent)' }}>Technology Tree</h1>
      <div className="flex gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-3 py-1 rounded text-sm capitalize"
            style={{
              background: selectedCategory === cat ? 'var(--color-realm-accent)' : 'var(--color-realm-mid)',
              color: selectedCategory === cat ? 'var(--color-realm-darker)' : 'var(--color-realm-text)',
              border: '1px solid var(--color-realm-light)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {filtered.map(tech => (
          <div
            key={tech.id}
            className="p-4 rounded"
            style={{
              background: tech.researched ? 'var(--color-realm-light)' : 'var(--color-realm-mid)',
              border: `1px solid ${tech.researched ? 'var(--color-realm-green)' : canResearch(tech) ? 'var(--color-realm-accent)' : 'var(--color-realm-light)'}`,
              opacity: !tech.researched && !canResearch(tech) ? 0.6 : 1,
            }}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold" style={{ color: tech.researched ? 'var(--color-realm-green)' : 'var(--color-realm-accent)' }}>{tech.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded capitalize" style={{ background: 'var(--color-realm-darker)', color: 'var(--color-realm-accent2)' }}>{tech.category}</span>
            </div>
            <p className="text-sm mb-2" style={{ color: 'var(--color-realm-text-dim)' }}>{tech.description}</p>
            <p className="text-xs mb-2" style={{ color: 'var(--color-realm-text-dim)' }}>Cost: {tech.cost} | Prerequisites: {tech.prerequisites.length > 0 ? tech.prerequisites.join(', ') : 'None'}</p>
            {tech.researched ? (
              <span className="text-sm" style={{ color: 'var(--color-realm-green)' }}>✓ Researched</span>
            ) : canResearch(tech) ? (
              <button
                onClick={() => research(tech.id)}
                className="px-3 py-1 rounded text-sm"
                style={{ background: 'var(--color-realm-accent)', color: 'var(--color-realm-darker)' }}
              >
                Research
              </button>
            ) : (
              <span className="text-sm" style={{ color: 'var(--color-realm-text-dim)' }}>🔒 Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
