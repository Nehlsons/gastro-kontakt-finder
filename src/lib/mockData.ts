
import { Business, SearchParams } from "./types";

// Get a random element from an array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate mock business data
const generateMockBusinesses = (params: SearchParams): Business[] => {
  const { location, types, limit = 20 } = params;
  
  const restaurants = [
    "Restaurant Zum Goldenen Löwen",
    "Gasthaus Zur Linde",
    "Brauhaus Schmidt",
    "Trattoria Milano",
    "Osteria Venezia",
    "China Restaurant Peking",
    "Curry Palast",
    "Steakhaus El Paso",
    "Brasserie La Provence",
    "Wirtshaus Alte Mühle"
  ];
  
  const hotels = [
    "Hotel Königshof",
    "Parkhotel Residence",
    "City Hotel Central",
    "Hotel Zum Kurfürst",
    "Landhotel Sonnenhof",
    "Seehotel Schwan",
    "Stadthotel Europa",
    "Grand Hotel Imperial",
    "Hotel am Waldrand",
    "Boutique Hotel Villa Flora"
  ];
  
  const streets = [
    "Hauptstraße",
    "Bahnhofstraße",
    "Marktplatz",
    "Kirchstraße",
    "Bergstraße",
    "Schillerstraße",
    "Goetheweg",
    "Am Stadtpark",
    "Industriestraße",
    "Rheinallee"
  ];
  
  const owners = [
    "Michael Schmidt",
    "Thomas Müller",
    "Andreas Weber",
    "Sabine Schneider",
    "Claudia Becker",
    "Hans-Peter Fischer",
    "Maria Klein",
    "Stefan Wagner",
    "Christine Hoffmann",
    "Jürgen Meyer"
  ];
  
  const domains = [
    "restaurant-loewe.de",
    "gasthaus-linde.de",
    "hotel-koenigshof.de",
    "parkhotel-residence.de",
    "brasserie-provence.de",
    "china-restaurant-peking.de",
    "stadthotel-europa.de",
    "villa-flora.de",
    "zum-kurfuerst.de",
    "brauhaus-schmidt.de"
  ];

  // Generate postal code for the given location
  const postalCode = location.length === 5 && !isNaN(Number(location)) 
    ? location 
    : (Math.floor(Math.random() * 89999) + 10000).toString();
  
  // Generate random businesses
  const results: Business[] = [];
  
  // Determine how many businesses of each type to generate
  let count = Math.min(Math.floor(Math.random() * 15) + 5, limit);
  
  for (let i = 0; i < count; i++) {
    const type = types.length === 1 
      ? types[0] 
      : getRandomElement(types);
    
    const name = type === "restaurant" 
      ? getRandomElement(restaurants) + " " + location 
      : getRandomElement(hotels) + " " + location;
    
    const streetNumber = Math.floor(Math.random() * 100) + 1;
    const street = getRandomElement(streets);
    const address = `${street} ${streetNumber}, ${postalCode} ${location}`;
    
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
    
    // Generate email variations
    const generatedEmails = [
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      `${firstName.toLowerCase()[0]}.${lastName.toLowerCase()}@${domain}`,
      `info@${domain}`,
      `kontakt@${domain}`,
      type === "hotel" ? `buchung@${domain}` : `gastro@${domain}`,
      `mail@${domain}`
    ];
    
    const primaryEmail = getRandomElement(generatedEmails);
    
    results.push({
      id: `business-${i}`,
      name,
      type,
      address,
      owner: Math.random() > 0.3 ? owner : undefined,
      email: Math.random() > 0.5 ? primaryEmail : undefined,
      website: Math.random() > 0.2 ? `https://www.${domain}` : undefined,
      generatedEmails,
      source: Math.random() > 0.7 ? "Website" : "OSM",
      lastUpdated: new Date().toISOString().split("T")[0]
    });
  }
  
  return results;
};

// Simulate API call with delay
export const searchBusinesses = async (params: SearchParams): Promise<Business[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockBusinesses(params));
    }, 800); // Simulate network delay
  });
};
