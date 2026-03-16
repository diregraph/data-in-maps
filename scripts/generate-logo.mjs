#!/usr/bin/env node
/**
 * scripts/generate-logo.mjs
 *
 * Generates public/icon.svg, public/favicon.svg, and public/logo.svg
 * using a D3 geoOrthographic projection centred on the Indian Ocean (~70°E, 5°S).
 *
 * All dependencies are already in the project (d3, topojson-client, world-atlas).
 * Run: node scripts/generate-logo.mjs
 *      npm run generate-logo
 */

import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const world = JSON.parse(
  readFileSync(new URL('../node_modules/world-atlas/countries-110m.json', import.meta.url))
);

// ── UN Geoscheme colour palette ──────────────────────────────────────────────
const C = {
  northern_africa: '#fbbf24', // amber  — Northern Africa
  africa:          '#f97316', // orange — Sub-Saharan (E / W / Middle / S)
  western_asia:    '#f43f5e', // rose   — Western Asia (Arabian Peninsula + Levant + Turkey + Iran)
  central_asia:    '#a3e635', // lime   — Central Asia
  southern_asia:   '#22c55e', // emerald — Southern Asia (India, Pakistan, Bangladesh …)
  se_asia:         '#06b6d4', // cyan   — South-Eastern Asia
  eastern_asia:    '#818cf8', // indigo — Eastern Asia (China, Japan, Korea …)
  oceania:         '#a78bfa', // violet — Oceania (Australia, NZ, Pacific Islands)
  europe:          '#60a5fa', // blue   — Europe
  americas:        '#fb923c', // soft orange — Americas (not visible from Indian Ocean)
  unassigned:      '#1a3a5c', // dark fallback
};

// ISO 3166-1 numeric → colour  (world-atlas uses numeric IDs)
const COUNTRY_COLOURS = new Map([
  // Northern Africa
  ...['012', '434', '504', '729', '788', '818', '732'].map(id => [id, C.northern_africa]),

  // Sub-Saharan Africa
  ...['024','072','086','108','120','132','140','174','175','178','180','204',
      '226','231','232','238','262','266','270','288','324','384','404','426',
      '430','450','454','466','480','508','516','566','624','638','646','686',
      '694','706','710','716','734','748','768','800','834','854','894']
    .map(id => [id, C.africa]),

  // Western Asia
  ...['031','048','051','268','275','364','368','376','400','414','422',
      '512','634','682','760','784','792','887']
    .map(id => [id, C.western_asia]),

  // Central Asia
  ...['398','417','762','795','860'].map(id => [id, C.central_asia]),

  // Southern Asia
  ...['004','050','064','144','356','462','524','586'].map(id => [id, C.southern_asia]),

  // South-Eastern Asia
  ...['096','104','116','360','418','458','608','626','702','704','764']
    .map(id => [id, C.se_asia]),

  // Eastern Asia
  ...['156','158','392','408','410','496'].map(id => [id, C.eastern_asia]),

  // Oceania
  ...['036','090','184','242','258','296','316','520','540','548','554',
      '570','574','580','584','585','598','612','772','776','798','882']
    .map(id => [id, C.oceania]),

  // Europe
  ...['008','020','040','056','070','100','112','191','196','203','208',
      '233','246','250','276','292','300','336','340','348','352','372',
      '380','428','438','440','442','470','492','498','499','528','578',
      '616','620','642','643','674','688','703','705','724','744','752',
      '756','804','807','826']
    .map(id => [id, C.europe]),
]);

function colourFor(id) {
  return COUNTRY_COLOURS.get(String(id).padStart(3, '0')) ?? C.unassigned;
}

// ── Globe builder ─────────────────────────────────────────────────────────────
const COUNTRIES = feature(world, world.objects.countries);

/**
 * Build SVG fragment strings for a globe of `size × size`.
 * Rotation centres on 79.975758°E, 6.912828°N — Sri Lanka.
 */
function buildGlobe(size) {
  const projection = geoOrthographic()
    .scale(size * 0.46)
    .translate([size / 2, size / 2])
    .rotate([-79.975758, -6.912828, 0])   // [−lon, −lat, tilt] → centres on 79.975758°E, 6.912828°N
    .clipAngle(90);

  const pathGen = geoPath().projection(projection);
  const sphereD = pathGen({ type: 'Sphere' });

  const landPaths = COUNTRIES.features
    .map(f => {
      const d = pathGen(f);
      return d ? `    <path d="${d}" fill="${colourFor(f.id)}"/>` : '';
    })
    .filter(Boolean)
    .join('\n');

  return { sphereD, landPaths };
}

// ── SVG templates ─────────────────────────────────────────────────────────────

