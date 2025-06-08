import type { User } from './user';

export interface Product {
  id: number;
  name: string;
  code: string;
  user?: User; // The backend product has a user associated
  // Metrics (assuming last known values are returned)
  waterLevel?: number;
  soilHumidity?: number;
  airHumidity?: number;
  lightLevel?: number;
  airQualityValue?: number;
  airQualityText?: string; // e.g., "Добра"
  temperature?: number;
  // Add other fields from your backend Product entity
}