
export type BusinessType = "restaurant" | "hotel";

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  address: string;
  owner?: string;
  email?: string;
  website?: string;
  generatedEmails: string[];
  source: string;
  lastUpdated: string;
}

export interface SearchParams {
  location: string;
  types: BusinessType[];
  limit?: number;
}
