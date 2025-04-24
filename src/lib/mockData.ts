
import { Business, SearchParams } from "./types";
import { generateMockBusinesses } from "./businessGenerator";

// Simulate API call with delay
export const searchBusinesses = async (params: SearchParams): Promise<Business[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockBusinesses(params));
    }, 800); // Simulate network delay
  });
};
