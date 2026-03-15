import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react"
import * as d3 from "d3"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ─── DATA ─────────────────────────────────────────────────────────────────────

const WORLD_REGIONS = {
  na:   { name:"North America",           short:"N. America",       cont:"Americas",        color:"#3D8FCC", pop:"595M",    pct:"7.4",   desc:"Highly developed economies spanning Arctic tundra to tropical islands; home to the world's largest national economy and a global hub for technology, finance, and innovation.",              ctr:"USA, Canada, Mexico, Cuba, Dominican Republic, Guatemala, Jamaica, Trinidad & Tobago" },
  sa:   { name:"South America",           short:"S. America",       cont:"Americas",        color:"#5A9E2F", pop:"440M",    pct:"5.5",   desc:"A continent of extraordinary biodiversity — Amazon rainforest, Andean peaks, Patagonian steppe — alongside rapidly urbanising economies and a growing middle class.",                   ctr:"Brazil, Colombia, Argentina, Peru, Venezuela, Chile, Ecuador, Bolivia, Paraguay" },
  we:   { name:"Western Europe",          short:"W. Europe",        cont:"Europe",          color:"#7168D0", pop:"420M",    pct:"5.2",   desc:"The EU's economic core; highly developed post-industrial economies with robust social welfare systems, strong democratic institutions, and deep cultural heritage.",                         ctr:"Germany, France, UK, Italy, Spain, Netherlands, Belgium, Switzerland, Sweden, Norway" },
  ee:   { name:"E. Europe & Russia",      short:"E. Europe / Russia",cont:"Europe & Asia",  color:"#1A9068", pop:"390M",    pct:"4.8",   desc:"Spanning the Eurasian landmass from the Baltic to the Pacific; includes the world's largest country by area and major post-communist transition economies.",                            ctr:"Russia, Ukraine, Poland, Romania, Czech Republic, Belarus, Hungary, Bulgaria, Greece" },
  mena: { name:"Middle East & N. Africa", short:"MENA",             cont:"Africa & W. Asia",color:"#C07820", pop:"620M",    pct:"7.7",   desc:"Cradle of three major world religions and home to the world's largest oil and gas reserves; a critical geopolitical crossroads linking Africa, Asia, and Europe.",                 ctr:"Turkey, Iran, Saudi Arabia, Egypt, Iraq, Algeria, Morocco, UAE, Syria, Israel" },
  ssa:  { name:"Sub-Saharan Africa",       short:"Sub-Sah. Africa",  cont:"Africa",          color:"#CC4E28", pop:"1,150M", pct:"14.3",  desc:"Fastest-growing region by population with the world's youngest demographic; extraordinarily rich in biodiversity, minerals, and natural resources — set to double by mid-century.", ctr:"Nigeria, Ethiopia, DR Congo, Tanzania, Kenya, Uganda, South Africa, Mozambique, Ghana" },
  sas:  { name:"South Asia",              short:"South Asia",       cont:"Asia",            color:"#D04040", pop:"2,000M", pct:"24.8",  desc:"Home to nearly a quarter of humanity; ancient civilisations alongside one of the world's fastest-growing major economies — India is now the most populous nation on Earth.",     ctr:"India, Pakistan, Bangladesh, Afghanistan, Nepal, Sri Lanka, Bhutan, Maldives" },
  eas:  { name:"East & SE Asia",          short:"E. & SE Asia",     cont:"Asia",            color:"#C04878", pop:"2,350M", pct:"29.2",  desc:"The world's manufacturing powerhouse and technology hub — nearly a third of humanity, from China and Japan to the dynamic ASEAN economies of Southeast Asia.",                      ctr:"China, Indonesia, Japan, Philippines, Vietnam, Thailand, South Korea, Myanmar, Malaysia" },
  cas:  { name:"Central Asia",            short:"C. Asia",          cont:"Asia",            color:"#7A7870", pop:"75M",    pct:"0.9",   desc:"Landlocked post-Soviet republics rich in energy resources; the historic Silk Road crossroads bridging Europe, China, and South Asia with vast untapped economic potential.",  ctr:"Uzbekistan, Kazakhstan, Tajikistan, Kyrgyzstan, Turkmenistan" },
  oc:   { name:"Oceania",                 short:"Oceania",          cont:"Oceania",         color:"#2EAA8F", pop:"45M",    pct:"0.6",   desc:"Highly developed Australasia paired with small Pacific island states facing existential climate threats; a vast oceanic region of extraordinary cultural and ecological diversity.", ctr:"Australia, New Zealand, Papua New Guinea, Fiji, Solomon Islands, Vanuatu, Samoa" },
}

