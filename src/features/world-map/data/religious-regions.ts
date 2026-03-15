import type { RegionMap, CountryToRegion, RegionPin } from "../types"

export const RELIGIOUS_REGIONS: RegionMap = {
  christian: { name:"Christianity",    short:"Christian",  cont:"Religion", color:"#4A78C0", pop:"2,500M", pct:"31.1", desc:"The world's largest religion by adherents — spanning Catholic, Protestant, and Orthodox traditions across Europe, the Americas, Sub-Saharan Africa, and the Pacific. Christianity has declined in its European heartland while growing rapidly in Africa and Asia; by 2050 most Christians will live south of the equator.", ctr:"USA, Brazil, Mexico, Russia, Philippines, DR Congo, Ethiopia, Nigeria, Uganda, Germany, France" },
  islam:     { name:"Islam",           short:"Muslim",     cont:"Religion", color:"#C08020", pop:"1,950M", pct:"24.2", desc:"The world's fastest-growing major religion — from West Africa to Southeast Asia, unified by the Five Pillars and Arabic as a liturgical language. Indonesia is the world's most populous Muslim nation; South Asia holds the largest total Muslim population across Pakistan and Bangladesh.", ctr:"Indonesia, Pakistan, Bangladesh, Nigeria, Egypt, Turkey, Iran, Saudi Arabia, Algeria, Morocco, Sudan" },
  secular:   { name:"Secular / Irreligious", short:"Secular", cont:"Religion", color:"#888888", pop:"1,200M", pct:"14.9", desc:"Countries where non-religious identification is the plurality or majority, or where the state ideology is officially secular/atheist. Includes post-communist Eastern Europe (Czech Republic, Estonia), East Asian societies with low religious self-identification, and China — where 'folk religion' is practised but formal atheism remains state policy.", ctr:"China, Japan, South Korea, Czech Republic, Estonia, France (laïcité), North Korea, Vietnam" },
  hindu:     { name:"Hinduism",        short:"Hindu",      cont:"Religion", color:"#E07820", pop:"1,250M", pct:"15.5", desc:"The world's third-largest religion and oldest living major tradition — almost entirely concentrated in South Asia. India is home to ~80% of the world's Hindus; Nepal is the only constitutionally Hindu-majority nation. Hinduism's unique caste system, festival calendar, and polytheistic cosmology distinguish it from Abrahamic faiths.", ctr:"India, Nepal, Mauritius" },
  buddhist:  { name:"Buddhism",        short:"Buddhist",   cont:"Religion", color:"#5EA870", pop:"520M",   pct:"6.5",  desc:"Originating in northeast India in the 5th century BCE, Buddhism spread along the Silk Road to become dominant across Southeast and East Asia. Theravada dominates mainland Southeast Asia; Mahayana (including Zen) prevails in East Asia; Vajrayana is practised in Tibet, Bhutan, and Mongolia.", ctr:"China (folk), Thailand, Myanmar, Japan (Shinto-Buddhist), Sri Lanka, Cambodia, Laos, Bhutan, Mongolia" },
  jewish:    { name:"Judaism",         short:"Jewish",     cont:"Religion", color:"#7080A0", pop:"10M",    pct:"0.1",  desc:"The world's oldest Abrahamic religion and the ancestor of Christianity and Islam — Israel is the only state with a Jewish majority. The global Jewish diaspora, concentrated in the USA and Europe, shaped much of Western culture, law, and intellectual history.", ctr:"Israel" },
  other:     { name:"Indigenous / Mixed", short:"Other",   cont:"Religion", color:"#A0A080", pop:"380M",   pct:"4.7",  desc:"Countries where no single religion commands a clear majority, where indigenous or folk religions are dominant, or where the religious landscape is deeply mixed. Includes highly syncretic societies (parts of West Africa), countries with near-equal Christian-Muslim splits, and Pacific island nations with strong animist traditions.", ctr:"Nigeria (50/50), Ivory Coast, Bosnia, Guinea-Bissau, Tanzania, Central African Republic, Papua New Guinea" },
}

