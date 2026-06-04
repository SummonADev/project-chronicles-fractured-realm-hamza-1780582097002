export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: number;
  researched: boolean;
  prerequisites: string[];
  category: string;
}