const WORLD_C2R = {
  840:"na",124:"na",484:"na",192:"na",332:"na",388:"na",214:"na",320:"na",222:"na",340:"na",558:"na",591:"na",188:"na",84:"na",659:"na",662:"na",780:"na",28:"na",308:"na",52:"na",44:"na",670:"na",
  76:"sa",32:"sa",152:"sa",170:"sa",604:"sa",862:"sa",858:"sa",600:"sa",68:"sa",218:"sa",740:"sa",328:"sa",254:"sa",238:"sa",
  826:"we",250:"we",276:"we",380:"we",724:"we",528:"we",56:"we",756:"we",40:"we",620:"we",372:"we",208:"we",752:"we",246:"we",578:"we",352:"we",442:"we",492:"we",
  643:"ee",616:"ee",203:"ee",703:"ee",348:"ee",642:"ee",100:"ee",804:"ee",112:"ee",428:"ee",233:"ee",440:"ee",498:"ee",8:"ee",705:"ee",191:"ee",70:"ee",807:"ee",688:"ee",499:"ee",300:"ee",383:"ee",
  818:"mena",682:"mena",364:"mena",368:"mena",788:"mena",504:"mena",12:"mena",434:"mena",400:"mena",422:"mena",760:"mena",792:"mena",784:"mena",887:"mena",512:"mena",275:"mena",376:"mena",414:"mena",48:"mena",729:"mena",51:"mena",31:"mena",268:"mena",196:"mena",634:"mena",
  566:"ssa",231:"ssa",180:"ssa",710:"ssa",800:"ssa",404:"ssa",834:"ssa",508:"ssa",174:"ssa",454:"ssa",288:"ssa",384:"ssa",686:"ssa",516:"ssa",426:"ssa",72:"ssa",748:"ssa",694:"ssa",204:"ssa",854:"ssa",466:"ssa",478:"ssa",562:"ssa",768:"ssa",120:"ssa",140:"ssa",148:"ssa",706:"ssa",646:"ssa",108:"ssa",716:"ssa",728:"ssa",894:"ssa",232:"ssa",262:"ssa",270:"ssa",624:"ssa",226:"ssa",266:"ssa",178:"ssa",450:"ssa",480:"ssa",
  356:"sas",586:"sas",50:"sas",144:"sas",524:"sas",64:"sas",4:"sas",462:"sas",
  156:"eas",392:"eas",410:"eas",408:"eas",496:"eas",764:"eas",704:"eas",360:"eas",458:"eas",608:"eas",418:"eas",116:"eas",104:"eas",702:"eas",96:"eas",626:"eas",158:"eas",
  398:"cas",762:"cas",860:"cas",795:"cas",417:"cas",
  36:"oc",554:"oc",598:"oc",242:"oc",90:"oc",548:"oc",776:"oc",882:"oc",540:"oc",583:"oc",296:"oc",798:"oc",258:"oc",585:"oc",584:"oc",520:"oc",
}

const WORLD_PINS = [
  {id:"na",lon:-100,lat:44},{id:"sa",lon:-56,lat:-14},{id:"we",lon:8,lat:51},
  {id:"ee",lon:72,lat:63},{id:"mena",lon:42,lat:28},{id:"ssa",lon:22,lat:0},
  {id:"sas",lon:79,lat:22},{id:"eas",lon:115,lat:36},{id:"cas",lon:62,lat:44},
  {id:"oc",lon:134,lat:-27},
]

