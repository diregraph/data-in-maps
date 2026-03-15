import type { RegionMap, CountryToRegion, RegionPin } from "../types"

export const ECOLOGICAL_REGIONS: RegionMap = {
  tropical:    { name:"Tropical",              short:"Tropical",       cont:"Climate", color:"#2E9840", pop:"1,400M", pct:"17.4", desc:"The equatorial belt within roughly 15° of the equator — perpetually warm, high rainfall year-round. Hosts over half of Earth's terrestrial biodiversity in rainforests, mangroves, and coral systems. Includes the Amazon Basin, Congo Basin, and Maritime Southeast Asia — regions under intense deforestation pressure.", ctr:"Brazil, DR Congo, Indonesia, Colombia, Nigeria, Venezuela, Peru, Cameroon, Malaysia, Ecuador, Papua New Guinea" },
  subtropical: { name:"Subtropical / Monsoon", short:"Subtropical",    cont:"Climate", color:"#90B830", pop:"2,800M", pct:"34.8", desc:"Tropical savanna and monsoon zones with a pronounced dry season — the most densely populated climate on Earth. Includes South and Southeast Asia's monsoon belt, tropical Africa's savanna, and the Caribbean. Seasonal rainfall drives agricultural cycles for billions of smallholder farmers.", ctr:"India, Bangladesh, Pakistan, Thailand, Vietnam, Ethiopia, Philippines, Tanzania, Ghana, Myanmar, Mexico" },
  arid:        { name:"Arid / Desert",          short:"Arid",           cont:"Climate", color:"#D0A840", pop:"780M",   pct:"9.7",  desc:"Hot and cold deserts together cover about a third of Earth's land surface but support only ~10% of the population. The Sahara, Arabian Peninsula, Australian Outback, Atacama, and Central Asian deserts share extreme aridity. Groundwater scarcity and desertification are the defining resource challenges.", ctr:"Algeria, Libya, Saudi Arabia, Egypt, Iran, Namibia, Kazakhstan, Chile (Atacama), Peru (coast), Mongolia, Australia (interior)" },
  mediterr:    { name:"Mediterranean",          short:"Mediterranean",  cont:"Climate", color:"#E0C060", pop:"500M",   pct:"6.2",  desc:"Warm, dry summers and mild, wet winters — one of the most climate-stable biomes. Found on five continents around 30–45° latitude: the Mediterranean Basin, California, Chile's Central Valley, South Africa's Cape, and SW Australia. Extremely high plant endemism; birthplace of cereal agriculture and three major world religions.", ctr:"Spain, Italy, France (south), Greece, Turkey (coast), Morocco, Israel, California (USA), Chile, South Africa (Cape), Australia (SW)" },
  temperate:   { name:"Temperate / Oceanic",    short:"Temperate",      cont:"Climate", color:"#5888C0", pop:"560M",   pct:"7.0",  desc:"Year-round precipitation, mild temperatures, and no persistent dry season — shaped by prevailing westerly winds off oceans. Covers much of Northwest and Central Europe, the Pacific Northwest, southern Chile, New Zealand, and parts of southern Australia. Historically the cradle of industrialisation.", ctr:"UK, Germany, France, Netherlands, Ireland, New Zealand, Chile (Patagonia), Belgium, Austria, Switzerland" },
  continental: { name:"Continental / Boreal",   short:"Continental",   cont:"Climate", color:"#8068A8", pop:"450M",   pct:"5.6",  desc:"Extreme seasonal swings with cold winters and warm summers; the boreal forest (taiga) is the world's largest terrestrial biome. Russia, Canada, Scandinavia, and northern China dominate. Vast permafrost stores are now thawing rapidly, releasing methane — a critical feedback loop in the global climate system.", ctr:"Russia, Canada, Sweden, Finland, Norway, Poland, Belarus, Ukraine, Kazakhstan (north), China (northeast), North Korea" },
  polar:       { name:"Polar / Tundra / Alpine", short:"Polar / Alpine", cont:"Climate", color:"#B0C8E0", pop:"15M",    pct:"0.2",  desc:"Regions where no month averages above 10 °C — characterised by permafrost, treeless tundra, and ice sheets. Very few sovereign populations live here year-round; Iceland and northernmost Scandinavia are the main examples. High-altitude alpine zones (Himalayas, Andes, Tibetan Plateau) share similar ecology despite lower latitudes.", ctr:"Iceland, Greenland, Arctic Norway (Svalbard), northern Canada, Alaska (USA), Nepal and Bhutan (alpine)" },
}

