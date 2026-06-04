export type HistoryEventType = 'war' | 'alliance' | 'collapse' | 'trade' | 'hero' | 'assassination' | 'crisis' | 'plague' | 'discovery' | 'founding' | 'rebellion' | 'marriage' | 'dragon_attack' | 'meteor' | 'religious_revolution';

export interface HistoryEvent {
  id: string;
  year: number;
  type: HistoryEventType;
  title: string;
  description: string;
  involvedKingdoms: string[];
  involvedNpcs: string[];
  impact: string;
}