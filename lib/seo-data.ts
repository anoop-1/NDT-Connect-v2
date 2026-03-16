// ============================================================
// NDT Connect - Comprehensive SEO Data
// Powers city pages, service pages, industry pages, certifications
// ============================================================

// ---- CITY DATA ----
export interface CityData {
  slug: string;
  name: string;
  country: string;
  region: string;
  description: string;
  industries: string[];
  keyFacilities: string[];
  coordinates: { lat: number; lng: number };
}

export const cities: CityData[] = [
  // USA
  { slug: 'houston', name: 'Houston', country: 'United States', region: 'Texas', description: 'Houston is the energy capital of the world, home to the largest concentration of refineries, petrochemical plants, and pipeline networks in the US. NDT services are critical for the 600+ chemical plants and refineries in the Houston Ship Channel area.', industries: ['Oil & Gas', 'Petrochemical', 'Aerospace', 'Power Generation'], keyFacilities: ['Houston Ship Channel', 'Texas Medical Center', 'NASA Johnson Space Center', 'Port of Houston'], coordinates: { lat: 29.7604, lng: -95.3698 } },
  { slug: 'los-angeles', name: 'Los Angeles', country: 'United States', region: 'California', description: 'Los Angeles supports a massive aerospace and defense industry requiring stringent NDT inspections. The region is also home to major port infrastructure and power generation facilities.', industries: ['Aerospace', 'Manufacturing', 'Power Generation', 'Marine'], keyFacilities: ['Port of Los Angeles', 'Edwards AFB', 'El Segundo Refinery', 'LAX Infrastructure'], coordinates: { lat: 34.0522, lng: -118.2437 } },
  { slug: 'new-orleans', name: 'New Orleans', country: 'United States', region: 'Louisiana', description: 'New Orleans serves as a major hub for offshore oil and gas operations in the Gulf of Mexico. NDT services are essential for platform inspections, subsea pipeline monitoring, and refinery maintenance along the Mississippi River corridor.', industries: ['Oil & Gas', 'Marine & Offshore', 'Petrochemical', 'Power Generation'], keyFacilities: ['Port of New Orleans', 'Gulf of Mexico Platforms', 'Mississippi River Corridor Refineries'], coordinates: { lat: 29.9511, lng: -90.0715 } },
  { slug: 'denver', name: 'Denver', country: 'United States', region: 'Colorado', description: 'Denver is a key hub for pipeline operations and mining inspection services in the Rocky Mountain region. NDT services support extensive pipeline networks and mineral extraction operations.', industries: ['Oil & Gas', 'Mining', 'Pipeline', 'Construction'], keyFacilities: ['Denver-Julesburg Basin', 'Rocky Mountain Pipeline Network', 'Colorado Mining Operations'], coordinates: { lat: 39.7392, lng: -104.9903 } },
  { slug: 'chicago', name: 'Chicago', country: 'United States', region: 'Illinois', description: 'Chicago is a major industrial hub with significant manufacturing, infrastructure, and transportation assets requiring NDT inspection services. The city is home to extensive rail, bridge, and structural inspection needs.', industries: ['Manufacturing', 'Construction', 'Transportation', 'Power Generation'], keyFacilities: ['Chicago Industrial Corridor', 'Great Lakes Infrastructure', 'O\'Hare Airport', 'Rail Networks'], coordinates: { lat: 41.8781, lng: -87.6298 } },
  { slug: 'seattle', name: 'Seattle', country: 'United States', region: 'Washington', description: 'Seattle is home to Boeing and a thriving aerospace industry demanding the highest standards of NDT inspection. Marine and port infrastructure also drives significant demand.', industries: ['Aerospace', 'Marine', 'Manufacturing', 'Construction'], keyFacilities: ['Boeing Facilities', 'Port of Seattle', 'Puget Sound Naval Shipyard'], coordinates: { lat: 47.6062, lng: -122.3321 } },
  { slug: 'dallas', name: 'Dallas', country: 'United States', region: 'Texas', description: 'Dallas-Fort Worth is a major aerospace and defense hub with Lockheed Martin, Bell Helicopter, and numerous manufacturing facilities requiring NDT services.', industries: ['Aerospace', 'Manufacturing', 'Oil & Gas', 'Construction'], keyFacilities: ['Lockheed Martin Facilities', 'Bell Helicopter', 'DFW Infrastructure', 'Texas Instruments'], coordinates: { lat: 32.7767, lng: -96.7970 } },
  { slug: 'phoenix', name: 'Phoenix', country: 'United States', region: 'Arizona', description: 'Phoenix supports semiconductor manufacturing, aerospace, and solar energy industries that require precision NDT inspection services.', industries: ['Aerospace', 'Manufacturing', 'Power Generation', 'Construction'], keyFacilities: ['Luke AFB', 'Intel Fab Plants', 'Palo Verde Nuclear Station', 'Solar Farms'], coordinates: { lat: 33.4484, lng: -112.0740 } },
  { slug: 'philadelphia', name: 'Philadelphia', country: 'United States', region: 'Pennsylvania', description: 'Philadelphia\'s industrial heritage includes refineries, shipbuilding, and pharmaceutical manufacturing, all requiring comprehensive NDT services.', industries: ['Petrochemical', 'Manufacturing', 'Marine', 'Pharmaceutical'], keyFacilities: ['Philadelphia Energy Solutions', 'Philadelphia Naval Shipyard', 'Port of Philadelphia'], coordinates: { lat: 39.9526, lng: -75.1652 } },
  { slug: 'san-francisco', name: 'San Francisco', country: 'United States', region: 'California', description: 'The Bay Area requires extensive NDT for bridge infrastructure, seismic retrofitting, and technology manufacturing.', industries: ['Construction', 'Manufacturing', 'Power Generation', 'Marine'], keyFacilities: ['Golden Gate Bridge', 'Bay Bridge', 'Port of Oakland', 'Chevron Richmond Refinery'], coordinates: { lat: 37.7749, lng: -122.4194 } },
  { slug: 'detroit', name: 'Detroit', country: 'United States', region: 'Michigan', description: 'Detroit\'s automotive manufacturing industry relies heavily on NDT for quality assurance in vehicle components, castings, and welded assemblies.', industries: ['Automotive', 'Manufacturing', 'Power Generation', 'Construction'], keyFacilities: ['GM Renaissance Center', 'Ford Rouge Complex', 'FCA Assembly Plants', 'Fermi Nuclear Plant'], coordinates: { lat: 42.3314, lng: -83.0458 } },
  { slug: 'pittsburgh', name: 'Pittsburgh', country: 'United States', region: 'Pennsylvania', description: 'Pittsburgh\'s steel heritage and modern manufacturing base requires extensive NDT for structural integrity assessment and materials testing.', industries: ['Manufacturing', 'Construction', 'Oil & Gas', 'Power Generation'], keyFacilities: ['US Steel Facilities', 'Pittsburgh Industrial Corridor', 'Allegheny Power Plants'], coordinates: { lat: 40.4406, lng: -79.9959 } },
  { slug: 'baton-rouge', name: 'Baton Rouge', country: 'United States', region: 'Louisiana', description: 'Baton Rouge hosts one of the largest refinery complexes in the US, with ExxonMobil\'s refinery being the second-largest in the nation.', industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Manufacturing'], keyFacilities: ['ExxonMobil Baton Rouge Refinery', 'DOW Chemical', 'Port of Baton Rouge'], coordinates: { lat: 30.4515, lng: -91.1871 } },
  { slug: 'corpus-christi', name: 'Corpus Christi', country: 'United States', region: 'Texas', description: 'Corpus Christi is a key crude oil export terminal and refining center on the Texas Gulf Coast.', industries: ['Oil & Gas', 'Marine', 'Petrochemical', 'Pipeline'], keyFacilities: ['Port of Corpus Christi', 'Flint Hills Refinery', 'Cheniere LNG Terminal'], coordinates: { lat: 27.8006, lng: -97.3964 } },
  { slug: 'tulsa', name: 'Tulsa', country: 'United States', region: 'Oklahoma', description: 'Tulsa has long been known as the "Oil Capital of the World" and remains a major hub for pipeline operations and petroleum engineering.', industries: ['Oil & Gas', 'Pipeline', 'Manufacturing', 'Aerospace'], keyFacilities: ['Cushing Oil Hub', 'American Airlines Maintenance Base', 'Williams Pipeline HQ'], coordinates: { lat: 36.1540, lng: -95.9928 } },
  { slug: 'beaumont', name: 'Beaumont', country: 'United States', region: 'Texas', description: 'Beaumont is part of the Golden Triangle refining corridor, home to major refineries and petrochemical complexes.', industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Pipeline'], keyFacilities: ['ExxonMobil Beaumont Refinery', 'TOTAL Port Arthur Refinery', 'Spindletop'], coordinates: { lat: 30.0802, lng: -94.1266 } },
  { slug: 'new-york', name: 'New York', country: 'United States', region: 'New York', description: 'New York City has massive infrastructure inspection needs including bridges, tunnels, high-rise buildings, and port facilities.', industries: ['Construction', 'Infrastructure', 'Manufacturing', 'Marine'], keyFacilities: ['George Washington Bridge', 'Lincoln Tunnel', 'JFK Airport', 'Port of New York'], coordinates: { lat: 40.7128, lng: -74.0060 } },
  { slug: 'boston', name: 'Boston', country: 'United States', region: 'Massachusetts', description: 'Boston supports aerospace, biotech manufacturing, and historic infrastructure requiring specialized NDT services.', industries: ['Aerospace', 'Manufacturing', 'Construction', 'Marine'], keyFacilities: ['GE Aviation', 'Raytheon Facilities', 'MIT Research Labs', 'Port of Boston'], coordinates: { lat: 42.3601, lng: -71.0589 } },
  { slug: 'atlanta', name: 'Atlanta', country: 'United States', region: 'Georgia', description: 'Atlanta is a major logistics and manufacturing hub in the Southeast US with growing NDT service demands.', industries: ['Manufacturing', 'Construction', 'Aerospace', 'Power Generation'], keyFacilities: ['Hartsfield-Jackson Airport', 'Lockheed Martin Marietta', 'Georgia Power Plants'], coordinates: { lat: 33.7490, lng: -84.3880 } },
  { slug: 'miami', name: 'Miami', country: 'United States', region: 'Florida', description: 'Miami serves as a gateway to Latin America with significant port, marine, and construction NDT demands.', industries: ['Marine', 'Construction', 'Power Generation', 'Aerospace'], keyFacilities: ['Port of Miami', 'Turkey Point Nuclear Plant', 'Miami International Airport'], coordinates: { lat: 25.7617, lng: -80.1918 } },
  // Middle East
  { slug: 'dubai', name: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', description: 'Dubai is a global hub for oil and gas operations, construction megaprojects, and industrial manufacturing. The emirate\'s rapid development and world-class infrastructure demand extensive NDT services.', industries: ['Oil & Gas', 'Construction', 'Aerospace', 'Manufacturing'], keyFacilities: ['Jebel Ali Free Zone', 'Dubai Dry Docks', 'ENOC Refinery', 'Dubai International Airport'], coordinates: { lat: 25.2048, lng: 55.2708 } },
  { slug: 'abu-dhabi', name: 'Abu Dhabi', country: 'United Arab Emirates', region: 'Middle East', description: 'Abu Dhabi hosts ADNOC, one of the world\'s largest oil companies, along with extensive refining, petrochemical, and LNG infrastructure.', industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Construction'], keyFacilities: ['ADNOC Refinery', 'Ruwais Industrial Complex', 'Taweelah Power & Desalination', 'Barakah Nuclear Plant'], coordinates: { lat: 24.4539, lng: 54.3773 } },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', country: 'Saudi Arabia', region: 'Middle East', description: 'Saudi Arabia is the world\'s largest oil producer with Saudi Aramco operating the world\'s largest oil processing facility. The Kingdom\'s Vision 2030 is driving massive industrial expansion.', industries: ['Oil & Gas', 'Petrochemical', 'Mining', 'Construction'], keyFacilities: ['Saudi Aramco Facilities', 'SABIC Plants', 'Ras Tanura Refinery', 'Ghawar Field Infrastructure'], coordinates: { lat: 23.8859, lng: 45.0792 } },
  { slug: 'qatar', name: 'Qatar', country: 'Qatar', region: 'Middle East', description: 'Qatar is the world\'s largest LNG exporter, with massive gas processing and liquefaction facilities requiring continuous NDT monitoring.', industries: ['Oil & Gas', 'LNG', 'Petrochemical', 'Construction'], keyFacilities: ['Ras Laffan Industrial City', 'Pearl GTL', 'Qatargas Facilities', 'Mesaieed Industrial City'], coordinates: { lat: 25.3548, lng: 51.1839 } },
  { slug: 'kuwait', name: 'Kuwait', country: 'Kuwait', region: 'Middle East', description: 'Kuwait\'s oil industry is one of the largest globally, with extensive refining and petrochemical operations.', industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Construction'], keyFacilities: ['Kuwait Oil Company Facilities', 'Mina Al-Ahmadi Refinery', 'Al-Zour Refinery'], coordinates: { lat: 29.3759, lng: 47.9774 } },
  { slug: 'bahrain', name: 'Bahrain', country: 'Bahrain', region: 'Middle East', description: 'Bahrain hosts the region\'s oldest refinery and a growing aluminum smelting industry requiring NDT services.', industries: ['Oil & Gas', 'Manufacturing', 'Aluminum', 'Construction'], keyFacilities: ['BAPCO Refinery', 'Alba Aluminum Smelter', 'Bahrain Petroleum Company'], coordinates: { lat: 26.0667, lng: 50.5577 } },
  { slug: 'oman', name: 'Oman', country: 'Oman', region: 'Middle East', description: 'Oman has significant oil and gas production along with a growing industrial sector in Sohar and Duqm.', industries: ['Oil & Gas', 'Petrochemical', 'Mining', 'Marine'], keyFacilities: ['Sohar Industrial Port', 'Duqm Refinery', 'PDO Oil Fields', 'Oman LNG'], coordinates: { lat: 21.4735, lng: 55.9754 } },
  { slug: 'jubail', name: 'Jubail', country: 'Saudi Arabia', region: 'Middle East', description: 'Jubail Industrial City is the largest industrial city in the world, housing petrochemical, fertilizer, and steel manufacturing plants.', industries: ['Petrochemical', 'Manufacturing', 'Power Generation', 'Marine'], keyFacilities: ['SABIC Jubail Complex', 'Saudi Aramco Jubail Refinery', 'Royal Commission Industrial Zone'], coordinates: { lat: 27.0046, lng: 49.6223 } },
  { slug: 'yanbu', name: 'Yanbu', country: 'Saudi Arabia', region: 'Middle East', description: 'Yanbu is a major industrial port city on the Red Sea coast with extensive refining and petrochemical operations.', industries: ['Oil & Gas', 'Petrochemical', 'Manufacturing', 'Marine'], keyFacilities: ['Saudi Aramco Yanbu Refinery', 'Yanbu Industrial City', 'SAMREF Refinery'], coordinates: { lat: 24.0895, lng: 38.0618 } },
  { slug: 'dammam', name: 'Dammam', country: 'Saudi Arabia', region: 'Middle East', description: 'Dammam is the gateway to Saudi Arabia\'s Eastern Province oil fields and a major industrial and logistics hub.', industries: ['Oil & Gas', 'Manufacturing', 'Construction', 'Marine'], keyFacilities: ['King Fahd Industrial Port', 'Dammam Industrial City', 'Eastern Province Oil Fields'], coordinates: { lat: 26.3927, lng: 49.9777 } },
  // India
  { slug: 'mumbai', name: 'Mumbai', country: 'India', region: 'Maharashtra', description: 'Mumbai is India\'s financial and industrial capital with significant offshore oil production, refining, and manufacturing sectors demanding NDT services.', industries: ['Oil & Gas', 'Manufacturing', 'Marine', 'Construction'], keyFacilities: ['Mumbai High Offshore', 'BPCL Refinery', 'Nhava Sheva Port', 'Mazagon Dock Shipbuilders'], coordinates: { lat: 19.0760, lng: 72.8777 } },
  { slug: 'hyderabad', name: 'Hyderabad', country: 'India', region: 'Telangana', description: 'Hyderabad is emerging as a major aerospace and defense manufacturing hub with HAL and DRDO facilities.', industries: ['Aerospace', 'Manufacturing', 'Pharmaceutical', 'Power Generation'], keyFacilities: ['HAL Aircraft Division', 'DRDO Labs', 'NTPC Ramagundam', 'Pharmaceutical SEZs'], coordinates: { lat: 17.3850, lng: 78.4867 } },
  { slug: 'bangalore', name: 'Bangalore', country: 'India', region: 'Karnataka', description: 'Bangalore is India\'s aerospace capital, home to HAL headquarters, ISRO, and numerous defense manufacturing facilities.', industries: ['Aerospace', 'Manufacturing', 'Power Generation', 'Construction'], keyFacilities: ['HAL Headquarters', 'ISRO', 'BEML', 'Bangalore Aerospace Park'], coordinates: { lat: 12.9716, lng: 77.5946 } },
  { slug: 'chennai', name: 'Chennai', country: 'India', region: 'Tamil Nadu', description: 'Chennai is the "Detroit of India" with major automotive manufacturing, petrochemical, and port infrastructure.', industries: ['Automotive', 'Manufacturing', 'Petrochemical', 'Marine'], keyFacilities: ['Chennai Petroleum Refinery', 'Ford/Hyundai Plants', 'Ennore Port', 'Kattupalli Shipyard'], coordinates: { lat: 13.0827, lng: 80.2707 } },
  { slug: 'delhi', name: 'Delhi', country: 'India', region: 'NCR', description: 'Delhi NCR is a major manufacturing and infrastructure hub with power plants, metro rail, and industrial corridors.', industries: ['Manufacturing', 'Construction', 'Power Generation', 'Infrastructure'], keyFacilities: ['Delhi Metro', 'NTPC Power Plants', 'Maruti Suzuki Plants', 'Airport Expansion'], coordinates: { lat: 28.7041, lng: 77.1025 } },
  { slug: 'kolkata', name: 'Kolkata', country: 'India', region: 'West Bengal', description: 'Kolkata supports steel manufacturing, shipbuilding, and heavy engineering industries requiring NDT.', industries: ['Manufacturing', 'Marine', 'Power Generation', 'Mining'], keyFacilities: ['Garden Reach Shipbuilders', 'Haldia Refinery', 'Durgapur Steel Plant', 'Kolkata Port'], coordinates: { lat: 22.5726, lng: 88.3639 } },
  { slug: 'pune', name: 'Pune', country: 'India', region: 'Maharashtra', description: 'Pune is a major automotive and manufacturing hub with defense establishments and engineering industries.', industries: ['Automotive', 'Manufacturing', 'Aerospace', 'Power Generation'], keyFacilities: ['Tata Motors', 'Bajaj Auto', 'Bharat Forge', 'Defense Establishments'], coordinates: { lat: 18.5204, lng: 73.8567 } },
  { slug: 'ahmedabad', name: 'Ahmedabad', country: 'India', region: 'Gujarat', description: 'Ahmedabad is near India\'s largest refinery complex at Jamnagar and supports extensive petrochemical operations.', industries: ['Oil & Gas', 'Petrochemical', 'Manufacturing', 'Power Generation'], keyFacilities: ['IOCL Gujarat Refinery', 'Adani Mundra Port', 'GSFC Plants', 'Torrent Power'], coordinates: { lat: 23.0225, lng: 72.5714 } },
  { slug: 'kochi', name: 'Kochi', country: 'India', region: 'Kerala', description: 'Kochi hosts a major refinery, shipyard, and port facilities requiring continuous NDT inspection services.', industries: ['Oil & Gas', 'Marine', 'Manufacturing', 'Construction'], keyFacilities: ['BPCL Kochi Refinery', 'Cochin Shipyard', 'Kochi Port', 'LNG Terminal'], coordinates: { lat: 9.9312, lng: 76.2673 } },
  { slug: 'vizag', name: 'Visakhapatnam', country: 'India', region: 'Andhra Pradesh', description: 'Vizag is a major port city with steel manufacturing, shipbuilding, and oil refining industries.', industries: ['Manufacturing', 'Marine', 'Oil & Gas', 'Power Generation'], keyFacilities: ['Vizag Steel Plant', 'Hindustan Shipyard', 'HPCL Refinery', 'Vizag Port'], coordinates: { lat: 17.6868, lng: 83.2185 } },
  { slug: 'jamnagar', name: 'Jamnagar', country: 'India', region: 'Gujarat', description: 'Jamnagar hosts the world\'s largest oil refinery complex operated by Reliance Industries, making it a critical NDT services market.', industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Marine'], keyFacilities: ['Reliance Jamnagar Refinery', 'Essar Oil Refinery', 'Sikka Port'], coordinates: { lat: 22.4707, lng: 70.0577 } },
  // Asia-Pacific
  { slug: 'singapore', name: 'Singapore', country: 'Singapore', region: 'Asia-Pacific', description: 'Singapore is a global petrochemical and marine hub with one of the world\'s largest refining complexes on Jurong Island.', industries: ['Oil & Gas', 'Marine', 'Petrochemical', 'Aerospace'], keyFacilities: ['Jurong Island Petrochemical Complex', 'Keppel Shipyard', 'Singapore Refining Company', 'Changi Airport'], coordinates: { lat: 1.3521, lng: 103.8198 } },
  { slug: 'malaysia', name: 'Malaysia', country: 'Malaysia', region: 'Asia-Pacific', description: 'Malaysia has a robust oil and gas sector led by Petronas, along with significant manufacturing and palm oil processing industries.', industries: ['Oil & Gas', 'Manufacturing', 'Petrochemical', 'Marine'], keyFacilities: ['PETRONAS Facilities', 'Pengerang Integrated Complex', 'Port Klang', 'Bintulu LNG'], coordinates: { lat: 3.1390, lng: 101.6869 } },
  { slug: 'indonesia', name: 'Indonesia', country: 'Indonesia', region: 'Asia-Pacific', description: 'Indonesia is Southeast Asia\'s largest economy with extensive oil and gas production, mining, and manufacturing sectors.', industries: ['Oil & Gas', 'Mining', 'Manufacturing', 'Power Generation'], keyFacilities: ['Pertamina Refineries', 'Freeport Mining', 'Tangguh LNG', 'Cilegon Steel Complex'], coordinates: { lat: -6.2088, lng: 106.8456 } },
  { slug: 'thailand', name: 'Thailand', country: 'Thailand', region: 'Asia-Pacific', description: 'Thailand is a manufacturing hub with significant automotive, petrochemical, and power generation NDT demand.', industries: ['Manufacturing', 'Petrochemical', 'Automotive', 'Power Generation'], keyFacilities: ['Map Ta Phut Industrial Estate', 'PTT Facilities', 'Eastern Seaboard', 'Laem Chabang Port'], coordinates: { lat: 13.7563, lng: 100.5018 } },
  { slug: 'vietnam', name: 'Vietnam', country: 'Vietnam', region: 'Asia-Pacific', description: 'Vietnam\'s rapidly growing industrial sector includes oil and gas, manufacturing, and infrastructure development.', industries: ['Oil & Gas', 'Manufacturing', 'Construction', 'Power Generation'], keyFacilities: ['Nghi Son Refinery', 'Dung Quat Refinery', 'PetroVietnam Facilities', 'Industrial Zones'], coordinates: { lat: 21.0278, lng: 105.8342 } },
  { slug: 'philippines', name: 'Philippines', country: 'Philippines', region: 'Asia-Pacific', description: 'The Philippines requires NDT services for shipbuilding, power generation, mining, and infrastructure projects.', industries: ['Marine', 'Power Generation', 'Mining', 'Manufacturing'], keyFacilities: ['Subic Bay Shipyard', 'Batangas Refinery', 'Philippine Mining Operations', 'Manila Port'], coordinates: { lat: 14.5995, lng: 120.9842 } },
  // Europe
  { slug: 'london', name: 'London', country: 'United Kingdom', region: 'Europe', description: 'London and the wider UK demand NDT services for aerospace, nuclear, railway infrastructure, and North Sea oil and gas support.', industries: ['Aerospace', 'Nuclear', 'Construction', 'Rail'], keyFacilities: ['Rolls-Royce Facilities', 'Hinkley Point', 'Crossrail', 'Thames Tideway'], coordinates: { lat: 51.5074, lng: -0.1278 } },
  { slug: 'aberdeen', name: 'Aberdeen', country: 'United Kingdom', region: 'Scotland', description: 'Aberdeen is the oil capital of Europe, serving as the primary support base for North Sea offshore operations.', industries: ['Oil & Gas', 'Marine & Offshore', 'Subsea', 'Pipeline'], keyFacilities: ['North Sea Platforms', 'Aberdeen Harbour', 'Subsea 7 HQ', 'Wood Group'], coordinates: { lat: 57.1497, lng: -2.0943 } },
  { slug: 'norway', name: 'Norway', country: 'Norway', region: 'Europe', description: 'Norway is a major oil and gas producer with world-leading offshore technology and stringent inspection requirements.', industries: ['Oil & Gas', 'Marine & Offshore', 'Subsea', 'Power Generation'], keyFacilities: ['Equinor Facilities', 'Aker Solutions', 'Norwegian Continental Shelf', 'Mongstad Refinery'], coordinates: { lat: 59.9139, lng: 10.7522 } },
  { slug: 'netherlands', name: 'Netherlands', country: 'Netherlands', region: 'Europe', description: 'The Netherlands hosts Europe\'s largest port (Rotterdam) and a major petrochemical industry cluster.', industries: ['Oil & Gas', 'Petrochemical', 'Marine', 'Manufacturing'], keyFacilities: ['Port of Rotterdam', 'Shell Pernis Refinery', 'Chemelot Industrial Park', 'Tata Steel IJmuiden'], coordinates: { lat: 51.9244, lng: 4.4777 } },
  { slug: 'germany', name: 'Germany', country: 'Germany', region: 'Europe', description: 'Germany is Europe\'s manufacturing powerhouse with automotive, aerospace, chemical, and power generation industries.', industries: ['Manufacturing', 'Automotive', 'Aerospace', 'Chemical'], keyFacilities: ['BASF Ludwigshafen', 'Airbus Hamburg', 'ThyssenKrupp Steel', 'VW/BMW Plants'], coordinates: { lat: 52.5200, lng: 13.4050 } },
  { slug: 'france', name: 'France', country: 'France', region: 'Europe', description: 'France has a major nuclear power fleet and aerospace industry requiring advanced NDT services.', industries: ['Nuclear', 'Aerospace', 'Manufacturing', 'Oil & Gas'], keyFacilities: ['EDF Nuclear Fleet', 'Airbus Toulouse', 'TotalEnergies Refineries', 'Naval Group Shipyards'], coordinates: { lat: 48.8566, lng: 2.3522 } },
  { slug: 'spain', name: 'Spain', country: 'Spain', region: 'Europe', description: 'Spain has significant refining capacity, wind energy infrastructure, and shipbuilding industries.', industries: ['Oil & Gas', 'Power Generation', 'Marine', 'Manufacturing'], keyFacilities: ['Repsol Refineries', 'Wind Farms', 'Navantia Shipyards', 'Tarragona Petrochemical'], coordinates: { lat: 40.4168, lng: -3.7038 } },
  { slug: 'italy', name: 'Italy', country: 'Italy', region: 'Europe', description: 'Italy has significant oil refining, aerospace, and automotive manufacturing requiring NDT services.', industries: ['Oil & Gas', 'Aerospace', 'Automotive', 'Manufacturing'], keyFacilities: ['ENI Refineries', 'Leonardo Aerospace', 'Fincantieri Shipyards', 'Fiat/Stellantis Plants'], coordinates: { lat: 41.9028, lng: 12.4964 } },
  // Canada
  { slug: 'calgary', name: 'Calgary', country: 'Canada', region: 'Alberta', description: 'Calgary is the hub of Canada\'s oil sands industry, supporting extensive pipeline, refining, and upstream operations.', industries: ['Oil & Gas', 'Pipeline', 'Mining', 'Power Generation'], keyFacilities: ['Oil Sands Operations', 'Trans Mountain Pipeline', 'Suncor Facilities', 'CNRL Operations'], coordinates: { lat: 51.0447, lng: -114.0719 } },
  { slug: 'edmonton', name: 'Edmonton', country: 'Canada', region: 'Alberta', description: 'Edmonton is the gateway to the Alberta oil sands and a major petrochemical refining center.', industries: ['Oil & Gas', 'Petrochemical', 'Pipeline', 'Manufacturing'], keyFacilities: ['Industrial Heartland', 'Suncor Edmonton Refinery', 'Dow Fort Saskatchewan', 'Inter Pipeline'], coordinates: { lat: 53.5461, lng: -113.4938 } },
  { slug: 'toronto', name: 'Toronto', country: 'Canada', region: 'Ontario', description: 'Toronto and the GTA support nuclear power, manufacturing, and major infrastructure projects.', industries: ['Nuclear', 'Manufacturing', 'Construction', 'Power Generation'], keyFacilities: ['Bruce Nuclear', 'Pickering Nuclear', 'Darlington Nuclear', 'Hamilton Steel Works'], coordinates: { lat: 43.6532, lng: -79.3832 } },
  { slug: 'vancouver', name: 'Vancouver', country: 'Canada', region: 'British Columbia', description: 'Vancouver serves as a Pacific gateway with LNG development, port infrastructure, and pipeline inspection needs.', industries: ['Oil & Gas', 'Marine', 'Construction', 'Pipeline'], keyFacilities: ['LNG Canada Terminal', 'Trans Mountain Terminal', 'Port of Vancouver', 'BC Hydro'], coordinates: { lat: 49.2827, lng: -123.1207 } },
  // Australia
  { slug: 'sydney', name: 'Sydney', country: 'Australia', region: 'New South Wales', description: 'Sydney requires NDT services for infrastructure, construction, and manufacturing industries.', industries: ['Construction', 'Manufacturing', 'Marine', 'Power Generation'], keyFacilities: ['Sydney Harbour Infrastructure', 'Port Botany', 'WestConnex Tunnels', 'Metro Projects'], coordinates: { lat: -33.8688, lng: 151.2093 } },
  { slug: 'melbourne', name: 'Melbourne', country: 'Australia', region: 'Victoria', description: 'Melbourne is Australia\'s manufacturing hub with automotive, aerospace, and heavy engineering industries.', industries: ['Manufacturing', 'Construction', 'Aerospace', 'Power Generation'], keyFacilities: ['Altona Refinery', 'Melbourne Metro Tunnel', 'BAE Systems', 'Port of Melbourne'], coordinates: { lat: -37.8136, lng: 144.9631 } },
  { slug: 'brisbane', name: 'Brisbane', country: 'Australia', region: 'Queensland', description: 'Brisbane supports Queensland\'s mining, LNG, and coal seam gas industries with NDT services.', industries: ['Mining', 'Oil & Gas', 'Construction', 'Manufacturing'], keyFacilities: ['Gladstone LNG Plants', 'Queensland Mining Operations', 'Port of Brisbane'], coordinates: { lat: -27.4698, lng: 153.0251 } },
  { slug: 'perth', name: 'Perth', country: 'Australia', region: 'Western Australia', description: 'Perth is the hub for Australia\'s massive mining and offshore LNG industries, both requiring extensive NDT.', industries: ['Mining', 'Oil & Gas', 'Marine & Offshore', 'Construction'], keyFacilities: ['Gorgon LNG', 'North West Shelf', 'Woodside Facilities', 'Rio Tinto/BHP Mines'], coordinates: { lat: -31.9505, lng: 115.8605 } },
  // Africa
  { slug: 'nigeria', name: 'Nigeria', country: 'Nigeria', region: 'Africa', description: 'Nigeria is Africa\'s largest oil producer with extensive onshore and offshore production facilities.', industries: ['Oil & Gas', 'Marine & Offshore', 'Pipeline', 'Power Generation'], keyFacilities: ['Niger Delta Oil Fields', 'Dangote Refinery', 'Bonny Island LNG', 'Lagos Port Complex'], coordinates: { lat: 6.5244, lng: 3.3792 } },
  { slug: 'south-africa', name: 'South Africa', country: 'South Africa', region: 'Africa', description: 'South Africa has a diversified industrial base including mining, power generation, and manufacturing.', industries: ['Mining', 'Power Generation', 'Manufacturing', 'Petrochemical'], keyFacilities: ['Sasol Secunda', 'Eskom Power Stations', 'Sapref Refinery', 'Mining Operations'], coordinates: { lat: -26.2041, lng: 28.0473 } },
  { slug: 'cape-town', name: 'Cape Town', country: 'South Africa', region: 'Africa', description: 'Cape Town supports marine, renewable energy, and manufacturing industries requiring NDT services.', industries: ['Marine', 'Power Generation', 'Manufacturing', 'Construction'], keyFacilities: ['Cape Town Port', 'Koeberg Nuclear Power Station', 'Wind Farms', 'Saldanha Steel'], coordinates: { lat: -33.9249, lng: 18.4241 } },
  { slug: 'johannesburg', name: 'Johannesburg', country: 'South Africa', region: 'Africa', description: 'Johannesburg is the economic hub of Africa with extensive mining, manufacturing, and power generation.', industries: ['Mining', 'Manufacturing', 'Power Generation', 'Construction'], keyFacilities: ['Gold Mining Operations', 'Sasol Facilities', 'Eskom Grid', 'Johannesburg Industrial Zone'], coordinates: { lat: -26.2041, lng: 28.0473 } },
  { slug: 'nairobi', name: 'Nairobi', country: 'Kenya', region: 'Africa', description: 'Nairobi is a growing industrial center in East Africa with infrastructure development and geothermal energy projects.', industries: ['Power Generation', 'Construction', 'Manufacturing', 'Oil & Gas'], keyFacilities: ['Olkaria Geothermal', 'Mombasa-Nairobi Pipeline', 'Standard Gauge Railway', 'LAPSSET Project'], coordinates: { lat: -1.2921, lng: 36.8219 } },
  { slug: 'egypt', name: 'Egypt', country: 'Egypt', region: 'Africa', description: 'Egypt has a growing oil and gas sector with the Zohr gas field and Suez Canal infrastructure.', industries: ['Oil & Gas', 'Marine', 'Power Generation', 'Construction'], keyFacilities: ['Suez Canal', 'Zohr Gas Field', 'Egyptian Refineries', 'New Administrative Capital'], coordinates: { lat: 30.0444, lng: 31.2357 } },
  // South America
  { slug: 'brazil', name: 'Brazil', country: 'Brazil', region: 'South America', description: 'Brazil has massive pre-salt offshore oil reserves and a large industrial manufacturing base.', industries: ['Oil & Gas', 'Marine & Offshore', 'Mining', 'Manufacturing'], keyFacilities: ['Petrobras Pre-Salt Fields', 'FPSO Fleet', 'Vale Mining', 'CSN Steel'], coordinates: { lat: -23.5505, lng: -46.6333 } },
  { slug: 'argentina', name: 'Argentina', country: 'Argentina', region: 'South America', description: 'Argentina\'s Vaca Muerta shale formation is one of the world\'s largest, driving major NDT demand.', industries: ['Oil & Gas', 'Mining', 'Manufacturing', 'Power Generation'], keyFacilities: ['Vaca Muerta Shale', 'YPF Facilities', 'Atucha Nuclear Plants', 'Patagonia Wind Farms'], coordinates: { lat: -34.6037, lng: -58.3816 } },
  { slug: 'chile', name: 'Chile', country: 'Chile', region: 'South America', description: 'Chile is the world\'s largest copper producer and a growing renewable energy market.', industries: ['Mining', 'Power Generation', 'Manufacturing', 'Construction'], keyFacilities: ['Escondida Mine', 'Codelco Operations', 'Enami Refinery', 'Solar/Wind Farms'], coordinates: { lat: -33.4489, lng: -70.6693 } },
  { slug: 'colombia', name: 'Colombia', country: 'Colombia', region: 'South America', description: 'Colombia has significant oil production, refining, and mining operations requiring NDT services.', industries: ['Oil & Gas', 'Mining', 'Manufacturing', 'Power Generation'], keyFacilities: ['Ecopetrol Refineries', 'Cerrejon Coal Mine', 'Pipeline Networks', 'Cartagena Refinery'], coordinates: { lat: 4.7110, lng: -74.0721 } },
  { slug: 'mexico', name: 'Mexico', country: 'Mexico', region: 'North America', description: 'Mexico has major oil production through PEMEX, automotive manufacturing, and growing industrial infrastructure.', industries: ['Oil & Gas', 'Automotive', 'Manufacturing', 'Power Generation'], keyFacilities: ['PEMEX Refineries', 'Dos Bocas Refinery', 'Automotive Corridor', 'Mexico City Airport'], coordinates: { lat: 19.4326, lng: -99.1332 } },
  { slug: 'trinidad', name: 'Trinidad & Tobago', country: 'Trinidad and Tobago', region: 'Caribbean', description: 'Trinidad is the Caribbean\'s largest oil and gas producer with major LNG and petrochemical facilities.', industries: ['Oil & Gas', 'LNG', 'Petrochemical', 'Marine'], keyFacilities: ['Atlantic LNG', 'Petrotrin Refinery', 'Point Lisas Industrial Estate', 'bpTT Platforms'], coordinates: { lat: 10.6918, lng: -61.2225 } },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map(c => c.slug);
}

// ---- NDT METHOD DATA ----
export interface MethodData {
  slug: string;
  name: string;
  abbreviation: string;
  description: string;
  longDescription: string;
  principles: string[];
  applications: string[];
  advantages: string[];
  limitations: string[];
  standards: string[];
  industries: string[];
}

export const methods: MethodData[] = [
  {
    slug: 'ultrasonic-testing',
    name: 'Ultrasonic Testing',
    abbreviation: 'UT',
    description: 'Ultrasonic Testing uses high-frequency sound waves to detect internal flaws, measure material thickness, and characterize material properties.',
    longDescription: 'Ultrasonic Testing (UT) is one of the most versatile and widely-used NDT methods. It uses high-frequency sound waves (typically 0.5-25 MHz) transmitted into materials to detect internal discontinuities, measure wall thickness, and assess material properties. When sound waves encounter a boundary or defect, they reflect back to the transducer, producing signals that trained technicians interpret to determine the nature and location of any anomalies.',
    principles: ['Piezoelectric transducers generate and receive ultrasonic waves', 'Sound waves reflect from boundaries, defects, and back walls', 'Time-of-flight and amplitude analysis determine flaw characteristics', 'Couplant required between transducer and test surface'],
    applications: ['Weld inspection and quality verification', 'Thickness measurement and corrosion monitoring', 'Flaw detection in forgings, castings, and rolled products', 'Bond testing in composite materials', 'In-service inspection of pressure vessels and piping'],
    advantages: ['High sensitivity to both surface and subsurface flaws', 'Accurate depth and size measurements', 'Only single-sided access required', 'Immediate results with portable equipment', 'No radiation hazards', 'Can inspect thick sections'],
    limitations: ['Requires skilled operators', 'Surface must be accessible for coupling', 'Difficult with complex geometries', 'Reference standards needed for calibration', 'Coarse-grained materials can cause issues'],
    standards: ['ASME Section V', 'ASTM E164', 'ASTM E2375', 'ISO 16810', 'EN 12668', 'AWS D1.1'],
    industries: ['Oil & Gas', 'Aerospace', 'Power Generation', 'Manufacturing', 'Marine', 'Construction'],
  },
  {
    slug: 'radiographic-testing',
    name: 'Radiographic Testing',
    abbreviation: 'RT',
    description: 'Radiographic Testing uses X-rays or gamma rays to create images of a component\'s internal structure, revealing hidden defects.',
    longDescription: 'Radiographic Testing (RT) uses penetrating radiation (X-rays or gamma rays) to examine the internal structure of materials and components. Radiation passes through the test object and is captured on film or digital detector, producing an image that reveals internal discontinuities such as voids, porosity, cracks, and inclusions. RT provides a permanent record of the inspection and is considered the definitive method for weld quality verification.',
    principles: ['Radiation penetrates through the test material', 'Density differences cause varying absorption rates', 'Film or digital detectors capture transmitted radiation', 'Image contrast reveals internal discontinuities'],
    applications: ['Weld quality verification', 'Casting inspection', 'Corrosion assessment', 'Erosion monitoring', 'Foreign object detection', 'Pipeline girth weld inspection'],
    advantages: ['Provides permanent visual record', 'Can inspect complex internal geometries', 'Less operator-dependent than UT', 'Detects volumetric defects effectively', 'Applicable to most materials'],
    limitations: ['Radiation safety concerns require exclusion zones', 'Two-sided access typically required', 'Poor for detecting planar defects parallel to beam', 'Film processing time (conventional)', 'Equipment can be expensive'],
    standards: ['ASME Section V', 'ASTM E94', 'ASTM E1032', 'ISO 17636', 'EN 13068', 'API 1104'],
    industries: ['Oil & Gas', 'Aerospace', 'Power Generation', 'Manufacturing', 'Pipeline'],
  },
  {
    slug: 'magnetic-particle-testing',
    name: 'Magnetic Particle Testing',
    abbreviation: 'MT',
    description: 'Magnetic Particle Testing detects surface and near-surface defects in ferromagnetic materials using magnetic fields and iron particles.',
    longDescription: 'Magnetic Particle Testing (MT/MPI) is used to detect surface and near-surface discontinuities in ferromagnetic materials such as steel, iron, nickel, and cobalt alloys. The method works by magnetizing the test area and applying fine ferromagnetic particles (dry or in suspension) to the surface. Discontinuities cause magnetic flux leakage that attracts particles, forming visible indications that outline the defect.',
    principles: ['Test piece is magnetized using direct or indirect magnetization', 'Discontinuities disrupt the magnetic flux flow', 'Flux leakage at defects attracts ferromagnetic particles', 'Visible or fluorescent particles form indications at defects'],
    applications: ['Surface crack detection', 'Weld inspection', 'Forging and casting inspection', 'In-service fatigue crack detection', 'Post-machining inspection', 'Structural steel inspection'],
    advantages: ['Rapid and relatively simple to perform', 'Can detect defects through thin coatings', 'Immediate results', 'Portable equipment available', 'Relatively inexpensive', 'Can detect near-surface defects'],
    limitations: ['Only works on ferromagnetic materials', 'Surface preparation may be required', 'Demagnetization needed after testing', 'Limited depth of detection', 'Proper magnetization direction critical'],
    standards: ['ASTM E1444', 'ASTM E709', 'ASME Section V', 'ISO 9934', 'EN ISO 17638', 'AWS D1.1'],
    industries: ['Manufacturing', 'Aerospace', 'Oil & Gas', 'Construction', 'Automotive', 'Rail'],
  },
  {
    slug: 'penetrant-testing',
    name: 'Liquid Penetrant Testing',
    abbreviation: 'PT',
    description: 'Liquid Penetrant Testing reveals surface-breaking defects by applying a colored or fluorescent dye that seeps into cracks and discontinuities.',
    longDescription: 'Liquid Penetrant Testing (PT/LPI) is used to detect surface-breaking discontinuities in non-porous materials. A liquid penetrant is applied to the test surface and allowed to dwell, seeping into any surface-breaking defects by capillary action. Excess penetrant is removed, and a developer is applied which draws penetrant from defects back to the surface, creating visible indications.',
    principles: ['Penetrant enters surface defects by capillary action', 'Excess penetrant removed from surface', 'Developer draws trapped penetrant back to surface', 'Visual or fluorescent inspection reveals indications'],
    applications: ['Surface crack detection on any non-porous material', 'Weld inspection', 'Casting and forging inspection', 'In-service fatigue crack detection', 'Quality control in manufacturing', 'Aerospace component inspection'],
    advantages: ['Works on virtually any non-porous material', 'Simple and inexpensive', 'Portable - can inspect in field', 'High sensitivity (fluorescent method)', 'Can inspect complex shapes', 'Produces visible indications'],
    limitations: ['Only detects surface-breaking defects', 'Surface preparation is critical', 'Temperature sensitivity', 'Chemical handling requirements', 'Cannot inspect rough or porous surfaces', 'Multiple process steps required'],
    standards: ['ASTM E165', 'ASTM E1417', 'ASME Section V', 'ISO 3452', 'EN ISO 3452', 'AMS 2644'],
    industries: ['Aerospace', 'Manufacturing', 'Oil & Gas', 'Power Generation', 'Automotive', 'Marine'],
  },
  {
    slug: 'eddy-current-testing',
    name: 'Eddy Current Testing',
    abbreviation: 'ET',
    description: 'Eddy Current Testing uses electromagnetic induction to detect surface and near-surface flaws in conductive materials.',
    longDescription: 'Eddy Current Testing (ET/ECT) is an electromagnetic NDT method used to detect surface and near-surface flaws in electrically conductive materials. An alternating current-carrying coil is placed near the test surface, inducing eddy currents in the material. Defects or material property changes alter the eddy current flow, which is detected as changes in the coil impedance.',
    principles: ['AC coil generates alternating magnetic field', 'Eddy currents are induced in conductive material', 'Defects alter eddy current flow patterns', 'Impedance changes detected and analyzed'],
    applications: ['Tube and heat exchanger inspection', 'Surface crack detection', 'Coating thickness measurement', 'Conductivity measurement', 'Bolt hole inspection in aerospace', 'Weld inspection'],
    advantages: ['No couplant required', 'Fast scanning speed', 'Can inspect through coatings', 'High sensitivity to surface cracks', 'Automated inspection capability', 'No surface preparation needed'],
    limitations: ['Only works on conductive materials', 'Limited penetration depth', 'Sensitive to lift-off variations', 'Reference standards required', 'Geometry can affect results'],
    standards: ['ASTM E243', 'ASTM E376', 'ASME Section V', 'ISO 15548', 'EN 1711', 'ASTM E2096'],
    industries: ['Aerospace', 'Power Generation', 'Oil & Gas', 'Manufacturing', 'Automotive'],
  },
  {
    slug: 'visual-testing',
    name: 'Visual Testing',
    abbreviation: 'VT',
    description: 'Visual Testing is the most fundamental NDT method, using direct or remote visual examination to detect surface discontinuities.',
    longDescription: 'Visual Testing (VT) is the most basic and widely-used NDT method, involving the visual examination of test objects to detect surface conditions, alignment, shape, and surface discontinuities. It can be performed directly (unaided or with magnification) or remotely using cameras, borescopes, or drones. VT is typically the first inspection performed and is required by most codes and standards.',
    principles: ['Direct observation of surface conditions', 'Adequate lighting and visual acuity required', 'Remote viewing using cameras, borescopes, drones', 'Measurement tools verify dimensional compliance'],
    applications: ['Weld quality assessment', 'Surface condition evaluation', 'Dimensional verification', 'Corrosion and erosion assessment', 'Alignment and fit-up checks', 'In-service inspection'],
    advantages: ['Simplest and most cost-effective method', 'Immediate results', 'No complex equipment required', 'Applicable to all materials', 'Can be performed during fabrication', 'Required by virtually all codes'],
    limitations: ['Only detects surface conditions', 'Requires adequate access and lighting', 'Highly dependent on inspector competence', 'Limited to visible surfaces', 'Cannot detect internal defects', 'Subjective interpretation possible'],
    standards: ['AWS D1.1', 'ASME Section V', 'API 510/570/653', 'ISO 17637', 'EN 13018'],
    industries: ['All Industries'],
  },
  {
    slug: 'phased-array-ut',
    name: 'Phased Array Ultrasonic Testing',
    abbreviation: 'PAUT',
    description: 'Phased Array UT uses multi-element transducers to electronically steer and focus ultrasonic beams for advanced imaging.',
    longDescription: 'Phased Array Ultrasonic Testing (PAUT) is an advanced UT technique that uses multi-element transducers controlled electronically to generate focused beams that can be steered, scanned, and swept without mechanical movement. This enables real-time imaging of cross-sections, faster scanning speeds, and more reliable detection compared to conventional UT.',
    principles: ['Multiple transducer elements fired with controlled time delays', 'Electronic beam steering and focusing', 'Sectorial (S-scan) and linear (L-scan) imaging', 'Real-time cross-sectional visualization'],
    applications: ['Critical weld inspection', 'Corrosion mapping', 'Crack sizing and characterization', 'Composite inspection', 'Turbine blade inspection', 'Pipeline inspection'],
    advantages: ['Superior imaging capabilities', 'Faster inspection speeds', 'Better defect characterization', 'Electronic steering eliminates mechanical scanning', 'Permanent digital records', 'Reduced operator dependence'],
    limitations: ['Higher equipment cost', 'Requires specialized training', 'Complex setup and calibration', 'Data interpretation requires expertise', 'Larger equipment than conventional UT'],
    standards: ['ASME Section V', 'ISO 13588', 'ISO 19285', 'ASTM E2491', 'EN 13588', 'DNVGL-ST-F101'],
    industries: ['Oil & Gas', 'Aerospace', 'Power Generation', 'Pipeline', 'Marine'],
  },
  {
    slug: 'tofd-testing',
    name: 'Time-of-Flight Diffraction',
    abbreviation: 'TOFD',
    description: 'TOFD uses diffracted ultrasonic signals from flaw tips for precise defect sizing and is often paired with PAUT.',
    longDescription: 'Time-of-Flight Diffraction (TOFD) is an advanced ultrasonic technique that uses the time of flight of diffracted signals from the tips of defects to accurately determine flaw height and through-wall extent. TOFD is widely used for critical weld inspection and is often combined with PAUT to provide comprehensive inspection coverage.',
    principles: ['Two transducers in pitch-catch configuration', 'Diffracted signals from crack tips measured', 'Time-of-flight determines defect position and size', 'Less operator-dependent than conventional UT'],
    applications: ['Critical weld inspection', 'Crack height measurement', 'Fitness-for-service assessments', 'Pre-service and in-service inspection', 'Pipeline girth weld inspection'],
    advantages: ['Accurate defect sizing', 'High probability of detection', 'Permanent digital record', 'Less operator-dependent', 'Full weld volume coverage', 'Fast scanning speed'],
    limitations: ['Dead zones at surfaces', 'Requires parallel scanning surfaces', 'Specialized training needed', 'Not ideal for thin materials', 'Equipment cost higher than conventional UT'],
    standards: ['ISO 10863', 'BS EN ISO 10863', 'ASME Section V', 'ASTM E2373', 'CEN/TS 14751'],
    industries: ['Oil & Gas', 'Power Generation', 'Pipeline', 'Petrochemical'],
  },
  {
    slug: 'guided-wave-testing',
    name: 'Guided Wave Testing',
    abbreviation: 'GWT',
    description: 'Guided Wave Testing can rapidly screen long lengths of pipe from a single probe position, ideal for insulated and buried pipelines.',
    longDescription: 'Guided Wave Testing (GWT) uses low-frequency ultrasonic waves that propagate along the length of a structure (typically piping) to screen for corrosion and defects over long distances from a single probe position. This technique is particularly valuable for inspecting insulated, coated, elevated, or buried piping where conventional inspection methods would require extensive preparation.',
    principles: ['Low-frequency waves propagate along pipe walls', 'Waves reflect from wall thickness changes and defects', 'Single probe position can screen 50+ meters of pipe', 'Torsional and longitudinal wave modes used'],
    applications: ['Insulated pipeline screening', 'Buried pipeline assessment', 'Road crossing inspections', 'Elevated piping in racks', 'Subsea pipeline monitoring', 'Cased pipe inspection'],
    advantages: ['Inspects long lengths from single position', 'No need to remove insulation', 'Can inspect inaccessible areas', '100% circumferential coverage', 'Rapid screening capability', 'Identifies areas requiring detailed follow-up'],
    limitations: ['Screening tool - not precise sizing', 'Limited by pipe features (supports, branches)', 'Sensitivity decreases with distance', 'Cannot inspect through flanges', 'Temperature limitations'],
    standards: ['ISO 18211', 'ASTM E2775', 'BS 9690', 'DNV-RP-G103'],
    industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Pipeline'],
  },
  {
    slug: 'acoustic-emission-testing',
    name: 'Acoustic Emission Testing',
    abbreviation: 'AE',
    description: 'Acoustic Emission Testing monitors structures in real-time by detecting stress waves emitted from growing defects.',
    longDescription: 'Acoustic Emission Testing (AE/AET) is a passive NDT method that detects elastic waves generated by the rapid release of energy from growing defects, corrosion, or leaks within a structure. Multiple sensors placed on the structure detect and locate emission sources in real-time, providing continuous structural health monitoring capability.',
    principles: ['Sensors detect elastic waves from active defect sources', 'Triangulation locates emission sources', 'Real-time monitoring of structural integrity', 'Passive method - structure must be under load'],
    applications: ['Pressure vessel monitoring during hydrotest', 'Bridge structural monitoring', 'Storage tank floor inspection', 'Composite structure monitoring', 'Leak detection', 'Rotating machinery monitoring'],
    advantages: ['Real-time monitoring capability', 'Global inspection from sensor array', 'Detects active/growing defects', 'Continuous structural health monitoring', 'Can inspect during operation', 'Identifies critically stressed areas'],
    limitations: ['Only detects active/growing defects', 'Requires loading or operation', 'Environmental noise interference', 'Complex data interpretation', 'Specialized equipment and training', 'Cannot determine defect size directly'],
    standards: ['ASTM E569', 'ASTM E1067', 'ASME Section V', 'ISO 22096', 'EN 13554'],
    industries: ['Oil & Gas', 'Power Generation', 'Aerospace', 'Construction', 'Manufacturing'],
  },
  {
    slug: 'magnetic-flux-leakage',
    name: 'Magnetic Flux Leakage Testing',
    abbreviation: 'MFL',
    description: 'Magnetic Flux Leakage uses strong magnets to detect wall loss and corrosion in pipelines and storage tank floors.',
    longDescription: 'Magnetic Flux Leakage (MFL) is a widely-used NDT method for inspecting ferromagnetic materials, particularly in pipeline and storage tank applications. A strong magnetic field is applied to the material, and sensors detect flux leakage caused by wall thickness reductions, corrosion, or other defects. MFL is commonly used in pipeline pigging operations for inline inspection.',
    principles: ['Strong magnetic field saturates the test material', 'Wall loss causes magnetic flux to leak from surface', 'Hall effect sensors or coils detect flux leakage', 'Signal analysis determines defect severity'],
    applications: ['Pipeline inline inspection (pigging)', 'Storage tank floor scanning', 'Wire rope inspection', 'Heat exchanger tubing', 'Well casing inspection'],
    advantages: ['Fast scanning speed', 'No couplant required', 'Can inspect through coatings', 'Automated inspection possible', 'Good for large-area scanning', 'Established pipeline inspection method'],
    limitations: ['Only works on ferromagnetic materials', 'Sensitivity affected by scanning speed', 'Difficult with thick materials', 'Cannot determine exact defect depth', 'Strong magnets create handling challenges'],
    standards: ['API 1163', 'ASTM E2905', 'ASME B31.8S', 'NACE SP0102', 'API 650 Annex K'],
    industries: ['Oil & Gas', 'Pipeline', 'Storage', 'Manufacturing'],
  },
  {
    slug: 'corrosion-mapping',
    name: 'Corrosion Mapping',
    abbreviation: 'CM',
    description: 'Corrosion Mapping provides detailed thickness maps of equipment walls to assess corrosion damage and predict remaining life.',
    longDescription: 'Corrosion Mapping is a specialized application of ultrasonic testing that creates detailed wall thickness maps of equipment and piping to assess the extent and severity of corrosion damage. Using encoded scanning systems, corrosion mapping produces color-coded C-scan images that clearly show areas of wall loss, enabling accurate remaining life calculations and maintenance planning.',
    principles: ['Encoded UT scanning creates position-correlated data', 'C-scan display shows thickness as color-coded map', 'Statistical analysis determines corrosion rates', 'Comparison with previous scans tracks progression'],
    applications: ['Pressure vessel corrosion assessment', 'Piping system condition monitoring', 'Storage tank shell inspection', 'Heat exchanger shell mapping', 'Structural member assessment', 'Fitness-for-service evaluations'],
    advantages: ['Comprehensive area coverage', 'Permanent digital records for trending', 'Accurate remaining life calculations', 'Color-coded visual display', 'Identifies localized corrosion patterns', 'Supports risk-based inspection programs'],
    limitations: ['Surface access and preparation required', 'Slower than spot readings', 'Equipment cost higher than manual UT', 'Requires trained operators', 'Couplant management on vertical surfaces'],
    standards: ['ASME Section V', 'API 510/570/653', 'ASTM E2375', 'DNV-RP-G103', 'BS 7910'],
    industries: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Marine', 'Pipeline'],
  },
];

export function getMethodBySlug(slug: string): MethodData | undefined {
  return methods.find(m => m.slug === slug);
}

export function getAllMethodSlugs(): string[] {
  return methods.map(m => m.slug);
}

// ---- INDUSTRY DATA ----
export interface IndustryData {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  commonMethods: string[];
  keyApplications: string[];
  challenges: string[];
  standards: string[];
  whyNDT: string;
}

export const industries: IndustryData[] = [
  {
    slug: 'oil-and-gas',
    name: 'Oil & Gas',
    description: 'NDT services for upstream, midstream, and downstream oil and gas operations including refineries, pipelines, and offshore platforms.',
    longDescription: 'The oil and gas industry is the largest consumer of NDT services globally. From upstream exploration and production to midstream transportation and downstream refining, every stage of the petroleum value chain requires rigorous non-destructive testing to ensure structural integrity, prevent catastrophic failures, and comply with strict regulatory requirements.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Radiographic Testing (RT)', 'Magnetic Particle Testing (MT)', 'Phased Array UT (PAUT)', 'TOFD', 'Guided Wave Testing', 'MFL', 'Corrosion Mapping'],
    keyApplications: ['Pipeline integrity management', 'Pressure vessel inspection', 'Weld quality verification', 'Corrosion monitoring', 'Storage tank inspection', 'Offshore platform inspection', 'Heat exchanger tubing', 'Flare stack inspection'],
    challenges: ['Aging infrastructure requires increasing inspection frequency', 'Remote and hazardous locations', 'High-temperature and high-pressure environments', 'Regulatory compliance across jurisdictions', 'Minimizing production downtime during inspections'],
    standards: ['API 510', 'API 570', 'API 653', 'API 1104', 'ASME B31.3', 'ASME B31.4', 'ASME B31.8'],
    whyNDT: 'NDT is legally required for oil and gas operations worldwide. Equipment failures can result in explosions, fires, environmental disasters, and loss of life. Regular NDT inspection programs are the primary defense against catastrophic failures.',
  },
  {
    slug: 'aerospace',
    name: 'Aerospace',
    description: 'NDT inspection for aircraft structures, engine components, composites, and space systems requiring the highest quality standards.',
    longDescription: 'Aerospace is one of the most demanding industries for NDT, requiring the highest levels of reliability and precision. Every aircraft component must meet stringent quality standards, and NDT plays a critical role in both manufacturing quality assurance and in-service maintenance inspections. The growing use of composite materials has driven innovation in NDT techniques.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Eddy Current Testing (ET)', 'Radiographic Testing (RT)', 'Liquid Penetrant Testing (PT)', 'Visual Testing (VT)', 'Phased Array UT (PAUT)', 'Thermography'],
    keyApplications: ['Aircraft structural inspection', 'Engine component testing', 'Composite structure evaluation', 'Landing gear inspection', 'Turbine blade inspection', 'Fastener hole inspection', 'Bond quality assessment', 'Space vehicle components'],
    challenges: ['Zero-defect tolerance requirements', 'Complex composite material inspection', 'Tight turnaround times for aircraft maintenance', 'Rapidly evolving materials and designs', 'Qualification and certification requirements'],
    standards: ['NAS 410', 'EN 4179', 'ASTM E2981', 'AMS 2630', 'AMS 2631', 'AMS 2632', 'FAA AC 43.13'],
    whyNDT: 'NDT is mandated by aviation authorities worldwide. Aircraft components must be inspected at specified intervals, and any manufacturing defect detected through NDT can prevent catastrophic in-flight failures.',
  },
  {
    slug: 'power-generation',
    name: 'Power Generation',
    description: 'NDT services for nuclear, fossil fuel, and renewable energy power plants ensuring safe and reliable electricity generation.',
    longDescription: 'Power generation facilities operate under extreme conditions of temperature, pressure, and cyclic loading that degrade equipment over time. NDT is essential for monitoring component integrity, planning maintenance, and ensuring compliance with regulatory requirements. Nuclear power plants have particularly stringent inspection requirements.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Eddy Current Testing (ET)', 'Radiographic Testing (RT)', 'Visual Testing (VT)', 'Acoustic Emission (AE)', 'Phased Array UT (PAUT)', 'Magnetic Particle Testing (MT)'],
    keyApplications: ['Boiler tube inspection', 'Turbine component testing', 'Nuclear reactor vessel inspection', 'Steam generator tubing', 'Cooling system assessment', 'Wind turbine blade inspection', 'High-energy piping inspection', 'Condenser tubing'],
    challenges: ['Nuclear regulatory requirements (NRC, CNSC)', 'High-temperature in-service inspection', 'Radiation exposure management', 'Equipment aging and life extension', 'Transition to renewable energy assets'],
    standards: ['ASME Section XI', 'ASME Section V', 'EPRI Guidelines', '10 CFR 50', 'ASTM E2491', 'IEC 61400'],
    whyNDT: 'Power plant failures can cause widespread blackouts, environmental damage, and in the case of nuclear facilities, radiation release. NDT programs are legally mandated and form the backbone of plant life management strategies.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    description: 'Quality assurance NDT for manufacturing processes including welding, casting, forging, and machining operations.',
    longDescription: 'Manufacturing industries use NDT throughout the production process to ensure product quality, reduce scrap rates, and meet customer specifications. From incoming raw material inspection to final product verification, NDT is integral to modern quality management systems and helps manufacturers maintain competitive advantages through consistent quality.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Radiographic Testing (RT)', 'Magnetic Particle Testing (MT)', 'Liquid Penetrant Testing (PT)', 'Visual Testing (VT)', 'Eddy Current Testing (ET)'],
    keyApplications: ['Weld quality verification', 'Casting defect detection', 'Forging inspection', 'Raw material validation', 'In-process quality control', 'Final product acceptance', 'Supplier quality auditing', 'Failure analysis support'],
    challenges: ['High production volumes require fast inspection', 'Automated inspection integration', 'Diverse materials and geometries', 'Cost-effective quality assurance', 'Meeting customer-specific requirements'],
    standards: ['ISO 9001', 'ASME Section V', 'ASTM Standards', 'AWS D1.1', 'EN 12062', 'ISO 5817'],
    whyNDT: 'NDT reduces manufacturing costs by detecting defects early, before costly rework or field failures. It provides objective evidence of quality compliance and is required by most product standards and customer specifications.',
  },
  {
    slug: 'marine-and-offshore',
    name: 'Marine & Offshore',
    description: 'NDT inspection for ships, offshore platforms, subsea equipment, and port infrastructure exposed to harsh marine environments.',
    longDescription: 'Marine and offshore structures operate in one of the most corrosive environments on earth. Saltwater, wave loading, and extreme weather conditions cause accelerated degradation that must be monitored through regular NDT inspection programs. Classification societies require periodic surveys to maintain vessel and platform certifications.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Magnetic Particle Testing (MT)', 'Visual Testing (VT)', 'Corrosion Mapping', 'MFL Testing', 'Radiographic Testing (RT)', 'Underwater NDT'],
    keyApplications: ['Hull thickness measurement', 'Offshore platform structural inspection', 'Subsea pipeline inspection', 'Mooring chain inspection', 'Ballast tank assessment', 'Crane and lifting equipment', 'Port infrastructure inspection', 'FPSO hull and process inspection'],
    challenges: ['Access difficulties in offshore environment', 'Underwater inspection requirements', 'Harsh environmental conditions', 'Classification society compliance', 'Inspection during weather windows'],
    standards: ['DNV Rules', 'Lloyd\'s Register Rules', 'ABS Rules', 'IACS Requirements', 'API RP 2A', 'NORSOK Standards'],
    whyNDT: 'Marine vessel and offshore platform failures can result in loss of life, environmental disasters, and massive economic losses. Classification societies mandate regular NDT surveys as a condition of maintaining operational certification.',
  },
  {
    slug: 'construction',
    name: 'Construction & Infrastructure',
    description: 'NDT for structural steel, bridges, buildings, tunnels, and civil infrastructure ensuring public safety and structural integrity.',
    longDescription: 'The construction and infrastructure sector relies on NDT to verify the quality of structural connections, assess the condition of aging infrastructure, and ensure public safety. From new construction weld inspection to bridge condition assessment, NDT provides essential data for engineering decisions about structural integrity and remaining service life.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Magnetic Particle Testing (MT)', 'Visual Testing (VT)', 'Radiographic Testing (RT)', 'Ground Penetrating Radar', 'Rebound Hammer Testing'],
    keyApplications: ['Structural steel weld inspection', 'Bridge inspection and assessment', 'Post-tension cable evaluation', 'Concrete reinforcement scanning', 'Building structural assessment', 'Tunnel lining inspection', 'Railway infrastructure', 'Dam inspection'],
    challenges: ['Large-scale structures require efficient methods', 'Access to elevated or confined areas', 'Traffic management during inspections', 'Weather-dependent scheduling', 'Aging infrastructure backlog'],
    standards: ['AWS D1.1', 'AWS D1.5', 'AISC Standards', 'AASHTO Standards', 'ACI 228', 'EN 1090'],
    whyNDT: 'Public safety depends on the structural integrity of bridges, buildings, and infrastructure. NDT provides objective data for condition assessment and enables informed decisions about repair, rehabilitation, or replacement.',
  },
  {
    slug: 'mining',
    name: 'Mining & Minerals',
    description: 'NDT for mining equipment, processing plants, structural components, and material handling systems in demanding environments.',
    longDescription: 'The mining industry operates in extremely demanding conditions with heavy equipment, abrasive materials, and continuous operation requirements. NDT is critical for maintaining equipment reliability, preventing catastrophic failures, and ensuring the safety of workers in remote and hazardous environments.',
    commonMethods: ['Ultrasonic Testing (UT)', 'Magnetic Particle Testing (MT)', 'Visual Testing (VT)', 'Radiographic Testing (RT)', 'MFL Testing', 'Eddy Current Testing (ET)'],
    keyApplications: ['Mining equipment inspection', 'Conveyor system assessment', 'Crusher and mill inspection', 'Processing plant piping', 'Slurry pipeline inspection', 'Wire rope inspection', 'Structural component assessment', 'Pressure vessel inspection'],
    challenges: ['Remote locations', 'Abrasive and corrosive environments', 'Continuous operation requirements', 'Heavy and large-scale equipment', 'Extreme temperatures in some operations'],
    standards: ['AS 3788', 'ASME Section V', 'ISO 9712', 'Mine Safety Regulations', 'API Standards'],
    whyNDT: 'Mining equipment failures can cause serious injuries, production losses worth millions per day, and environmental incidents. NDT programs are essential for predictive maintenance and worker safety in mining operations.',
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find(i => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map(i => i.slug);
}

// ---- CERTIFICATION DATA ----
export interface CertificationData {
  slug: string;
  name: string;
  abbreviation: string;
  description: string;
  longDescription: string;
  levels: string[];
  requirements: string[];
  examTopics: string[];
  validityPeriod: string;
  issuingBody: string;
  relevantMethods: string[];
}

export const certifications: CertificationData[] = [
  {
    slug: 'asnt-certification',
    name: 'ASNT Certification',
    abbreviation: 'ASNT',
    description: 'The American Society for Nondestructive Testing provides the most widely recognized NDT certification programs in North America.',
    longDescription: 'ASNT (American Society for Nondestructive Testing) offers multiple certification paths for NDT professionals. The most common are employer-based certification under SNT-TC-1A and the portable ASNT Central Certification Program (ACCP). ASNT Level III certification is the highest individual qualification and is recognized as the industry benchmark for NDT expertise.',
    levels: ['Level I - Qualified to perform specific NDT calibrations, tests, and evaluations under supervision', 'Level II - Qualified to set up and calibrate equipment, interpret results, and supervise Level I personnel', 'Level III - Expert level qualified to establish techniques, interpret codes and standards, and certify others'],
    requirements: ['Minimum documented training hours per method', 'Minimum experience hours per level', 'Written examination (general, specific, practical)', 'Vision acuity requirements', 'Employer authorization (SNT-TC-1A) or ASNT examination (ACCP)'],
    examTopics: ['NDT method principles and theory', 'Equipment operation and calibration', 'Code and standard interpretation', 'Defect identification and evaluation', 'Report writing and documentation', 'Safety practices'],
    validityPeriod: '5 years (ACCP), employer-defined (SNT-TC-1A)',
    issuingBody: 'American Society for Nondestructive Testing',
    relevantMethods: ['UT', 'RT', 'MT', 'PT', 'ET', 'VT', 'AE', 'IR'],
  },
  {
    slug: 'iso-9712',
    name: 'ISO 9712 Certification',
    abbreviation: 'ISO 9712',
    description: 'International standard for NDT personnel qualification and certification recognized in over 50 countries worldwide.',
    longDescription: 'ISO 9712 is the international standard that establishes the principles for qualification and certification of NDT personnel. It is adopted by national certification bodies worldwide and provides a framework for mutual recognition of NDT qualifications across borders. Certification is issued by accredited certification bodies, not employers.',
    levels: ['Level 1 - Performs NDT operations according to written instructions under supervision', 'Level 2 - Selects technique, sets up equipment, performs tests, evaluates results per applicable standards', 'Level 3 - Takes full responsibility for NDT operations, develops procedures, interprets standards'],
    requirements: ['Minimum training hours (varies by method and level)', 'Minimum experience months', 'General, specific, and practical examinations', 'Visual acuity test', 'Certification by accredited body'],
    examTopics: ['NDT fundamentals and physics', 'Method-specific theory and practice', 'Applicable standards and codes', 'Material science basics', 'Practical demonstration of competency'],
    validityPeriod: '5 years with annual confirmation of activity',
    issuingBody: 'National certification bodies (e.g., PCN in UK, COFREND in France)',
    relevantMethods: ['UT', 'RT', 'MT', 'PT', 'ET', 'VT', 'TT', 'ST'],
  },
  {
    slug: 'api-510',
    name: 'API 510 Certification',
    abbreviation: 'API 510',
    description: 'Pressure Vessel Inspector certification from the American Petroleum Institute for in-service inspection of pressure vessels.',
    longDescription: 'API 510 is a certification program for pressure vessel inspectors administered by the American Petroleum Institute. It qualifies individuals to perform in-service inspection, repair, alteration, and rerating of pressure vessels in accordance with API 510 "Pressure Vessel Inspection Code." This certification is widely required in the oil and gas, petrochemical, and refining industries.',
    levels: ['Single level - API 510 Authorized Pressure Vessel Inspector'],
    requirements: ['Minimum education and experience (typically 5-10 years)', 'Passing score on API 510 examination', 'Knowledge of ASME BPVC, API 510, API 572, API 576, API 571', 'Demonstrated competency in pressure vessel inspection'],
    examTopics: ['API 510 Code requirements', 'ASME Section VIII Division 1 & 2', 'Welding and NDE fundamentals', 'Corrosion and degradation mechanisms', 'Fitness-for-service concepts', 'Repair and alteration procedures'],
    validityPeriod: '3 years',
    issuingBody: 'American Petroleum Institute',
    relevantMethods: ['UT', 'RT', 'MT', 'PT', 'VT'],
  },
  {
    slug: 'api-570',
    name: 'API 570 Certification',
    abbreviation: 'API 570',
    description: 'Piping Inspector certification from API for in-service inspection of process piping systems.',
    longDescription: 'API 570 certifies individuals as Authorized Piping Inspectors, qualified to perform in-service inspection of metallic and fiberglass-reinforced plastic piping systems. This certification is critical for refineries, chemical plants, and other process facilities where piping integrity directly impacts safety and environmental protection.',
    levels: ['Single level - API 570 Authorized Piping Inspector'],
    requirements: ['Minimum education and experience requirements', 'Passing score on API 570 examination', 'Knowledge of ASME B31.3, API 570, API 574, API 571', 'Practical piping inspection experience'],
    examTopics: ['API 570 Code requirements', 'ASME B31.3 Process Piping', 'Piping materials and degradation', 'Welding and NDE for piping', 'Corrosion rate calculations', 'Minimum required thickness calculations'],
    validityPeriod: '3 years',
    issuingBody: 'American Petroleum Institute',
    relevantMethods: ['UT', 'RT', 'MT', 'PT', 'VT', 'GWT'],
  },
  {
    slug: 'api-653',
    name: 'API 653 Certification',
    abbreviation: 'API 653',
    description: 'Aboveground Storage Tank Inspector certification from API for tank inspection, repair, and alteration.',
    longDescription: 'API 653 certifies individuals as Tank Inspectors qualified to inspect, repair, alter, and reconstruct aboveground storage tanks. This certification is essential for the petroleum storage industry where tank integrity prevents environmental contamination and ensures worker safety.',
    levels: ['Single level - API 653 Authorized Tank Inspector'],
    requirements: ['Minimum education and experience requirements', 'Passing score on API 653 examination', 'Knowledge of API 653, API 650, API 651, API 652, API 571'],
    examTopics: ['API 653 Code requirements', 'API 650 Tank construction', 'Tank foundation and settlement', 'Bottom, shell, and roof inspection', 'Corrosion mechanisms in tanks', 'Tank repair and reconstruction'],
    validityPeriod: '3 years',
    issuingBody: 'American Petroleum Institute',
    relevantMethods: ['UT', 'MT', 'VT', 'MFL', 'AE'],
  },
  {
    slug: 'pcn-certification',
    name: 'PCN Certification',
    abbreviation: 'PCN',
    description: 'Personal Certification in NDT issued by BINDT in the UK, recognized internationally under EN ISO 9712.',
    longDescription: 'PCN (Personnel Certification in NDT) is the UK\'s leading NDT certification scheme, administered by the British Institute of Non-Destructive Testing (BINDT). It is accredited to EN ISO 9712 and is recognized internationally through multilateral agreements. PCN certification is widely respected in the UK, Middle East, Asia-Pacific, and many other regions.',
    levels: ['Level 1 - Basic practitioner under supervision', 'Level 2 - Independent practitioner', 'Level 3 - Expert responsible for NDT programs'],
    requirements: ['Minimum training at BINDT-approved center', 'Minimum experience hours', 'Written and practical examinations', 'Visual acuity requirements', 'Re-certification every 5 years'],
    examTopics: ['NDT method theory and principles', 'Equipment and technique selection', 'Interpretation and evaluation per standards', 'Report writing', 'Health and safety practices'],
    validityPeriod: '5 years with annual confirmation',
    issuingBody: 'British Institute of Non-Destructive Testing (BINDT)',
    relevantMethods: ['UT', 'RT', 'MT', 'PT', 'ET', 'VT', 'TOFD', 'PAUT'],
  },
];

export function getCertificationBySlug(slug: string): CertificationData | undefined {
  return certifications.find(c => c.slug === slug);
}

export function getAllCertificationSlugs(): string[] {
  return certifications.map(c => c.slug);
}

// Helper function for cost guide - may not be defined but included for type safety
export function getCityMethodBySlug(slug: string): MethodData | undefined {
  return methods.find(m => m.slug === slug);
}
