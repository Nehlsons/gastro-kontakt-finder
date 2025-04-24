import { Business, SearchParams } from "./types";

// Get a random element from an array
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

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

// Map of German cities to their postal code ranges
const cityPostalCodeMap: Record<string, string[]> = {
  "Berlin": [
    "10115", "10117", "10119", "10178", "10179", "10243", "10245", "10247", "10249",
    "10405", "10407", "10409", "10435", "10437", "10439", "10551", "10553", "10555",
    "10557", "10559", "10585", "10587", "10589", "10623", "10625", "10627", "10629",
    "10707", "10709", "10711", "10713", "10715", "10717", "10719", "10777", "10779",
    "10781", "10783", "10785", "10787", "10789", "10823", "10825", "10827", "10829",
    "10961", "10963", "10965", "10967", "10969", "10997", "10999", "12043", "12045",
    "12047", "12049", "12051", "12053", "12055", "12057", "12059", "12099", "12101",
    "12103", "12105", "12107", "12109", "12157", "12159", "12161", "12163", "12165",
    "12167", "12169", "12203", "12205", "12207", "12209", "12247", "12249", "12277",
    "12279", "12305", "12307", "12309", "12347", "12349", "12351", "12353", "12355",
    "12357", "12359", "12435", "12437", "12439", "12459", "12487", "12489", "12524",
    "12526", "12527", "12529", "12555", "12557", "12559", "12587", "12589", "12619",
    "12621", "12623", "12627", "12629", "12679", "12681", "12683", "12685", "12687",
    "12689", "13051", "13053", "13055", "13057", "13059", "13086", "13088", "13089",
    "13125", "13127", "13129", "13156", "13158", "13159", "13187", "13189", "13347",
    "13349", "13351", "13353", "13355", "13357", "13359", "13403", "13405", "13407",
    "13409", "13435", "13437", "13439", "13465", "13467", "13469", "13503", "13505",
    "13507", "13509", "13581", "13583", "13585", "13587", "13589", "13591", "13593",
    "13595", "13597", "13599", "14050", "14052", "14053", "14055", "14057", "14059",
    "14089", "14109", "14129", "14163", "14165", "14167", "14169", "14193", "14195",
    "14197", "14199"
  ],
  "Hamburg": [
    "20095", "20097", "20099", "20144", "20146", "20148", "20149", "20249", "20251",
    "20253", "20255", "20257", "20259", "20354", "20355", "20357", "20359", "20457",
    "20459", "20535", "20537", "20539", "22041", "22043", "22045", "22047", "22049",
    "22081", "22083", "22085", "22087", "22089", "22111", "22113", "22115", "22117",
    "22119", "22143", "22145", "22147", "22149", "22159", "22175", "22177", "22179",
    "22297", "22299", "22301", "22303", "22305", "22307", "22309", "22335", "22337",
    "22339", "22359", "22391", "22393", "22395", "22397", "22399", "22415", "22417",
    "22419", "22453", "22455", "22457", "22459", "22523", "22525", "22527", "22529",
    "22547", "22549", "22559", "22587", "22589", "22605", "22607", "22609", "22761",
    "22763", "22765", "22767", "22769"
  ],
  "München": [
    "80331", "80333", "80335", "80336", "80337", "80339", "80469", "80538", "80539",
    "80634", "80636", "80637", "80638", "80639", "80686", "80687", "80688", "80689",
    "80796", "80797", "80798", "80799", "80801", "80802", "80803", "80804", "80805",
    "80807", "80809", "80933", "80935", "80937", "80939", "80992", "80993", "80995",
    "80997", "80999", "81241", "81243", "81245", "81247", "81249", "81369", "81371",
    "81373", "81375", "81377", "81379", "81475", "81476", "81477", "81479", "81539",
    "81541", "81543", "81545", "81547", "81549", "81667", "81669", "81671", "81673",
    "81675", "81677", "81679", "81735", "81737", "81739", "81825", "81827", "81829",
    "81925", "81927", "81929"
  ],
  "Frankfurt": [
    "60306", "60308", "60310", "60311", "60312", "60313", "60314", "60316", "60318",
    "60320", "60322", "60323", "60325", "60326", "60327", "60329", "60385", "60386",
    "60388", "60389", "60431", "60433", "60435", "60437", "60438", "60439", "60486",
    "60487", "60488", "60489", "60528", "60529", "60547", "60549", "60594", "60596",
    "60598", "60599"
  ],
  "Köln": [
    "50667", "50668", "50670", "50672", "50674", "50676", "50677", "50678", "50679",
    "50733", "50735", "50737", "50739", "50765", "50767", "50769", "50823", "50825",
    "50827", "50829", "50858", "50859", "50931", "50933", "50935", "50937", "50939",
    "50968", "50969", "50996", "50997", "50999", "51061", "51063", "51065", "51067",
    "51069", "51103", "51105", "51107", "51109", "51143", "51145", "51147", "51149"
  ]
};

// Function to get city from postal code
const getCityFromPostalCode = (postCode: string): string => {
  for (const [city, codes] of Object.entries(cityPostalCodeMap)) {
    if (codes.includes(postCode)) {
      return city;
    }
  }
  return "Berlin"; // Default fallback
};

// Function to get a valid postal code for a city
const getPostalCodeForCity = (cityName: string): string => {
  const normalizedCityName = cityName
    .toLowerCase()
    .replace("ü", "ue")
    .replace("ö", "oe")
    .replace("ä", "ae");
    
  for (const [city, codes] of Object.entries(cityPostalCodeMap)) {
    const normalizedCity = city
      .toLowerCase()
      .replace("ü", "ue")
      .replace("ö", "oe")
      .replace("ä", "ae");
      
    if (normalizedCity === normalizedCityName) {
      return getRandomElement(codes);
    }
  }
  
  return "10115"; // Default to a Berlin postal code if no match
};

// Generate mock business data
const generateMockBusinesses = (params: SearchParams): Business[] => {
  const { location, types, limit = 20 } = params;
  
  // Generate postal code for the given location
  let postalCode;
  let city;
  
  // Determine if input is a postal code or city name
  if (location.length === 5 && !isNaN(Number(location))) {
    // Input is a postal code
    postalCode = location;
    city = getCityFromPostalCode(postalCode);
  } else {
    // Input is a city name
    city = location;
    postalCode = getPostalCodeForCity(city);
  }
  
  // Generate random businesses
  const results: Business[] = [];
  
  // Determine how many businesses of each type to generate
  let count = Math.min(Math.floor(Math.random() * 15) + 5, limit);
  
  for (let i = 0; i < count; i++) {
    const type = types.length === 1 
      ? types[0] 
      : getRandomElement(types);
    
    // Don't append the location to the name anymore
    const name = type === "restaurant" 
      ? getRandomElement(restaurants)
      : getRandomElement(hotels);
    
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
