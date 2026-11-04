// Distances are illustrative Earth-to-object values, not current ephemerides.
const destinations = {
  moon: [384400, 'About 384,400 km away.'], sun: [149600000, 'About 1 AU (149.6 million km) away.'],
  mercury: [155000000, 'About 155 million km away, a typical approximation.'], venus: [170000000, 'About 170 million km away, a typical approximation.'], earth: [0, '0 km: the journey starts and ends on Earth.'], mars: [225000000, 'About 225 million km away, a typical approximation.'], jupiter: [778000000, 'About 778 million km away, a typical approximation.'], saturn: [1430000000, 'About 1.43 billion km away, a typical approximation.'], uranus: [2880000000, 'About 2.88 billion km away, a typical approximation.'], neptune: [4500000000, 'About 4.5 billion km away, a typical approximation.'],
  proxima: [null, 'About 4.24 light-years away.', 'about 4.24 years'], sirius: [null, 'About 8.6 light-years away.', 'about 8.6 years'], vega: [null, 'About 25 light-years away.', 'about 25 years'], polaris: [null, 'About 430 light-years away.', 'about 430 years'], betelgeuse: [null, 'Roughly 550 light-years away; estimates vary.', 'roughly 550 years'], andromeda: [null, 'About 2.5 million light-years away.', 'about 2.5 million years']
};
function travelTime(km) {
  const seconds = km / 299792.458;
  if (seconds < 60) return `${seconds.toFixed(1)} seconds`;
  const rounded = Math.round(seconds), hours = Math.floor(rounded / 3600), minutes = Math.floor((rounded % 3600) / 60), remainder = rounded % 60;
  return [hours && `${hours} ${hours === 1 ? 'hour' : 'hours'}`, minutes && `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`, remainder && `${remainder} ${remainder === 1 ? 'second' : 'seconds'}`].filter(Boolean).join(' ');
}
const destination = document.querySelector('#destination');
destination.addEventListener('change', () => { const [km, detail, time] = destinations[destination.value]; document.querySelector('#distance-result').textContent = time || travelTime(km); document.querySelector('#distance-detail').textContent = detail; });