const UN_REGIONS = {
  "un-na":  { name:"Northern Africa",    short:"N. Africa",  cont:"Africa",   color:"#C8925E", pop:"255M",   pct:"3.2",   desc:"Mediterranean and Saharan north; Islam-dominant cultures with major oil, gas, and phosphate reserves. Historically linked to Europe by trade routes and to Sub-Saharan Africa across the Sahara.",          ctr:"Egypt, Algeria, Morocco, Sudan, Tunisia, Libya" },
  "un-wa":  { name:"Western Africa",     short:"W. Africa",  cont:"Africa",   color:"#9A5225", pop:"435M",   pct:"5.4",   desc:"Nigeria anchors this fast-growing sub-region. Tropical coasts and Sahel interior; one of the world's youngest demographics with explosive urbanisation and rapid economic growth.",                        ctr:"Nigeria, Ghana, Senegal, Mali, Côte d'Ivoire, Niger, Burkina Faso, Guinea, Cameroon" },
  "un-ma":  { name:"Middle Africa",      short:"Mid. Africa",cont:"Africa",   color:"#723D12", pop:"205M",   pct:"2.5",   desc:"Equatorial rainforest heartland centred on the Congo Basin; vast mineral wealth largely untapped. DR Congo alone covers an area larger than Western Europe.",                                                 ctr:"DR Congo, Cameroon, Angola, Chad, Central African Republic, Republic of Congo, Gabon" },
  "un-ea":  { name:"Eastern Africa",     short:"E. Africa",  cont:"Africa",   color:"#DDB070", pop:"490M",   pct:"6.1",   desc:"Great Rift Valley nations with extraordinary biodiversity; some of Africa's fastest-growing economies. Ethiopia is the continent's second most populous country.",                                           ctr:"Ethiopia, Tanzania, Kenya, Uganda, Mozambique, Rwanda, Somalia, Zambia, Zimbabwe, Madagascar" },
  "un-sa":  { name:"Southern Africa",    short:"S. Africa",  cont:"Africa",   color:"#5E3010", pop:"72M",    pct:"0.9",   desc:"Southernmost sub-region; South Africa has the continent's most industrialised economy. Rich in diamonds, gold, platinum, and coal; Namibia holds major uranium deposits.",                               ctr:"South Africa, Namibia, Botswana, Lesotho, Eswatini" },
  "un-nan": { name:"Northern America",   short:"N. America", cont:"Americas", color:"#6898B8", pop:"385M",   pct:"4.8",   desc:"USA and Canada form one of the world's largest economic zones, with vast Greenland representing a major Arctic territory. High-income, technology-driven societies; major global immigrant destinations.", ctr:"USA, Canada, Greenland" },
  "un-car": { name:"Caribbean",          short:"Caribbean",  cont:"Americas", color:"#90BCCE", pop:"45M",    pct:"0.6",   desc:"Archipelago of island nations; tourism-dependent economies with rich Afro-Caribbean, European, and indigenous cultural heritages.",                                                                           ctr:"Cuba, Haiti, Dominican Republic, Jamaica, Trinidad & Tobago", labelSkip:true },
  "un-cam": { name:"Central America",    short:"C. America", cont:"Americas", color:"#3E6E98", pop:"185M",   pct:"2.3",   desc:"Bridge between North and South America; Mexico alone accounts for over 130 million people. Rapid urbanisation and deep economic integration with North America.",                                             ctr:"Mexico, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama, Belize" },
  "un-sam": { name:"South America",      short:"S. America", cont:"Americas", color:"#224E72", pop:"440M",   pct:"5.5",   desc:"Brazil holds nearly half the sub-continent's population. From the Amazon basin to Patagonian steppe; growing regional economies with expanding middle classes.",                                            ctr:"Brazil, Colombia, Argentina, Peru, Venezuela, Chile, Ecuador, Bolivia, Paraguay" },
  "un-cas": { name:"Central Asia",       short:"C. Asia",    cont:"Asia",     color:"#7EA888", pop:"80M",    pct:"1.0",   desc:"Five landlocked post-Soviet republics; major exporters of oil, gas, and minerals. The historic Silk Road crossroads at the intersection of Russia, China, and South Asia.",                                ctr:"Uzbekistan, Kazakhstan, Tajikistan, Kyrgyzstan, Turkmenistan" },
  "un-eas": { name:"Eastern Asia",       short:"E. Asia",    cont:"Asia",     color:"#3A7E62", pop:"1,680M", pct:"20.9",  desc:"China, Japan, and the Koreas form one of the world's great economic and technological clusters — advanced manufacturing, cutting-edge research, and ancient civilisations.",                              ctr:"China, Japan, South Korea, North Korea, Mongolia, Taiwan" },
  "un-sea": { name:"South-Eastern Asia", short:"SE Asia",    cont:"Asia",     color:"#2A6048", pop:"690M",   pct:"8.6",   desc:"ASEAN's 11 dynamic economies bridging the Indian and Pacific Oceans. Indonesia is the world's 4th most populous nation; a rising global manufacturing and tech hub.",                                   ctr:"Indonesia, Philippines, Vietnam, Thailand, Myanmar, Malaysia, Cambodia, Singapore, Laos" },
  "un-sas": { name:"Southern Asia",      short:"S. Asia",    cont:"Asia",     color:"#62987A", pop:"2,000M", pct:"24.8",  desc:"Home to nearly a quarter of humanity; India is now the world's most populous nation. Ancient civilisations, nuclear-armed states, and one of the fastest-growing major economies globally.",             ctr:"India, Pakistan, Bangladesh, Afghanistan, Nepal, Sri Lanka, Bhutan, Maldives" },
  "un-was": { name:"Western Asia",       short:"W. Asia",    cont:"Asia",     color:"#225E4A", pop:"320M",   pct:"4.0",   desc:"Encompasses the traditional Middle East plus the Caucasus; home to the world's largest proven oil reserves. Cradle of three major world religions — Judaism, Christianity, and Islam.",                 ctr:"Turkey, Iran, Saudi Arabia, Iraq, Yemen, Syria, UAE, Israel, Jordan, Georgia, Armenia, Azerbaijan" },
  "un-ne":  { name:"Northern Europe",    short:"N. Europe",  cont:"Europe",   color:"#8888C0", pop:"105M",   pct:"1.3",   desc:"Nordic and Baltic nations renowned for innovation, social welfare, and high living standards. The UK anchors this sub-region; Nordic countries lead global sustainability indices.",                     ctr:"UK, Sweden, Norway, Denmark, Finland, Ireland, Estonia, Latvia, Lithuania, Iceland" },
  "un-we":  { name:"Western Europe",     short:"W. Europe",  cont:"Europe",   color:"#6058A8", pop:"195M",   pct:"2.4",   desc:"Core of the European Union; Germany and France are the continental powerhouses. Rich cultural heritage and advanced post-industrial, services-led economies with strong democratic institutions.",      ctr:"Germany, France, Netherlands, Belgium, Austria, Switzerland, Luxembourg" },
  "un-ee":  { name:"Eastern Europe",     short:"E. Europe",  cont:"Europe",   color:"#9890CC", pop:"295M",   pct:"3.7",   desc:"From the Baltic to the Black Sea; Russia spans this sub-region and the full breadth of northern Asia. Post-communist transition economies at varying stages of development.",                           ctr:"Russia, Ukraine, Poland, Romania, Czech Republic, Belarus, Hungary, Slovakia, Bulgaria" },
  "un-se":  { name:"Southern Europe",    short:"S. Europe",  cont:"Europe",   color:"#403890", pop:"155M",   pct:"1.9",   desc:"Mediterranean Europe and the cradle of Western civilisation in Greece and Rome. Significant tourism-driven economies and major gateways to Africa and the Middle East.",                               ctr:"Italy, Spain, Portugal, Greece, Serbia, Croatia, Bosnia & Herzegovina, Albania, Slovenia" },
  "un-anz": { name:"Aus. & New Zealand", short:"Aus. / NZ",  cont:"Oceania",  color:"#A86868", pop:"33M",    pct:"0.4",   desc:"Two highly developed English-speaking democracies in the South Pacific; multicultural societies with strong ties to Asia and significant Indigenous populations.",                                         ctr:"Australia, New Zealand" },
  "un-mel": { name:"Melanesia",          short:"Melanesia",  cont:"Oceania",  color:"#906068", pop:"12M",    pct:"0.1",   desc:"From New Guinea to Fiji; Papua New Guinea is Oceania's most populous nation outside Australasia. Extraordinary linguistic diversity — PNG alone has over 800 distinct languages.",                     ctr:"Papua New Guinea, Fiji, Solomon Islands, Vanuatu, New Caledonia" },
  "un-mic": { name:"Micronesia",         short:"Micronesia", cont:"Oceania",  color:"#C09090", pop:"0.6M",   pct:"<0.1", desc:"Scattered small island nations north of Melanesia; low-lying atolls among the most vulnerable to sea-level rise. Strategic Pacific location historically tied to US military presence.",                ctr:"Fed. States of Micronesia, Kiribati, Marshall Islands, Nauru, Palau", labelSkip:true },
  "un-pol": { name:"Polynesia",          short:"Polynesia",  cont:"Oceania",  color:"#785060", pop:"0.7M",   pct:"<0.1", desc:"The vast oceanic triangle from New Zealand to Hawaii to Easter Island; remarkable seafaring heritage spanning millennia. Small island states acutely threatened by rising seas.",                          ctr:"Samoa, Tonga, Cook Islands, French Polynesia, Tuvalu, Niue", labelSkip:true },
}

