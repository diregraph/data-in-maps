import type { RegionMap, CountryToRegion, RegionPin } from "../types"

export const HISTORICAL_REGIONS: RegionMap = {
  british:    { name:"British Empire",        short:"British",       cont:"Empire", color:"#C84040", pop:"2,600M", pct:"32.3", desc:"The largest empire in history at its 1920 peak — covering a quarter of the world's land. Former British colonies include the world's two most populous nations (India and Bangladesh/Pakistan), plus the USA, Canada, Australia, Nigeria, and much of the Middle East. Its legacy shapes legal systems, languages, and institutions across every continent.", ctr:"India, USA, Pakistan, Bangladesh, Nigeria, Australia, Canada, UK, South Africa, Kenya, Malaysia" },
  french:     { name:"French Empire",         short:"French",        cont:"Empire", color:"#4478C0", pop:"560M",   pct:"7.0",  desc:"France's overseas empire spanned West and Equatorial Africa, North Africa (Algeria, Morocco, Tunisia), Indochina, and the Caribbean. The French language and legal tradition (Code civil) remain dominant across 29 countries; Francophone Africa's combined population is among the fastest-growing in the world.", ctr:"Algeria, Morocco, Vietnam, Cambodia, Senegal, Ivory Coast, Mali, Madagascar, Haiti, Lebanon, Syria" },
  spanish:    { name:"Spanish Empire",        short:"Spanish",       cont:"Empire", color:"#D09030", pop:"680M",   pct:"8.5",  desc:"Spain's American empire — the first truly global empire — transformed the Western Hemisphere from Mexico to Patagonia. 20 nations inherited the Spanish language, Catholicism, and civil law. The Philippines became Spain's only major Asian colony before passing to the USA in 1898.", ctr:"Mexico, Colombia, Argentina, Peru, Venezuela, Chile, Ecuador, Cuba, Philippines, Guatemala, Bolivia" },
  portuguese: { name:"Portuguese Empire",     short:"Portuguese",    cont:"Empire", color:"#60A850", pop:"280M",   pct:"3.5",  desc:"Portugal pioneered the Age of Discovery and established the first truly global trading empire. Brazil — now the world's 7th most populous nation — was the crown jewel, while Angola, Mozambique, and Guinea-Bissau were held until 1975. The Lusophone world stretches across five continents.", ctr:"Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé, East Timor" },
  ottoman:    { name:"Ottoman Empire",        short:"Ottoman",       cont:"Empire", color:"#9060B0", pop:"530M",   pct:"6.6",  desc:"The Ottoman Empire ruled the Middle East, North Africa, and Southeast Europe for six centuries (1299–1922). Its collapse after WWI remapped the modern Arab world — British and French mandates drew the borders of Iraq, Syria, Lebanon, Jordan, and Palestine, creating fault lines that persist today.", ctr:"Turkey, Egypt, Syria, Iraq, Saudi Arabia, Libya, Tunisia, Algeria, Greece, Bulgaria, Jordan, Lebanon" },
  dutch:      { name:"Dutch / Belgian / German", short:"Dutch/Belg/Ger", cont:"Empire", color:"#50A090", pop:"230M",   pct:"2.9",  desc:"Three smaller European empires whose colonial legacies endure. The Dutch VOC built the first truly corporate empire across Indonesia and South Africa. Belgium's brutal Congo Free State under Leopold II triggered early international human-rights advocacy. Germany's African colonies passed to Britain and France after WWI.", ctr:"Indonesia, DR Congo, Rwanda, Burundi, Namibia, Suriname, Tanzania (German E. Africa)" },
  never:      { name:"Never Colonized",       short:"Never Colonized",cont:"Empire", color:"#E8E4DC", pop:"1,700M", pct:"21.1", desc:"Countries that maintained sovereignty throughout the colonial era — either through military strength, strategic value as buffer states, or geographic isolation. Japan, China, Thailand, and Ethiopia are the most notable examples; each used treaties, modernisation, or diplomacy to resist formal colonisation.", ctr:"Japan, China, Thailand, Ethiopia, Liberia, Iran, Afghanistan, Nepal, Bhutan, Mongolia, Saudi Arabia" },
  other:      { name:"Other / Shared",        short:"Other",         cont:"Empire", color:"#B0A090", pop:"440M",   pct:"5.5",  desc:"Countries with complex multi-colonial histories or contested categorisation — including Italian Libya and Eritrea, Danish Greenland and Iceland, US Philippines and Puerto Rico, Russian Central Asia, and territories that passed between several empires before independence.", ctr:"Libya (Italian), Eritrea (Italian), South Korea (Japanese), Greenland (Danish), Puerto Rico (USA/Spanish)" },
}