// Facts are rounded; references are linked in every exhibit.
const exhibits = [
['sun','The Sun','Star','Our star holds the solar system together with its gravity and supplies the energy that sustains life on Earth.','Diameter|1.39 million km','Distance from Earth|About 1 AU (149.6 million km)','Rotation|About 25 days at the equator','Orbit|Around the Milky Way in roughly 230 million years','Temperature|About 5,500°C at the surface','The Sun contains more than 99% of the solar system’s mass. Its outer atmosphere, the corona, is far hotter than its surface.','Solar Dynamics Observatory image; false color'],
['mercury','Mercury','Terrestrial planet','The smallest planet is a heavily cratered world that races around the Sun in just 88 Earth days.','Diameter|4,879 km','Distance from Sun|0.39 AU','Rotation|58.6 Earth days','Orbit|88 Earth days','Temperature|Approximately −180°C to 430°C','Mercury has water ice in permanently shadowed craters near its poles.','MESSENGER spacecraft mosaic of Mercury’s surface'],
['venus','Venus','Terrestrial planet','A rocky planet wrapped in a thick carbon-dioxide atmosphere, Venus is the hottest planet in our solar system.','Diameter|12,104 km','Distance from Sun|0.72 AU','Rotation|243 Earth days, retrograde','Orbit|225 Earth days','Temperature|About 465°C at the surface','Its slow backward spin means a Venusian day is longer than its year.','Computer-simulated global view from radar data'],
['earth','Earth','Terrestrial planet','Our ocean-covered home is the only known world with life, protected by a dynamic atmosphere and magnetic field.','Diameter|12,742 km','Distance from Sun|1 AU','Rotation|23 hours 56 minutes','Orbit|365.25 days','Temperature|About 15°C global mean','Liquid water covers about 71% of Earth’s surface.','Blue Marble composite'],
['moon','The Moon','Natural satellite','Earth’s only natural satellite preserves a record of impacts spanning billions of years.','Diameter|3,475 km','Distance from Sun|About 1 AU, with Earth','Rotation|27.3 Earth days','Orbit|27.3 days around Earth','Temperature|About −130°C to 120°C','The Moon rotates once per orbit, so nearly the same face always points toward Earth.','Artemis I spacecraft photograph'],
['mars','Mars','Terrestrial planet','A cold desert world with ancient river valleys, polar ice caps, and the largest volcano in the solar system.','Diameter|6,779 km','Distance from Sun|1.52 AU','Rotation|24 hours 37 minutes','Orbit|687 Earth days','Temperature|About −60°C on average','Mars has two small moons, Phobos and Deimos.','Viking orbiter mosaic'],
['jupiter','Jupiter','Gas giant','The largest planet is a giant of hydrogen and helium, banded by powerful winds and enormous storms.','Diameter|139,820 km','Distance from Sun|5.2 AU','Rotation|About 10 hours','Orbit|11.86 Earth years','Temperature|About −110°C at cloud tops','The Great Red Spot is a storm that has persisted for centuries.','Juno spacecraft image'],
['saturn','Saturn','Gas giant','Saturn’s magnificent rings are made mostly of countless pieces of water ice, from dust grains to mountains.','Diameter|116,460 km','Distance from Sun|9.58 AU','Rotation|About 10.7 hours','Orbit|29.4 Earth years','Temperature|About −140°C at cloud tops','Saturn is less dense than water, though it has no solid surface to float on.','Cassini mosaic, The Day the Earth Smiled'],
['uranus','Uranus','Ice giant','A pale blue ice giant that rotates almost on its side, Uranus experiences extreme seasons.','Diameter|50,724 km','Distance from Sun|19.2 AU','Rotation|About 17 hours, retrograde','Orbit|84 Earth years','Temperature|About −195°C','Methane in its atmosphere absorbs red light, contributing to its blue-green appearance.','Voyager 2 image'],
['neptune','Neptune','Ice giant','Dark, cold, and swept by supersonic winds, Neptune is the most distant major planet from the Sun.','Diameter|49,244 km','Distance from Sun|30.1 AU','Rotation|About 16 hours','Orbit|165 Earth years','Temperature|About −200°C','Neptune was predicted mathematically before its discovery through a telescope in 1846.','Voyager 2 image'],
['pluto','Pluto','Dwarf planet','A complex icy world in the Kuiper Belt, Pluto revealed mountains and a vast heart-shaped plain to New Horizons.','Diameter|2,377 km','Distance from Sun|39.5 AU on average','Rotation|6.4 Earth days','Orbit|248 Earth years','Temperature|About −230°C','Pluto and its largest moon Charon orbit a shared center of mass outside Pluto.','New Horizons enhanced-color image'],
['sirius','Sirius','Binary star','The brightest star in Earth’s night sky is a binary system consisting of brilliant Sirius A and a faint white dwarf companion.','Distance|8.6 light-years','Type|A-type main-sequence star and white dwarf','Temperature|Sirius A: about 9,900°C','Significance|Brightest night-time star','Sirius B is roughly Earth-sized despite containing about as much mass as the Sun.','Hubble image of Sirius A and B'],
['betelgeuse','Betelgeuse','Red supergiant','This immense red supergiant marks Orion’s shoulder and is approaching the end of its stellar life.','Distance|Roughly 550 light-years; uncertain','Type|Red supergiant','Temperature|About 3,200°C','Significance|A nearby massive evolved star','Betelgeuse will eventually explode as a supernova, but when that will happen is unknown.','Herschel infrared image; colors represent infrared wavelengths'],
['polaris','Polaris','Multiple star system','The North Star sits close to the north celestial pole, making it a useful guide to direction in the Northern Hemisphere.','Distance|About 430 light-years','Type|Yellow supergiant and companions','Temperature|About 5,700°C','Significance|A Cepheid variable and navigational landmark','Polaris pulsates, changing brightness as it expands and contracts.','Hubble image of Polaris and companion'],
['vega','Vega','Main-sequence star','A brilliant blue-white star in Lyra, Vega is one of the brightest stars visible in the night sky.','Distance|About 25 light-years','Type|A-type main-sequence star','Temperature|About 9,300°C','Significance|A key reference star in astronomy','Vega is surrounded by a disk of dusty debris.','Artist’s concept of Vega’s debris disk'],
['proxima','Proxima Centauri','Red dwarf','The closest known star beyond the Sun is a small, cool red dwarf in the Alpha Centauri system.','Distance|4.24 light-years','Type|Red dwarf','Temperature|About 2,770°C','Significance|Nearest known star to the Sun','Proxima Centauri hosts planets, including the roughly Earth-mass Proxima b.','Hubble image'],
['milky-way','The Milky Way','Galaxy','Our home galaxy is a barred spiral containing hundreds of billions of stars, along with gas, dust, and dark matter.','Distance|We are inside it','Scale|About 100,000 light-years across','Location|Solar system in the Orion Spur','View|Multiwavelength galactic center','We see the Milky Way as a luminous band because we look through the plane of its disk.','Composite of infrared and X-ray observations'],
['andromeda','Andromeda Galaxy','Spiral galaxy','Our nearest large galactic neighbor is a vast spiral visible to the unaided eye under dark skies.','Distance|About 2.5 million light-years','Type|Spiral galaxy','Also known as|Messier 31','Scale|More than 200,000 light-years across','Andromeda and the Milky Way are approaching one another and are expected to interact in billions of years.','Spitzer infrared image'],
['orion','Orion Nebula','Stellar nursery','A luminous cloud of gas and dust in Orion, this nearby stellar nursery is actively forming young stars.','Distance|About 1,350 light-years','Type|Emission nebula','Also known as|Messier 42','Location|Orion’s sword','Intense radiation from young stars illuminates and sculpts the surrounding gas.','Hubble telescope mosaic'],
['carina','Carina Nebula','Stellar nursery','A vast star-forming region where radiation and winds from massive young stars carve towering structures in the surrounding cloud.','Distance|About 7,600 light-years','Type|Emission nebula','Featured region|The Cosmic Cliffs','Observed by|James Webb Space Telescope','Webb’s infrared instruments reveal young stars hidden behind dust in visible light.','Webb NIRCam infrared image; colors represent infrared wavelengths'],
['sagittarius-a','Sagittarius A*','Supermassive black hole','At the center of our galaxy lies a black hole with roughly four million times the Sun’s mass.','Distance|About 26,000 light-years','Type|Supermassive black hole','Mass|About 4 million Suns','Location|Center of the Milky Way','The Event Horizon Telescope revealed the glowing material around its shadow; the black hole itself emits no light.','Event Horizon Telescope image in polarized light; color encodes polarization'],
['m87','M87*','Supermassive black hole','The giant black hole at the heart of galaxy M87 powers a remarkable jet extending far beyond its host galaxy’s center.','Distance|About 55 million light-years','Type|Supermassive black hole','Mass|About 6.5 billion Suns','Location|Galaxy Messier 87','In 2019, M87* became the first black hole whose shadow was imaged by the Event Horizon Telescope.','Spitzer infrared image of M87 with EHT black-hole image inset']
];
exhibits.forEach(e => { if (e.length === 10) e.splice(8, 0, 'Image|See caption for observing method'); });
// These exact viewer URLs are embedded by NASA on its own object or facts pages.
// Do not construct object routes: NASA uses a different route for Pluto.
const nasaViews = {
  sun: { info: 'https://science.nasa.gov/sun/', view: 'https://eyes.nasa.gov/apps/solar-system/#/sun?embed=true' },
  mercury: { info: 'https://science.nasa.gov/mercury/', view: 'https://eyes.nasa.gov/apps/solar-system/#/mercury?embed=true' },
  venus: { info: 'https://science.nasa.gov/venus/', view: 'https://eyes.nasa.gov/apps/solar-system/#/venus?embed=true&logo=false' },
  earth: { info: 'https://science.nasa.gov/earth/facts/', view: 'https://eyes.nasa.gov/apps/earth/?embed=true' },
  moon: { info: 'https://science.nasa.gov/moon/' },
  mars: { info: 'https://science.nasa.gov/mars/facts/', view: 'https://eyes.nasa.gov/apps/solar-system/#/mars' },
  jupiter: { info: 'https://science.nasa.gov/jupiter/', view: 'https://eyes.nasa.gov/apps/solar-system/#/jupiter?embed=true' },
  saturn: { info: 'https://science.nasa.gov/saturn/', view: 'https://eyes.nasa.gov/apps/solar-system/#/saturn?embed=true' },
  uranus: { info: 'https://science.nasa.gov/uranus/', view: 'https://eyes.nasa.gov/apps/solar-system/#/uranus?embed=true' },
  neptune: { info: 'https://science.nasa.gov/neptune/', view: 'https://eyes.nasa.gov/apps/solar-system/#/neptune?embed=true' },
  pluto: { info: 'https://science.nasa.gov/dwarf-planets/pluto/', view: 'https://eyes.nasa.gov/apps/solar-system/#/134340_pluto?embed=true' }
};
const exhibitImage = id => id === 'mercury' ? 'assets/mercury-globe-nasa.jpg' : `assets/${id}.jpg`;
const solar = exhibits.slice(0,10), dwarf = exhibits.slice(10,11), stars = [exhibits[0], ...exhibits.slice(11,16)], deep = exhibits.slice(16);
function makeCards(items, target) {
  document.querySelector(target).innerHTML = items.map((e, i) => `<button type="button" class="exhibit-card" data-id="${e[0]}"><span class="card-image"><img src="${exhibitImage(e[0])}" alt="" loading="lazy" decoding="async"><span class="card-arrow" aria-hidden="true">↗</span></span><span class="card-meta">${e[2]} <span>${String(i + 1).padStart(2,'0')}</span></span><span class="card-title">${e[1]}</span><span class="card-action">Explore exhibit</span></button>`).join('');
}
function makeSolarWorlds(items, target) {
  document.querySelector(target).innerHTML = items.map(e => `<button type="button" class="planet-object exhibit-card" data-id="${e[0]}" aria-label="Explore ${e[1]}"><span class="planet-image"><img src="assets/${e[0]}-space.webp" alt="" loading="lazy" decoding="async"></span><span class="planet-label"><span class="card-title">${e[1]}</span><span class="planet-kind">${e[2]}</span></span></button>`).join('');
}
const stellarImages = {
  sun: ['sun-space.webp', 'Solar observatory · false color'],
  sirius: ['sirius-stellar.webp', 'Hubble observation'],
  betelgeuse: ['betelgeuse-stellar.webp', 'Herschel · infrared'],
  polaris: ['polaris-stellar.webp', 'Hubble observation'],
  vega: ['vega-stellar.webp', 'Artist’s impression'],
  proxima: ['proxima-stellar.webp', 'Hubble observation']
};
const starReferences = {
  sirius: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/',
  betelgeuse: 'https://science.nasa.gov/asset/hubble/disruption-of-the-red-supergiant-star-betelgeuse/',
  polaris: 'https://science.nasa.gov/asset/hubble/hubble-images-polariss-companion/',
  vega: 'https://science.nasa.gov/asset/hubble/hubble-and-webb-observations-of-vega-circumstellar-disk/',
  proxima: 'https://science.nasa.gov/asset/hubble/proxima-centauri/'
};
function makeStars(items) {
  document.querySelector('#stars-grid').innerHTML = items.map(e => `<button type="button" class="stellar-object exhibit-card" data-id="${e[0]}" aria-label="Explore ${e[1]}"><span class="stellar-image"><img src="assets/${stellarImages[e[0]][0]}" alt="" loading="lazy" decoding="async"></span><span class="stellar-label"><span class="card-title">${e[1]}</span><span class="stellar-method">${stellarImages[e[0]][1]}</span></span></button>`).join('');
}
makeSolarWorlds(solar,'#solar-grid'); makeSolarWorlds(dwarf,'#dwarf-grid'); makeStars(stars); makeCards(deep,'#deep-grid');
const dialog = document.querySelector('#exhibit-dialog');
let lastFocus;
const sourcesPromise = fetch('assets/sources.json').then(r => { if (!r.ok) throw new Error('Image credits unavailable'); return r.json(); }).catch(() => null);
let activeExhibit;
const explorer = document.querySelector('#nasa-explorer');
const embedToggle = document.querySelector('#nasa-embed-toggle');
const viewerDialog = document.querySelector('#nasa-viewer-dialog');
const viewerFrame = document.querySelector('#nasa-viewer-frame');
const viewerClose = document.querySelector('#nasa-viewer-close');
function openExhibit(id, trigger) {
  const e = exhibits.find(item => item[0] === id); if (!e) return;
  lastFocus = trigger; activeExhibit = id;
  document.querySelector('#dialog-title').textContent = e[1]; document.querySelector('#dialog-category').textContent = e[2]; document.querySelector('#dialog-intro').textContent = e[3];
  const image = document.querySelector('#dialog-image'); image.src = exhibitImage(id); image.alt = `${e[1]}: ${e[10]}`;
  document.querySelector('#dialog-image-label').textContent = e[10];
  document.querySelector('#dialog-facts').innerHTML = e.slice(4,9).map(f => { const [label,value] = f.split('|'); return `<div><dt>${label}</dt><dd>${value}</dd></div>`; }).join('');
  document.querySelector('#dialog-extra').textContent = e[9];
  document.querySelector('#mercury-surface').hidden = id !== 'mercury';
  const nasa = nasaViews[id];
  explorer.hidden = !nasa?.view;
  const reference = document.querySelector('#dialog-reference');
  reference.href = nasa?.info || starReferences[id] || 'https://science.nasa.gov/universe/';
  reference.textContent = nasa && !nasa.view ? 'View NASA information ↗' : 'Explore NASA Science ↗';
  reference.classList.toggle('nasa-info-button', Boolean(nasa && !nasa.view));
  const credit = document.querySelector('#dialog-credit'), sourceLink = document.querySelector('#dialog-source');
  credit.textContent = 'Loading image credits…'; sourceLink.hidden = true;
  sourcesPromise.then(sources => {
    if (activeExhibit !== id) return;
    const source = sources?.[id];
    credit.textContent = source ? `Image: ${source.title.replace(/^File:/,'')} — ${source.credit.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&')}${source.license ? ` · ${source.license}` : ' · NASA image use guidelines apply'}` : 'Image credits are currently unavailable. Please try again later.';
    if (source) { sourceLink.href = source.source; sourceLink.hidden = false; }
  });
  dialog.showModal(); document.body.classList.add('dialog-open'); document.querySelector('.dialog-close').focus();
}
embedToggle.addEventListener('click', () => {
  const view = nasaViews[activeExhibit]?.view;
  if (!view) return;
  const name = exhibits.find(e => e[0] === activeExhibit)[1];
  document.querySelector('#nasa-viewer-title').textContent = name;
  document.querySelector('#nasa-viewer-link').href = view;
  const frame = document.createElement('iframe');
  frame.title = `NASA 3D interactive: ${name}`;
  frame.src = view;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
  frame.setAttribute('allow', 'fullscreen');
  viewerFrame.replaceChildren(frame);
  viewerDialog.showModal();
  viewerClose.focus();
});
viewerClose.addEventListener('click', () => viewerDialog.close());
viewerDialog.addEventListener('close', () => {
  viewerFrame.replaceChildren();
  if (dialog.open) embedToggle.focus();
});
document.addEventListener('click', event => { const card = event.target.closest('.exhibit-card, .hero-world'); if (card) openExhibit(card.dataset.id, card); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { activeExhibit = null; if (viewerDialog.open) viewerDialog.close(); document.body.classList.remove('dialog-open'); lastFocus?.focus(); });
