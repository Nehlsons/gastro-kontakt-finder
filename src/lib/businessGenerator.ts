
import { Business, SearchParams } from "./types";
import { restaurants, hotels, streets, owners, domains } from "./mockDataConstants";
import { getCityFromPostalCode, getPostalCodePrefixForCity } from "./postalCodes";

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateMockBusinesses = (params: SearchParams): Business[] => {
  const { location, types, limit = 20 } = params;
  
  // Determine postal code and city
  let postalCode: string;
  let city: string;
  
  if (location.length === 5 && !isNaN(Number(location))) {
    // Input is a postal code
    postalCode = location;
    city = getCityFromPostalCode(postalCode);
  } else {
    // Input is a city name
    city = location;
    const postalCodePrefix = getPostalCodePrefixForCity(city);
    
    // Generate remaining digits for the postal code
    let generatedPostalCode = postalCodePrefix;
    const remainingDigits = 5 - postalCodePrefix.length;
    
    for (let i = 0; i < remainingDigits; i++) {
      generatedPostalCode += Math.floor(Math.random() * 10);
    }
    
    postalCode = generatedPostalCode;
  }
  
  // Generate businesses
  const results: Business[] = [];
  const count = Math.min(Math.floor(Math.random() * 15) + 5, limit);
  
  for (let i = 0; i < count; i++) {
    const type = types.length === 1 ? types[0] : getRandomElement(types);
    const name = type === "restaurant" ? getRandomElement(restaurants) : getRandomElement(hotels);
    
    const streetNumber = Math.floor(Math.random() * 100) + 1;
    const street = getRandomElement(streets);
    const address = `${street} ${streetNumber}, ${postalCode} ${city}`;
    
    const domain = i < domains.length 
      ? domains[i] 
      : `${name.toLowerCase().replace(/\s+/g, "-")}.de`.replace(/[äöüß]/g, match => 
          match === 'ä' ? 'ae' : 
          match === 'ö' ? 'oe' : 
          match === 'ü' ? 'ue' : 
          match === 'ß' ? 'ss' : match
        );

    const owner = getRandomElement(owners);
    const ownerParts = owner.split(" ");
    const firstName = ownerParts[0];
    const lastName = ownerParts[ownerParts.length - 1];
    
    const generatedEmails = [
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      `${firstName.toLowerCase()[0]}.${lastName.toLowerCase()}@${domain}`,
      `info@${domain}`,
      `kontakt@${domain}`,
      type === "hotel" ? `buchung@${domain}` : `gastro@${domain}`,
      `mail@${domain}`
    ];
    
    results.push({
      id: `business-${i}`,
      name,
      type,
      address,
      owner: Math.random() > 0.3 ? owner : undefined,
      email: Math.random() > 0.5 ? getRandomElement(generatedEmails) : undefined,
      website: Math.random() > 0.2 ? `https://www.${domain}` : undefined,
      generatedEmails,
      source: Math.random() > 0.7 ? "Website" : "OSM",
      lastUpdated: new Date().toISOString().split("T")[0]
    });
  }
  
  return results;
};
