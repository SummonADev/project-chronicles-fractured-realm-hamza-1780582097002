import type { ResourceType } from './world';

export interface MarketPrice {
  resource: ResourceType;
  basePrice: number;
  currentPrice: number;
  supply: number;
  demand: number;
  trend: 'rising' | 'falling' | 'stable';
}

export interface TradeRoute {
  id: string;
  fromRegion: string;
  toRegion: string;
  resource: ResourceType;
  volume: number;
  profit: number;
  active: boolean;
}

export interface Business {
  id: string;
  name: string;
  type: 'shop' | 'factory' | 'guild' | 'bank' | 'tavern' | 'forge';
  ownerId: string;
  regionId: string;
  revenue: number;
  expenses: number;
  employees: number;
}

export interface EconomyState {
  markets: MarketPrice[];
  tradeRoutes: TradeRoute[];
  businesses: Business[];
  inflation: number;
  globalWealth: number;
}