const UN_C2R = {
  12:"un-na",818:"un-na",434:"un-na",504:"un-na",729:"un-na",788:"un-na",732:"un-na",
  204:"un-wa",854:"un-wa",132:"un-wa",384:"un-wa",270:"un-wa",288:"un-wa",324:"un-wa",624:"un-wa",430:"un-wa",466:"un-wa",478:"un-wa",562:"un-wa",566:"un-wa",686:"un-wa",694:"un-wa",768:"un-wa",
  24:"un-ma",120:"un-ma",140:"un-ma",148:"un-ma",178:"un-ma",180:"un-ma",226:"un-ma",266:"un-ma",
  108:"un-ea",174:"un-ea",262:"un-ea",232:"un-ea",231:"un-ea",404:"un-ea",450:"un-ea",454:"un-ea",480:"un-ea",508:"un-ea",646:"un-ea",706:"un-ea",728:"un-ea",834:"un-ea",800:"un-ea",894:"un-ea",716:"un-ea",
  72:"un-sa",748:"un-sa",426:"un-sa",516:"un-sa",710:"un-sa",
  124:"un-nan",304:"un-nan",840:"un-nan",
  28:"un-car",52:"un-car",192:"un-car",212:"un-car",214:"un-car",308:"un-car",332:"un-car",388:"un-car",659:"un-car",662:"un-car",670:"un-car",780:"un-car",44:"un-car",
  84:"un-cam",188:"un-cam",222:"un-cam",320:"un-cam",340:"un-cam",484:"un-cam",558:"un-cam",591:"un-cam",
  32:"un-sam",68:"un-sam",76:"un-sam",152:"un-sam",170:"un-sam",218:"un-sam",238:"un-sam",254:"un-sam",328:"un-sam",600:"un-sam",604:"un-sam",740:"un-sam",858:"un-sam",862:"un-sam",
  398:"un-cas",417:"un-cas",762:"un-cas",795:"un-cas",860:"un-cas",
  156:"un-eas",392:"un-eas",408:"un-eas",410:"un-eas",496:"un-eas",158:"un-eas",
  96:"un-sea",116:"un-sea",360:"un-sea",418:"un-sea",458:"un-sea",104:"un-sea",608:"un-sea",702:"un-sea",764:"un-sea",626:"un-sea",704:"un-sea",
  4:"un-sas",50:"un-sas",64:"un-sas",356:"un-sas",462:"un-sas",524:"un-sas",586:"un-sas",144:"un-sas",
  51:"un-was",31:"un-was",48:"un-was",196:"un-was",268:"un-was",364:"un-was",368:"un-was",376:"un-was",400:"un-was",414:"un-was",422:"un-was",512:"un-was",275:"un-was",634:"un-was",682:"un-was",760:"un-was",792:"un-was",784:"un-was",887:"un-was",
  208:"un-ne",233:"un-ne",246:"un-ne",352:"un-ne",372:"un-ne",428:"un-ne",440:"un-ne",578:"un-ne",752:"un-ne",826:"un-ne",
  40:"un-we",56:"un-we",250:"un-we",276:"un-we",442:"un-we",492:"un-we",528:"un-we",756:"un-we",
  112:"un-ee",100:"un-ee",203:"un-ee",348:"un-ee",498:"un-ee",616:"un-ee",642:"un-ee",643:"un-ee",703:"un-ee",804:"un-ee",
  8:"un-se",20:"un-se",70:"un-se",191:"un-se",300:"un-se",380:"un-se",470:"un-se",499:"un-se",807:"un-se",620:"un-se",674:"un-se",688:"un-se",705:"un-se",724:"un-se",383:"un-se",
  36:"un-anz",554:"un-anz",
  242:"un-mel",540:"un-mel",598:"un-mel",90:"un-mel",548:"un-mel",
  583:"un-mic",296:"un-mic",584:"un-mic",520:"un-mic",585:"un-mic",580:"un-mic",
  882:"un-pol",776:"un-pol",798:"un-pol",258:"un-pol",
}

