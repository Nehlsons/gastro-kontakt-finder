
// Map of German cities to their postal code ranges
export const cityPostalCodeMap: Record<string, string[]> = {
  "Berlin": ["10", "12", "13", "14"],
  "Hamburg": ["20", "21", "22"],
  "München": ["80", "81", "82"],
  "Köln": ["50", "51"],
  "Frankfurt": ["60", "61"],
  "Dresden": ["01"],
  "Leipzig": ["04"],
  "Rostock": ["18"],
  "Stuttgart": ["70"],
  "Düsseldorf": ["40"]
};

export const getCityFromPostalCode = (postCode: string): string => {
  const prefix = postCode.substring(0, 2);
  
  for (const [city, prefixes] of Object.entries(cityPostalCodeMap)) {
    if (prefixes.some(p => prefix.startsWith(p))) {
      return city;
    }
  }
  
  return "Berlin"; // Default fallback
};

export const getPostalCodePrefixForCity = (cityName: string): string => {
  const normalizedCityName = cityName
    .toLowerCase()
    .replace("ü", "ue")
    .replace("ö", "oe")
    .replace("ä", "ae");
    
  for (const [city, prefixes] of Object.entries(cityPostalCodeMap)) {
    const normalizedCity = city
      .toLowerCase()
      .replace("ü", "ue")
      .replace("ö", "oe")
      .replace("ä", "ae");
      
    if (normalizedCity === normalizedCityName) {
      return getRandomElement(prefixes);
    }
  }
  
  return "10"; // Default to Berlin if no match
};

// Helper function
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