export const ECOLOGICAL_C2R: CountryToRegion = {
  // Tropical (dominant tropical rainforest / equatorial climate)
  76:"tropical",180:"tropical",360:"tropical",170:"tropical",
  566:"tropical",862:"tropical",604:"tropical",120:"tropical",
  458:"tropical",218:"tropical",598:"tropical",90:"tropical",
  548:"tropical",226:"tropical",266:"tropical",178:"tropical",
  174:"tropical",678:"tropical",800:"tropical",
  // Subtropical / Monsoon (tropical savanna, monsoon, humid subtropical)
  356:"subtropical",50:"subtropical",586:"subtropical",764:"subtropical",
  704:"subtropical",231:"subtropical",608:"subtropical",834:"subtropical",
  288:"subtropical",104:"subtropical",484:"subtropical",
  886:"subtropical",
  404:"subtropical",454:"subtropical",508:"subtropical",
  624:"subtropical",694:"subtropical",430:"subtropical",270:"subtropical",
  770:"subtropical",768:"subtropical",204:"subtropical",
  686:"subtropical",466:"subtropical",562:"subtropical",
  148:"subtropical",140:"subtropical",
  // Arid / Desert
  12:"arid",434:"arid",818:"arid",682:"arid",784:"arid",
  887:"arid",512:"arid",414:"arid",48:"arid",634:"arid",
  729:"arid",706:"arid",232:"arid",262:"arid",732:"arid",
  364:"arid",4:"arid",795:"arid",398:"arid",
  516:"arid",504:"arid",788:"arid",72:"arid",478:"arid",
  854:"arid",
  // Mediterranean (dominant Mediterranean Cs climate)
  724:"mediterr",380:"mediterr",300:"mediterr",620:"mediterr",
  196:"mediterr",376:"mediterr",400:"mediterr",422:"mediterr",
  792:"mediterr",
  // Temperate / Oceanic
  826:"temperate",276:"temperate",250:"temperate",528:"temperate",
  56:"temperate",372:"temperate",442:"temperate",492:"temperate",
  756:"temperate",40:"temperate",554:"temperate",238:"temperate",
  // Continental / Boreal
  643:"continental",124:"continental",752:"continental",246:"continental",
  578:"continental",616:"continental",804:"continental",112:"continental",
  642:"continental",100:"continental",203:"continental",703:"continental",
  348:"continental",498:"continental",428:"continental",233:"continental",
  440:"continental",705:"continental",191:"continental",
  156:"continental",408:"continental",158:"continental",760:"arid",
  // Eastern Europe remainder
  70:"continental",807:"continental",688:"continental",499:"continental",
  8:"continental",383:"continental",
  // Polar / Tundra / Alpine
  352:"polar",304:"polar",
  524:"polar",64:"polar",
  // Oceania — assign to subtropical or temperate by dominant zone
  36:"temperate",242:"subtropical",776:"subtropical",882:"subtropical",
  583:"subtropical",296:"subtropical",798:"subtropical",
  585:"subtropical",584:"subtropical",520:"subtropical",
  // Remainder Asia
  116:"subtropical",418:"subtropical",144:"subtropical",
  702:"subtropical",96:"subtropical",410:"subtropical",
  462:"subtropical",626:"subtropical",
  // Middle East not yet assigned
  368:"arid",275:"arid",
  // Caucasus
  51:"continental",268:"continental",31:"continental",
  417:"continental",762:"continental",860:"continental",
  // West Africa remaining
  324:"subtropical",384:"subtropical",
  // Southern Africa
  710:"mediterr",748:"subtropical",426:"subtropical",
  894:"subtropical",716:"subtropical",
  // Caribbean
  192:"subtropical",332:"subtropical",388:"subtropical",214:"subtropical",
  780:"subtropical",84:"subtropical",44:"subtropical",28:"subtropical",
  308:"subtropical",52:"subtropical",659:"subtropical",662:"subtropical",
  670:"subtropical",212:"subtropical",254:"subtropical",
  740:"subtropical",328:"subtropical",
  // South America remainder
  32:"temperate",152:"temperate",858:"temperate",600:"subtropical",
  68:"subtropical",
  // Remaining Europe
  208:"temperate",
  // Iceland already polar above
  // Norway — temperate on coast
  // Sweden, Finland — continental
  // Japan — subtropical (Honshu) dominant
  392:"subtropical",
  // Mongolia
  496:"continental",
  // Kazakhstan — arid/continental split — arid dominant
  // Turkmenistan, Uzbekistan — arid
  // Tajikistan, Kyrgyzstan — continental/alpine
}

export const ECOLOGICAL_PINS: RegionPin[] = [
  { id:"tropical",    lon:20,   lat:-2  },
  { id:"subtropical", lon:80,   lat:18  },
  { id:"arid",        lon:28,   lat:24  },
  { id:"mediterr",    lon:14,   lat:38  },
  { id:"temperate",   lon:8,    lat:52  },
  { id:"continental", lon:58,   lat:58  },
  { id:"polar",       lon:-18,  lat:65  },
]