const UN_PINS = [
  {id:"un-na",lon:20,lat:26},{id:"un-wa",lon:-3,lat:12},
  {id:"un-ma",lon:22,lat:2},{id:"un-ea",lon:37,lat:5},
  {id:"un-sa",lon:25,lat:-27},{id:"un-nan",lon:-100,lat:50},
  {id:"un-cam",lon:-90,lat:17},{id:"un-sam",lon:-56,lat:-14},
  {id:"un-cas",lon:62,lat:43},{id:"un-eas",lon:108,lat:38},
  {id:"un-sea",lon:113,lat:10},{id:"un-sas",lon:79,lat:22},
  {id:"un-was",lon:42,lat:32},{id:"un-ne",lon:15,lat:60},
  {id:"un-we",lon:8,lat:48},{id:"un-ee",lon:40,lat:56},
  {id:"un-se",lon:15,lat:42},{id:"un-anz",lon:140,lat:-30},
  {id:"un-mel",lon:148,lat:-7},
]

const FRAMEWORKS = {
  world: { label:"World Regions",  desc:"10 broad world regions",  regions:WORLD_REGIONS, c2r:WORLD_C2R, pins:WORLD_PINS },
  un:    { label:"UN Geoscheme",   desc:"22 UN official sub-regions", regions:UN_REGIONS,    c2r:UN_C2R,    pins:UN_PINS },
}

