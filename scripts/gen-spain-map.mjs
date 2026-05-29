// One-off generator: builds SVG paths for Spain's 17 autonomous communities
// from es-atlas TopoJSON, projected with geoConicConformalSpain (puts the
// Canary Islands in an inset box like official Spanish maps).
//
// The output (components/sections/spainMapData.ts) is committed and static,
// so these deps are NOT part of the app. To regenerate, reinstall them first:
//   npm i -D es-atlas topojson-client d3-geo d3-path d3-composite-projections
//   node scripts/gen-spain-map.mjs > components/sections/spainMapData.ts
//   (then re-add the file header comment)

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import * as topojson from 'topojson-client';
import { geoPath } from 'd3-geo';

const require = createRequire(import.meta.url);
const topo = require('es-atlas/es/autonomous_regions.json');

// d3-composite-projections ships as a UMD file inside a "type": "module"
// package, so a plain import binds it to globalThis.d3 instead of exports.
// Load it through a real CommonJS wrapper so the UMD takes its CJS branch.
function loadCompositeProjections() {
  const file = require.resolve('d3-composite-projections/d3-composite-projections.js');
  const code = readFileSync(file, 'utf8');
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', code);
  fn(mod, mod.exports, require);
  return mod.exports;
}
const { geoConicConformalSpain } = loadCompositeProjections();

// Pretty display names + stable ids + which is the base.
const META = {
  'Andalucía':                                       { id: 'andalucia',     name: 'Andalucía' },
  'Aragón':                                          { id: 'aragon',        name: 'Aragón' },
  'Principado de Asturias':                          { id: 'asturias',      name: 'Asturias' },
  'Illes Balears':                                   { id: 'baleares',      name: 'Baleares' },
  'Cantabria':                                       { id: 'cantabria',     name: 'Cantabria' },
  'Castilla y León':                                 { id: 'castilla-leon', name: 'Castilla y León', isBase: true },
  'Castilla-La Mancha':                              { id: 'clm',           name: 'Castilla-La Mancha' },
  'Cataluña/Catalunya':                              { id: 'cataluna',      name: 'Cataluña' },
  'Comunitat Valenciana':                            { id: 'valenciana',    name: 'C. Valenciana' },
  'Extremadura':                                     { id: 'extremadura',   name: 'Extremadura' },
  'Galicia':                                         { id: 'galicia',       name: 'Galicia' },
  'Comunidad de Madrid':                             { id: 'madrid',        name: 'Madrid' },
  'Región de Murcia':                                { id: 'murcia',        name: 'Murcia' },
  'Comunidad Foral de Navarra':                      { id: 'navarra',       name: 'Navarra' },
  'País Vasco/Euskadi':                              { id: 'pais-vasco',    name: 'País Vasco' },
  'La Rioja':                                        { id: 'rioja',         name: 'La Rioja' },
  'Canarias':                                        { id: 'canarias',      name: 'Canarias' },
};

const VB_W = 1000;
const VB_H = 720;
const PAD = 24;

const fc = topojson.feature(topo, topo.objects.autonomous_regions);
// Keep only the 17 communities we want (drop Ceuta, Melilla, Gibraltar).
const feats = fc.features.filter((f) => META[f.properties.name]);
const collection = { type: 'FeatureCollection', features: feats };

const projection = geoConicConformalSpain();
projection.fitExtent([[PAD, PAD], [VB_W - PAD, VB_H - PAD]], collection);
const path = geoPath(projection);

const round = (s) => s.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1));

const out = feats
  .map((f) => {
    const meta = META[f.properties.name];
    const d = round(path(f));
    const [cx, cy] = path.centroid(f).map((v) => +v.toFixed(1));
    return { ...meta, cx, cy, d };
  })
  // sort: base first, then alphabetical
  .sort((a, b) => (a.isBase ? -1 : b.isBase ? 1 : a.name.localeCompare(b.name)));

// Composition border (the inset box line for Canarias)
const compositionBorder = round(projection.getCompositionBorders());

console.log('export const VB_W = ' + VB_W + ';');
console.log('export const VB_H = ' + VB_H + ';');
console.log('export const COMPOSITION_BORDER = ' + JSON.stringify(compositionBorder) + ';');
console.log('export const REGIONS = [');
for (const r of out) {
  console.log(`  { id: ${JSON.stringify(r.id)}, name: ${JSON.stringify(r.name)},${r.isBase ? ' isBase: true,' : ''} cx: ${r.cx}, cy: ${r.cy},`);
  console.log(`    d: ${JSON.stringify(r.d)} },`);
}
console.log('];');
