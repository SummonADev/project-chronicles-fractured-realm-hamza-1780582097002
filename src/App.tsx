import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainMenu from '@/pages/MainMenu';
import GamePage from '@/pages/GamePage';
import WorldMapPage from '@/pages/WorldMapPage';
import KingdomPage from '@/pages/KingdomPage';
import CharacterPage from '@/pages/CharacterPage';
import QuestsPage from '@/pages/QuestsPage';
import EconomyPage from '@/pages/EconomyPage';
import HistoryPage from '@/pages/HistoryPage';
import CombatPage from '@/pages/CombatPage';
import TechTreePage from '@/pages/TechTreePage';
import NPCPage from '@/pages/NPCPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/world" element={<WorldMapPage />} />
      <Route path="/kingdom" element={<KingdomPage />} />
      <Route path="/character" element={<CharacterPage />} />
      <Route path="/quests" element={<QuestsPage />} />
      <Route path="/economy" element={<EconomyPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/combat" element={<CombatPage />} />
      <Route path="/tech" element={<TechTreePage />} />
      <Route path="/npcs" element={<NPCPage />} />
    </Routes>
  );
}