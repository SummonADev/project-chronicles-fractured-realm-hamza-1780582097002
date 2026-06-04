import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'New Game', path: '/game' },
    { label: 'World Map', path: '/world' },
    { label: 'Kingdom', path: '/kingdom' },
    { label: 'Character', path: '/character' },
    { label: 'Quests', path: '/quests' },
    { label: 'Economy', path: '/economy' },
    { label: 'History', path: '/history' },
    { label: 'Combat', path: '/combat' },
    { label: 'Tech Tree', path: '/tech' },
    { label: 'NPCs', path: '/npcs' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" style={{ background: 'var(--color-realm-darker)' }}>
      <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-realm-accent)' }}>
        Chronicles of the Fractured Realm
      </h1>
      <p className="mb-8" style={{ color: 'var(--color-realm-text-dim)' }}>A procedurally generated fantasy world</p>
      <div className="flex flex-col gap-3 w-64">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="px-6 py-3 rounded text-lg font-semibold transition-colors cursor-pointer"
            style={{
              background: 'var(--color-realm-mid)',
              color: 'var(--color-realm-text)',
              border: '1px solid var(--color-realm-light)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = 'var(--color-realm-light)';
              (e.target as HTMLButtonElement).style.borderColor = 'var(--color-realm-accent)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'var(--color-realm-mid)';
              (e.target as HTMLButtonElement).style.borderColor = 'var(--color-realm-light)';
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