export const HISTORICAL_C2R: CountryToRegion = {
  // British Empire
  356:"british",586:"british",50:"british",144:"british",462:"british",
  566:"british",404:"british",
  834:"british",800:"british",894:"british",716:"british",710:"british",
  426:"british",72:"british",748:"british",454:"british",
  288:"british",694:"british",270:"british",840:"british",124:"british",
  36:"british",554:"british",826:"british",388:"british",52:"british",
  780:"british",328:"british",84:"british",44:"british",659:"british",
  662:"british",670:"british",28:"british",308:"british",212:"british",
  242:"british",90:"british",598:"british",548:"british",
  296:"british",798:"british",520:"british",585:"british",480:"british",
  690:"british",458:"british",702:"british",96:"british",
  // French Empire
  12:"french",504:"french",788:"french",686:"french",384:"french",
  466:"french",854:"french",478:"french",562:"french",204:"french",
  768:"french",120:"french",140:"french",148:"french",178:"french",
  266:"french",450:"french",174:"french",262:"french",
  704:"french",116:"french",418:"french",
  760:"french",422:"french",
  332:"french",214:"french",
  258:"french",540:"french",
  // Spanish Empire
  484:"spanish",320:"spanish",340:"spanish",222:"spanish",558:"spanish",
  591:"spanish",188:"spanish",192:"spanish",170:"spanish",862:"spanish",
  218:"spanish",604:"spanish",68:"spanish",152:"spanish",32:"spanish",
  858:"spanish",600:"spanish",608:"spanish",226:"spanish",
  // Portuguese Empire
  76:"portuguese",24:"portuguese",508:"portuguese",132:"portuguese",
  624:"portuguese",678:"portuguese",626:"portuguese",
  // Ottoman Empire
  792:"ottoman",818:"ottoman",434:"ottoman",368:"ottoman",400:"ottoman",682:"ottoman",
  887:"ottoman",512:"ottoman",414:"ottoman",48:"ottoman",634:"ottoman",
  784:"ottoman",275:"ottoman",376:"ottoman",
  300:"ottoman",100:"ottoman",642:"ottoman",688:"ottoman",499:"ottoman",
  70:"ottoman",807:"ottoman",8:"ottoman",196:"ottoman",729:"ottoman",
  51:"ottoman",31:"ottoman",268:"ottoman",
  // Dutch / Belgian / German
  360:"dutch",180:"dutch",646:"dutch",108:"dutch",516:"dutch",
  740:"dutch",
  // Never colonized
  392:"never",156:"never",764:"never",231:"never",430:"never",
  364:"never",4:"never",524:"never",64:"never",496:"never",
  // Override: countries already assigned above — final/primary coloniser wins
  // Japan: never
  // China: never
  // Thailand: never
  // Ethiopia: never (brief Italian occupation only)
  // Iran: never
  // Saudi Arabia: Ottoman then British protectorate — ottoman
  // Afghanistan: never (British sphere, not colony)
  // Nepal: never (British protectorate)
  // Bhutan: never
  // Mongolia: never (Chinese/Soviet sphere)
  // Other / Shared
  410:"other",408:"other",304:"other",706:"other",
  // Remaining Pacific
  776:"other",882:"other",583:"other",584:"other",238:"other",
  // Kosovo
  383:"ottoman",
  // Timor-Leste — Portuguese
  // already set above (626:"portuguese")
}

export const HISTORICAL_PINS: RegionPin[] = [
  { id:"british",    lon:75,   lat:25  },
  { id:"french",     lon:5,    lat:14  },
  { id:"spanish",    lon:-68,  lat:-10 },
  { id:"portuguese", lon:-38,  lat:-10 },
  { id:"ottoman",    lon:36,   lat:34  },
  { id:"dutch",      lon:115,  lat:-4  },
  { id:"never",      lon:115,  lat:38  },
  { id:"other",      lon:128,  lat:36  },
]
