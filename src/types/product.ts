import type { User } from './user';

export interface Product {
  id: number;
  name: string;
  code: string;
  user?: User; 
  waterLevel?: number;
  soilHumidity?: number;
  airHumidity?: number;
  lightLevel?: number;
  airQualityValue?: number;
  airQualityText?: string;
  temperature?: number;
}