const COMING_SOON = [
  { value:"cultural",    label:"Cultural / Civilizational" },
  { value:"geopolitical",label:"Political / Geopolitical" },
  { value:"historical",  label:"Historical / Colonial" },
  { value:"religious",   label:"Religious / Linguistic" },
  { value:"ecological",  label:"Environmental / Ecological" },
]

const CONTINENT_ORDER = ["Africa","Americas","Asia","Europe","Oceania"]

// ─── GEO SETUP ────────────────────────────────────────────────────────────────
const projection = d3.geoNaturalEarth1().scale(153).translate([480,250])
const pathGen    = d3.geoPath().projection(projection)
const SPHERE     = {type:"Sphere"}
const GRATICULE  = d3.geoGraticule()()

// ─── MAP COMPONENT ────────────────────────────────────────────────────────────
const WorldMapSVG = memo(function WorldMapSVG({ framework, selectedRegion, onRegionSelect, onCountryHover, onCountryLeave }) {
  const [geo, setGeo]         = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [topo, world] = await Promise.all([
          import("https://esm.sh/topojson-client@3"),
          d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),
        ])
        if (!cancelled) {
          setGeo({
            countries: topo.feature(world, world.objects.countries).features,
            borders:   topo.mesh(world, world.objects.countries, (a,b) => a !== b),
          })
        }
      } catch { if (!cancelled) setError(true) }
      finally  { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const spherePath   = useMemo(() => pathGen(SPHERE), [])
  const gratPath     = useMemo(() => pathGen(GRATICULE), [])
  const bordersPath  = useMemo(() => geo ? pathGen(geo.borders) : "", [geo])

  const { c2r, regions, pins } = FRAMEWORKS[framework]

  if (loading) return (
    <div className="flex items-center justify-center" style={{height:300}}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">Loading world map…</span>
      </div>
    </div>
  )
  if (error) return (
    <div className="flex items-center justify-center" style={{height:300}}>
      <span className="text-sm text-muted-foreground">Could not load map data. Check your connection.</span>
    </div>
  )

  return (
    <svg width="100%" viewBox="0 0 960 500" style={{display:"block"}}>
      <path d={spherePath} fill="#D4E8F5" stroke="#A8CCE0" strokeWidth="0.7" />
      <path d={gratPath}   fill="none"   stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />

      {geo.countries.map(f => {
        const rid    = c2r[+f.id]
        const reg    = rid ? regions[rid] : null
        const d      = pathGen(f)
        if (!d) return null
        const isSel  = selectedRegion === rid
        return (
          <path
            key={f.id}
            d={d}
            fill={reg ? reg.color : "#D8D4CC"}
            opacity={isSel ? 1 : reg ? 0.78 : 0.4}
            stroke={isSel ? "rgba(255,255,255,0.9)" : "none"}
            strokeWidth={isSel ? 1 : 0}
            style={{ cursor: reg ? "pointer" : "default", transition: "opacity 0.12s" }}
            onMouseEnter={e => reg && onCountryHover(e, rid)}
            onMouseMove={e  => reg && onCountryHover(e, rid)}
            onMouseLeave={() => onCountryLeave()}
            onClick={() => reg && onRegionSelect(rid)}
          />
        )
      })}

      <path d={bordersPath} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.4" />

      {pins.map(pin => {
        const reg = regions[pin.id]
        if (!reg || reg.labelSkip) return null
        const pos = projection([pin.lon, pin.lat])
        if (!pos) return null
        return (
          <g key={pin.id} style={{pointerEvents:"none"}}>
            <text x={pos[0]} y={pos[1]}    textAnchor="middle" fontSize={10} fontWeight={700} fill="white" stroke="rgba(0,0,0,0.6)" strokeWidth={2.5} style={{paintOrder:"stroke"}} fontFamily="sans-serif">{reg.short}</text>
            <text x={pos[0]} y={pos[1]+13} textAnchor="middle" fontSize={9}  fontWeight={400} fill="white" stroke="rgba(0,0,0,0.55)" strokeWidth={2}   style={{paintOrder:"stroke"}} fontFamily="sans-serif">{reg.pop}</text>
          </g>
        )
      })}
    </svg>
  )
})