function iconSVG(size) {
  const { sphereD, landPaths } = buildGlobe(size);
  const rim = (size * 0.018).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" fill="none">
  <title>Data In Maps</title>
  <defs>
    <radialGradient id="dim-ocean" cx="38%" cy="32%" r="70%">
      <stop offset="0%"   stop-color="#0e5fa4"/>
      <stop offset="100%" stop-color="#04101e"/>
    </radialGradient>
    <radialGradient id="dim-vgn" cx="50%" cy="50%" r="50%">
      <stop offset="55%"  stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
    </radialGradient>
    <clipPath id="dim-sphere">
      <path d="${sphereD}"/>
    </clipPath>
  </defs>
  <path d="${sphereD}" fill="url(#dim-ocean)"/>
  <g clip-path="url(#dim-sphere)">
${landPaths}
  </g>
  <path d="${sphereD}" fill="url(#dim-vgn)"/>
  <path d="${sphereD}" fill="none" stroke="#3b82f6" stroke-width="${rim}" opacity="0.55"/>
</svg>`;
}


function logoSVG(globeSize) {
  const gap      = Math.round(globeSize * 0.12);
  const fontSize = Math.round(globeSize * 0.36);
  const textX    = globeSize + gap;
  const textY    = Math.round(globeSize / 2 + fontSize * 0.36);
  const totalW   = textX + Math.round(fontSize * 8);

  const { sphereD, landPaths } = buildGlobe(globeSize);
  const rim = (globeSize * 0.018).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${globeSize}" fill="none">
  <title>Data In Maps</title>
  <defs>
    <radialGradient id="logo-ocean" cx="38%" cy="32%" r="70%">
      <stop offset="0%"   stop-color="#0e5fa4"/>
      <stop offset="100%" stop-color="#04101e"/>
    </radialGradient>
    <radialGradient id="logo-vgn" cx="50%" cy="50%" r="50%">
      <stop offset="55%"  stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.5"/>
    </radialGradient>
    <clipPath id="logo-sphere">
      <path d="${sphereD}"/>
    </clipPath>
  </defs>
  <path d="${sphereD}" fill="url(#logo-ocean)"/>
  <g clip-path="url(#logo-sphere)">
${landPaths}
  </g>
  <path d="${sphereD}" fill="url(#logo-vgn)"/>
  <path d="${sphereD}" fill="none" stroke="#3b82f6" stroke-width="${rim}" opacity="0.55"/>
  <text
    x="${textX}"
    y="${textY}"
    font-family="system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif"
    font-size="${fontSize}"
    font-weight="700"
    fill="#f8fafc"
    letter-spacing="-2"
  >Data In Maps</text>
</svg>`;
}

// ── ICO builder (PNG-based, Vista+ / all modern browsers) ────────────────────
// Embeds multiple PNG buffers into a single .ico container without any
// additional dependencies. The ICO format stores a 6-byte ICONDIR header,
// one 16-byte ICONDIRENTRY per image, then the raw PNG data back-to-back.
function buildIco(pngBuffers) {
  const ICONDIR_SIZE    = 6;
  const ICONDIRENTRY_SIZE = 16;
  const headerSize = ICONDIR_SIZE + ICONDIRENTRY_SIZE * pngBuffers.length;

  // Calculate each image's offset within the final file
  let offset = headerSize;
  const entries = pngBuffers.map(buf => {
    const entry = { buf, offset };
    offset += buf.length;
    return entry;
  });

  const out = Buffer.alloc(offset); // total file size
  let pos = 0;

  // ICONDIR
  out.writeUInt16LE(0, pos);                    pos += 2; // reserved
  out.writeUInt16LE(1, pos);                    pos += 2; // type: 1 = ICO
  out.writeUInt16LE(pngBuffers.length, pos);    pos += 2; // image count

  // ICONDIRENTRY — read PNG dimensions from the IHDR chunk (bytes 16–23)
  for (const { buf, offset: imgOffset } of entries) {
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    out.writeUInt8(w >= 256 ? 0 : w, pos);     pos += 1; // width  (0 = 256)
    out.writeUInt8(h >= 256 ? 0 : h, pos);     pos += 1; // height (0 = 256)
    out.writeUInt8(0, pos);                     pos += 1; // color count
    out.writeUInt8(0, pos);                     pos += 1; // reserved
    out.writeUInt16LE(1, pos);                  pos += 2; // color planes
    out.writeUInt16LE(32, pos);                 pos += 2; // bits per pixel
    out.writeUInt32LE(buf.length, pos);         pos += 4; // image data size
    out.writeUInt32LE(imgOffset, pos);          pos += 4; // offset in file
  }

  // Image data
  for (const { buf } of entries) {
    buf.copy(out, pos);
    pos += buf.length;
  }

  return out;
}

// ── Write outputs ─────────────────────────────────────────────────────────────
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const iconSvg = iconSVG(200); // capture once — reused for both .svg and .ico

writeFileSync(resolve(ROOT, 'public/icon.svg'),    iconSvg);
writeFileSync(resolve(ROOT, 'public/logo.svg'),    logoSVG(200));

console.log('✓  public/icon.svg');
console.log('✓  public/logo.svg');

// ── favicon.ico ───────────────────────────────────────────────────────────────
// Rasterise icon.svg at 16, 32, and 48 px then pack into a multi-resolution ICO.
const { default: sharp } = await import('sharp');

const pngs = await Promise.all(
  [16, 32, 48].map(size =>
    sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toBuffer()
  )
);

writeFileSync(resolve(ROOT, 'public/favicon.ico'), buildIco(pngs));
console.log('✓  public/favicon.ico');
