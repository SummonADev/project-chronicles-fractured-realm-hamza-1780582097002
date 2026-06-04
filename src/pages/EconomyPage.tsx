import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EconomyState } from '@/types/economy';

const SAMPLE_ECONOMY: EconomyState = {
  markets: [
    { resource: 'wood', basePrice: 10, currentPrice: 12, supply: 500, demand: 600, trend: 'rising' },
    { resource: 'stone', basePrice: 15, currentPrice: 14, supply: 400, demand: 350, trend: 'falling' },
    { resource: 'iron', basePrice: 25, currentPrice: 28, supply: 200, demand: 280, trend: 'rising' },
    { resource: 'gold', basePrice: 100, currentPrice: 98, supply: 50, demand: 45, trend: 'stable' },
    { resource: 'food', basePrice: 5, currentPrice: 6, supply: 1000, demand: 1200, trend: 'rising' },
    { resource: 'mana', basePrice: 50, currentPrice: 55, supply: 80, demand: 100, trend: 'rising' },
    { resource: 'artifact', basePrice: 500, currentPrice: 480, supply: 5, demand: 3, trend: 'falling' },
  ],
  tradeRoutes: [
    { id: 'tr1', fromRegion: 'Ashwood', toRegion: 'Ironhold', resource: 'wood', volume: 50, profit: 100, active: true },
    { id: 'tr2', fromRegion: 'Ironhold', toRegion: 'Ashwood', resource: 'iron', volume: 20, profit: 80, active: true },
  ],
  businesses: [],
  inflation: 1.05,
  globalWealth: 500000,
};

export default function EconomyPage() {
  const navigate = useNavigate();
  const [economy] = useState<EconomyState>(SAMPLE_ECONOMY);

  const trendIcon = (trend: string) => trend === 'rising' ? '📈' : trend === 'falling' ? '📉' : '➡️';

  return (
    <div className="flex flex-col w-full h-full p-8 overflow-auto" style={{ background: 'var(--color-realm-darker)' }}>
      <button onClick={() => navigate('/')} className="self-start mb-4 px-4 py-2 rounded" style={{ background: 'var(--color-realm-mid)', color: 'var(--color-realm-text)' }}>← Back</button>
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-realm-accent)' }}>Economy</h1>
      <div className="max-w-3xl">
        <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-realm-accent2)' }}>Market Prices</h2>
        <div className="grid grid-cols-4 gap-2 mb-6 p-4 rounded" style={{ background: 'var(--color-realm-mid)' }}>
          <div className="font-semibold">Resource</div>
          <div className="font-semibold">Price</div>
          <div className="font-semibold">Supply/Demand</div>
          <div className="font-semibold">Trend</div>
          {economy.markets.map((m) => (
            <React.Fragment key={m.resource}>
              <div style={{ textTransform: 'capitalize' }}>{m.resource}</div>
              <div>{m.currentPrice}g</div>
              <div>{m.supply}/{m.demand}</div>
              <div>{trendIcon(m.trend)} {m.trend}</div>
            </React.Fragment>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-realm-accent2)' }}>Trade Routes</h2>
        <div className="flex flex-col gap-2">
          {economy.tradeRoutes.map((tr) => (
            <div key={tr.id} className="p-3 rounded flex justify-between" style={{ background: 'var(--color-realm-mid)' }}>
              <span>{tr.fromRegion} → {tr.toRegion} ({tr.resource})</span>
              <span>Vol: {tr.volume} | Profit: {tr.profit}g</span>
            </div>
          ))}
        </div>
        <p className="mt-4" style={{ color: 'var(--color-realm-text-dim)' }}>Inflation: {((economy.inflation - 1) * 100).toFixed(1)}% | Global Wealth: {economy.globalWealth.toLocaleString()}g</p>
      </div>
    </div>
  );
}