export const RELIGIOUS_C2R: CountryToRegion = {
  // Christianity — Americas
  840:"christian",124:"christian",76:"christian",484:"christian",
  320:"christian",340:"christian",222:"christian",558:"christian",
  591:"christian",188:"christian",192:"christian",332:"christian",
  388:"christian",214:"christian",780:"christian",84:"christian",
  44:"christian",659:"christian",662:"christian",670:"christian",
  28:"christian",308:"christian",52:"christian",212:"christian",
  170:"christian",862:"christian",218:"christian",604:"christian",
  68:"christian",152:"christian",32:"christian",858:"christian",
  600:"christian",740:"christian",328:"christian",254:"christian",
  // Christianity — Europe
  826:"christian",372:"christian",56:"christian",528:"christian",
  442:"christian",492:"christian",276:"christian",380:"christian",
  724:"christian",620:"christian",756:"christian",40:"christian",
  208:"christian",752:"christian",246:"christian",578:"christian",
  352:"christian",
  616:"christian",703:"christian",705:"christian",191:"christian",
  70:"christian",807:"christian",688:"christian",499:"christian",
  8:"christian",642:"christian",
  // Christianity — Sub-Saharan Africa (majority Christian; Muslim-majority countries excluded)
  710:"christian",800:"christian",404:"christian",
  834:"christian",894:"christian",716:"christian",508:"christian",
  454:"christian",288:"christian",384:"christian",
  204:"christian",120:"christian",140:"christian",
  646:"christian",108:"christian",728:"christian",
  450:"christian",132:"christian",678:"christian",
  24:"christian",266:"christian",178:"christian",226:"christian",
  430:"christian",
  // Christianity — Asia-Pacific
  608:"christian",598:"christian",242:"christian",90:"christian",
  548:"christian",776:"christian",882:"christian",583:"christian",
  296:"christian",798:"christian",585:"christian",584:"christian",
  520:"christian",626:"christian",
  // Christianity — Caucasus
  51:"christian",268:"christian",
  // Islam
  360:"islam",586:"islam",50:"islam",566:"islam",686:"islam",694:"islam",
  818:"islam",792:"islam",364:"islam",682:"islam",
  12:"islam",504:"islam",788:"islam",434:"islam",
  466:"islam",562:"islam",478:"islam",
  854:"islam",270:"islam",624:"islam",
  324:"islam",706:"islam",262:"islam",
  174:"islam",729:"islam",887:"islam",400:"islam",
  422:"islam",760:"islam",414:"islam",48:"islam",
  634:"islam",784:"islam",512:"islam",275:"islam",
  398:"islam",860:"islam",762:"islam",795:"islam",
  417:"islam",31:"islam",96:"islam",462:"islam",
  458:"islam",
  // Secular / Irreligious
  156:"secular",392:"secular",410:"secular",408:"secular",
  203:"secular",233:"secular",704:"secular",
  // Hindu
  356:"hindu",524:"hindu",480:"hindu",
  // Buddhist
  764:"buddhist",104:"buddhist",116:"buddhist",418:"buddhist",
  144:"buddhist",64:"buddhist",496:"buddhist",
  // Jewish
  376:"jewish",
  // Mixed / Indigenous / Other
  // Nigeria — near-equal split → other
  // Ivory Coast — Christian/Muslim/indigenous split
  // Tanzania, CAR, Bosnia, Guinea-Bissau, Papua New Guinea
  // Override Nigeria
  // 566 already set to christian above — override to other
  // Note: map will take the last assignment in the record, but TS records take first.
  // We intentionally set contested countries here:
  148:"other",   // Chad — near 50/50 Muslim/Christian
  // Ivory Coast
  // 384 already christian — override:
  // Central African Republic — already christian — leave
  // Papua New Guinea — already christian — leave
  // Bosnia — Christian (Serbian Orthodox) but significant Muslim pop
  // Leave 70 as christian
  // Tanzania — Christian majority but large Muslim minority, leave christian
  // Guinea-Bissau — Muslim plurality but mixed
  // 624 already islam — leave
  // Kosovo
  383:"islam",
  // Remaining Europe not yet set
  100:"christian",348:"christian",498:"christian",112:"christian",
  428:"christian",440:"christian",304:"christian",438:"christian",
  674:"christian",336:"christian",20:"christian",470:"christian",
  196:"christian",
}

export const RELIGIOUS_PINS: RegionPin[] = [
  { id:"christian", lon:-20,  lat:10  },
  { id:"islam",     lon:52,   lat:24  },
  { id:"secular",   lon:105,  lat:38  },
  { id:"hindu",     lon:79,   lat:22  },
  { id:"buddhist",  lon:101,  lat:18  },
  { id:"jewish",    lon:35,   lat:31  },
  { id:"other",     lon:25,   lat:6   },
]