// ─── LEGEND PANEL ─────────────────────────────────────────────────────────────
function LegendPanel({ framework, onSelect, selectedRegion }) {
  const { regions } = FRAMEWORKS[framework]

  if (framework === "un") {
    const groups = {}
    CONTINENT_ORDER.forEach(c => { groups[c] = [] })
    Object.entries(regions).forEach(([id, r]) => {
      if (groups[r.cont]) groups[r.cont].push([id, r])
    })
    return (
      <div className="space-y-5">
        {CONTINENT_ORDER.map(cont => groups[cont].length === 0 ? null : (
          <div key={cont}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{cont}</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
              {groups[cont].map(([id, r]) => (
                <LegendItem key={id} id={id} region={r} isSelected={selectedRegion===id} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0.5">
      {Object.entries(regions).map(([id, r]) => (
        <LegendItem key={id} id={id} region={r} isSelected={selectedRegion===id} onSelect={onSelect} />
      ))}
    </div>
  )
}

function LegendItem({ id, region, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`flex items-center gap-2 text-left px-2.5 py-2 rounded-lg transition-all group
        ${isSelected ? "bg-accent" : "hover:bg-muted"}`}
    >
      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: region.color }} />
      <span className={`text-sm truncate transition-colors ${isSelected ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
        {region.name}
      </span>
    </button>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border bg-muted/30 px-4 py-3">
      <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold tracking-tight" style={accent ? { color: accent } : {}}>{value}</div>
    </div>
  )
}

// ─── REGION DETAIL ────────────────────────────────────────────────────────────
function RegionDetailView({ framework, regionId, onBack }) {
  const fw  = FRAMEWORKS[framework]
  const reg = fw.regions[regionId]
  if (!reg) return null

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-4 h-4 rounded mt-1.5 flex-shrink-0 ring-1 ring-black/10" style={{ background: reg.color }} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight">{reg.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{fw.label}</p>
        </div>
        <Badge variant="outline" className="flex-shrink-0 text-xs">{reg.cont}</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Population" value={reg.pop} accent={reg.color} />
        <StatCard label="Share of world" value={`${reg.pct}%`} />
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{reg.desc}</p>

      <Separator />

      {/* Countries */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">Key countries</p>
        <p className="text-sm text-foreground leading-relaxed">{reg.ctr}</p>
      </div>

      <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground" onClick={onBack}>
        ← Back to all regions
      </Button>
    </div>
  )
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
function MapTooltip({ tooltip, regions }) {
  if (!tooltip.visible || !tooltip.regionId) return null
  const reg = regions[tooltip.regionId]
  if (!reg) return null
  return (
    <div
      className="absolute pointer-events-none z-30 bg-background/96 backdrop-blur border border-border rounded-xl shadow-lg p-3 w-52"
      style={{ left: tooltip.x, top: tooltip.y }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: reg.color }} />
        <span className="font-semibold text-sm leading-tight">{reg.name}</span>
      </div>
      <div className="text-xs text-muted-foreground mb-2">{reg.cont}</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-muted-foreground">Population</div>
          <div className="font-semibold text-foreground">{reg.pop}</div>
        </div>
        <div>
          <div className="text-muted-foreground">% of world</div>
          <div className="font-semibold text-foreground">{reg.pct}%</div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground/70">Click for full details</div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [framework, setFramework]       = useState("world")
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [tooltip, setTooltip]           = useState({ visible:false, x:0, y:0, regionId:null })
  const wrapperRef                      = useRef(null)

  const handleCountryHover = useCallback((e, rid) => {
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const tx = x + 16 + 208 > rect.width ? x - 216 : x + 16
    setTooltip({ visible:true, x:tx, y:Math.max(8, y - 60), regionId:rid })
  }, [])

  const handleCountryLeave = useCallback(() => setTooltip(t => ({...t, visible:false})), [])

  const handleRegionSelect = useCallback((rid) => {
    setSelectedRegion(prev => prev === rid ? null : rid)
    setTooltip(t => ({...t, visible:false}))
  }, [])

  const handleFrameworkChange = useCallback((fw) => {
    setFramework(fw)
    setSelectedRegion(null)
    setTooltip({ visible:false, x:0, y:0, regionId:null })
  }, [])

  const currentRegions = FRAMEWORKS[framework].regions
  const regionCount    = Object.keys(currentRegions).length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">World Map</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Regional frameworks explorer</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs font-medium">{regionCount} regions</Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground">v2</Badge>
          </div>
        </div>

        {/* ── Framework Selector ── */}
        <div className="flex flex-wrap items-center gap-3">
          <Tabs value={framework} onValueChange={handleFrameworkChange}>
            <TabsList className="h-9">
              {Object.entries(FRAMEWORKS).map(([key, fw]) => (
                <TabsTrigger key={key} value={key} className="text-sm px-4 font-medium">{fw.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Select onValueChange={() => {}}>
            <SelectTrigger className="w-60 h-9 text-sm text-muted-foreground">
              <SelectValue placeholder="More frameworks ▾" />
            </SelectTrigger>
            <SelectContent>
              {COMING_SOON.map(f => (
                <SelectItem key={f.value} value={f.value} disabled className="py-2">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-muted-foreground">{f.label}</span>
                    <Badge variant="secondary" className="text-xs ml-auto">Soon</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p className="text-xs text-muted-foreground hidden sm:block ml-auto italic">
            {FRAMEWORKS[framework].desc}
          </p>
        </div>

        {/* ── Map Card ── */}
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-0">
            <div ref={wrapperRef} className="relative">
              <WorldMapSVG
                framework={framework}
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
                onCountryHover={handleCountryHover}
                onCountryLeave={handleCountryLeave}
              />
              <MapTooltip tooltip={tooltip} regions={currentRegions} />
            </div>
          </CardContent>
        </Card>

        {/* ── Detail Panel ── */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            {selectedRegion ? (
              <RegionDetailView
                framework={framework}
                regionId={selectedRegion}
                onBack={() => setSelectedRegion(null)}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{FRAMEWORKS[framework].label}</span>
                    {" · "}Hover or click any country to explore
                  </p>
                  {selectedRegion === null && (
                    <span className="text-xs text-muted-foreground">{regionCount} regions</span>
                  )}
                </div>
                <ScrollArea className="max-h-72 pr-1">
                  <LegendPanel
                    framework={framework}
                    onSelect={handleRegionSelect}
                    selectedRegion={selectedRegion}
                  />
                </ScrollArea>
              </>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
