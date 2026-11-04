const { test: base, expect } = require('@playwright/test');
const test = base.extend({ page: async ({ page }, use) => {
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(`Console: ${m.text()}`); });
  page.on('pageerror', e => errors.push(`Exception: ${e.message}`));
  page.on('requestfailed', r => errors.push(`Request: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  await use(page);
  expect(errors, 'No console, JavaScript, or network errors').toEqual([]);
}});
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('introduces the astronomy experience and all collections', async ({ page }) => {
  await expect(page).toHaveTitle(/The Curiosity Lab/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/THE CURIOSITY\s*LAB/);
  await expect(page.getByText('Explore the Universe.')).toBeVisible();
  await expect(page.getByRole('link', { name: /Begin Exploring/ })).toHaveAttribute('href', '#collections');
  for (const id of ['collections','solar-system','stars','deep-space','universe','about']) await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.locator('#mind, #computer, #physics')).toHaveCount(0);
});
test('hero panorama shows the solar system in order and opens the correct exhibits', async ({ page }, testInfo) => {
  const hero = page.locator('.hero');
  const panorama = page.getByRole('region', { name: /Solar system panorama/ });
  const worlds = panorama.locator('.hero-world');
  await expect(worlds).toHaveCount(9);
  expect(await worlds.evaluateAll(elements => elements.map(el => el.dataset.id))).toEqual(['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']);
  await expect(hero).toContainText('NOT TO SCALE');
  expect(Math.round((await hero.boundingBox()).height)).toBe(testInfo.project.use.viewport.height);
  if (testInfo.project.use.viewport.width <= 800) {
    expect(await panorama.evaluate(el => el.scrollWidth)).toBeGreaterThan(await panorama.evaluate(el => el.clientWidth));
    await expect(hero.locator('.hero-swipe')).toBeVisible();
  }
  for (const [id, name] of [['sun','The Sun'],['mercury','Mercury'],['venus','Venus'],['earth','Earth'],['mars','Mars'],['jupiter','Jupiter'],['saturn','Saturn'],['uranus','Uranus'],['neptune','Neptune']]) {
    const world = panorama.locator(`[data-id="${id}"]`);
    const image = world.locator('img');
    await expect(world).toHaveAccessibleName(/Explore/);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    await image.click();
    const dialog = page.locator('#exhibit-dialog');
    await expect(dialog).toBeVisible(); await expect(dialog.locator('#dialog-title')).toHaveText(name);
    await expect(dialog.locator('#dialog-source')).toHaveAttribute('href', /^https:\/\//);
    await expect.poll(() => dialog.locator('#dialog-image').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(world).toBeFocused();
  }
});
test('favicon and all locally referenced images are available', async ({ page, request }) => {
  const href = await page.locator('link[rel~="icon"]').getAttribute('href');
  const icon = await request.get(new URL(href, page.url()).href);
  expect(icon.ok()).toBeTruthy(); expect(icon.headers()['content-type']).toMatch(/^image\//);
  const cards = page.locator('.exhibit-card'); await expect(cards).toHaveCount(23);
  for (let i = 0; i < await cards.count(); i++) {
    const img = cards.nth(i).locator('img'); await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
});
test('site assets and interactions work under the GitHub Pages project path', async ({ page, request }) => {
  await page.goto('/Agentic-Workflow/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/THE CURIOSITY\s*LAB/);
  const prefix = new URL('/Agentic-Workflow/', page.url());
  const favicon = await page.locator('link[rel~="icon"]').getAttribute('href');
  expect((await request.get(new URL(favicon, prefix).href)).ok()).toBeTruthy();
  const cssResponse = await request.get(new URL('styles.css', prefix).href);
  expect(cssResponse.ok()).toBeTruthy();
  const stylesheet = await cssResponse.text();
  for (const match of stylesheet.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
    if (/^(?:data:|https?:|#)/.test(match[1])) continue;
    const asset = await request.get(new URL(match[1], prefix).href);
    expect(asset.ok(), `Stylesheet asset ${match[1]} should resolve beneath the Pages prefix`).toBeTruthy();
  }
  for (const img of await page.locator('.hero-world img, .exhibit-card img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    const src = await img.getAttribute('src');
    expect(new URL(src, page.url()).pathname).toMatch(/^\/Agentic-Workflow\//);
  }
  const mercury = page.locator('#solar-grid [data-id="mercury"]');
  await mercury.locator('img').click();
  const dialog = page.locator('#exhibit-dialog');
  await expect(dialog.locator('#dialog-title')).toHaveText('Mercury');
  await expect.poll(() => dialog.locator('#dialog-image').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  await expect(dialog.locator('#dialog-credit')).toContainText('NASA');
  await page.keyboard.press('Escape'); await expect(mercury).toBeFocused();
  await page.getByLabel('Choose a destination').selectOption('mars');
  await expect(page.locator('#distance-result')).toHaveText('12 minutes 31 seconds');
});
test('navigation links reach the correct sections', async ({ page }) => {
  for (const [name, id] of [['Solar System','solar-system'],['Stars','stars'],['Deep Space','deep-space'],['Cosmic Distances','universe']]) {
    const link = page.getByRole('navigation', { name: 'Exhibit navigation' }).getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', `#${id}`); await link.click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`)); await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});
test('solar system worlds are directly actionable images without gallery-card controls', async ({ page }) => {
  const worlds = page.locator('#solar-system .planet-object');
  await expect(worlds).toHaveCount(11);
  await expect(page.locator('#solar-system .card-image, #solar-system .card-action, #solar-system .card-arrow')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /View in NASA 3D/ })).toHaveCount(0);
  for (const world of await worlds.all()) {
    await expect(world).toHaveAccessibleName(/^Explore /);
    await expect(world.locator('img')).toHaveAttribute('src', /-space\.webp$/);
    await expect(world.locator('.card-title')).not.toBeEmpty();
  }
});
test('solar lineup follows the journey outward and is keyboard-scrollable', async ({ page }) => {
  const lineup = page.getByRole('region', { name: /Solar system lineup/ });
  await expect(lineup).toHaveAttribute('tabindex', '0');
  const worlds = lineup.locator('.planet-object');
  await expect(worlds).toHaveCount(10);
  expect(await worlds.evaluateAll(elements => elements.map(el => el.dataset.id))).toEqual(['sun','mercury','venus','earth','moon','mars','jupiter','saturn','uranus','neptune']);
  expect(await lineup.evaluate(el => el.scrollWidth)).toBeGreaterThan(await lineup.evaluate(el => el.clientWidth));
  const neptune = lineup.locator('[data-id="neptune"]');
  await neptune.focus();
  await expect.poll(() => lineup.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await page.keyboard.press('Enter');
  const dialog = page.locator('#exhibit-dialog');
  await expect(dialog).toBeVisible(); await expect(dialog.locator('#dialog-title')).toHaveText('Neptune');
  await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(neptune).toBeFocused();
});
test('stars are directly actionable observations with clear image types', async ({ page }) => {
  const stars = page.locator('#stars-grid .stellar-object');
  await expect(stars).toHaveCount(6);
  await expect(page.locator('#stars-grid .card-image, #stars-grid .card-action, #stars-grid .card-arrow')).toHaveCount(0);
  for (const star of await stars.all()) {
    await expect(star).toHaveAccessibleName(/^Explore /);
    await expect(star.locator('img')).toBeVisible();
    await expect(star.locator('.stellar-method')).not.toBeEmpty();
  }
  await expect(page.locator('#stars-grid [data-id="vega"]')).toContainText('Artist’s impression');
  await expect(page.locator('#stars-grid [data-id="betelgeuse"]')).toContainText('infrared');
  await expect(page.locator('#stars-grid [data-id="sun"]')).toContainText('false color');
  const references = {
    sirius: 'https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/',
    betelgeuse: 'https://science.nasa.gov/asset/hubble/disruption-of-the-red-supergiant-star-betelgeuse/',
    polaris: 'https://science.nasa.gov/asset/hubble/hubble-images-polariss-companion/',
    vega: 'https://science.nasa.gov/asset/hubble/hubble-and-webb-observations-of-vega-circumstellar-disk/',
    proxima: 'https://science.nasa.gov/asset/hubble/proxima-centauri/'
  };
  for (const [id, reference] of Object.entries(references)) {
    await page.locator(`#stars-grid [data-id="${id}"] img`).click();
    const popup = page.locator('#exhibit-dialog');
    await expect(popup.locator('#dialog-reference')).toHaveAttribute('href', reference);
    await expect(popup.locator('#dialog-facts')).toContainText('Distance');
    await expect(popup.locator('#dialog-facts')).toContainText('Type');
    await expect(popup.locator('#dialog-source')).toHaveAttribute('href', /^https:\/\//);
    await expect.poll(() => popup.locator('#dialog-image').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    await popup.getByRole('button', { name: 'Close exhibit' }).click();
    await expect(page.locator(`#stars-grid [data-id="${id}"]`)).toBeFocused();
  }
  const star = page.locator('#stars-grid [data-id="sirius"]');
  await star.focus(); await page.keyboard.press('Enter');
  const dialog = page.locator('#exhibit-dialog');
  await expect(dialog.locator('#dialog-title')).toHaveText('Sirius');
  await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(star).toBeFocused();
});
test('every exhibit opens its own detailed, credited image and closes', async ({ page }) => {
  const groups = { '#solar-grid': ['The Sun','Mercury','Venus','Earth','The Moon','Mars','Jupiter','Saturn','Uranus','Neptune'], '#dwarf-grid': ['Pluto'], '#stars-grid': ['The Sun','Sirius','Betelgeuse','Polaris','Vega','Proxima Centauri'], '#deep-grid': ['The Milky Way','Andromeda Galaxy','Orion Nebula','Carina Nebula','Sagittarius A*','M87*'] };
  const dialog = page.getByRole('dialog');
  for (const [selector, names] of Object.entries(groups)) {
    const cards = page.locator(`${selector} .exhibit-card`); await expect(cards).toHaveCount(names.length);
    for (let i = 0; i < names.length; i++) {
      const card = cards.nth(i); await expect(card.locator('.card-title')).toHaveText(names[i]);
      if (selector === '#solar-grid' || selector === '#dwarf-grid' || selector === '#stars-grid') await card.locator('img').click();
      else await card.click();
      await expect(dialog).toBeVisible(); await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(names[i]);
      const cardImage = await card.locator('img').getAttribute('src');
      const id = await card.getAttribute('data-id');
      if (selector === '#solar-grid' || selector === '#dwarf-grid') {
        expect(cardImage).toBe(`assets/${id}-space.webp`);
        await expect(dialog.locator('#dialog-image')).toHaveAttribute('src', id === 'mercury' ? 'assets/mercury-globe-nasa.jpg' : `assets/${id}.jpg`);
      } else if (selector === '#stars-grid') {
        expect(cardImage).toBe(id === 'sun' ? 'assets/sun-space.webp' : `assets/${id}-stellar.webp`);
        await expect(dialog.locator('#dialog-image')).toHaveAttribute('src', `assets/${id}.jpg`);
      } else await expect(dialog.locator('#dialog-image')).toHaveAttribute('src', cardImage);
      await expect.poll(() => dialog.locator('#dialog-image').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
      await expect(dialog.locator('dl div')).toHaveCount(5); await expect(dialog.locator('#dialog-extra')).not.toBeEmpty();
      await expect(dialog.locator('#dialog-source')).toHaveAttribute('href', /^https:\/\//);
      await expect(dialog.locator('#dialog-credit')).not.toBeEmpty();
      await dialog.getByRole('button', { name: 'Close exhibit' }).click(); await expect(dialog).not.toBeVisible(); await expect(card).toBeFocused();
    }
  }
});
test('solar-system exhibits link to the verified NASA destination or object information', async ({ page }) => {
  await page.route('https://eyes.nasa.gov/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>NASA viewer test fixture</title>' }));
  const destinations = {
    sun: ['https://science.nasa.gov/sun/', 'https://eyes.nasa.gov/apps/solar-system/#/sun?embed=true'],
    mercury: ['https://science.nasa.gov/mercury/', 'https://eyes.nasa.gov/apps/solar-system/#/mercury?embed=true'],
    venus: ['https://science.nasa.gov/venus/', 'https://eyes.nasa.gov/apps/solar-system/#/venus?embed=true&logo=false'],
    earth: ['https://science.nasa.gov/earth/facts/', 'https://eyes.nasa.gov/apps/earth/?embed=true'],
    moon: ['https://science.nasa.gov/moon/', null],
    mars: ['https://science.nasa.gov/mars/facts/', 'https://eyes.nasa.gov/apps/solar-system/#/mars'],
    jupiter: ['https://science.nasa.gov/jupiter/', 'https://eyes.nasa.gov/apps/solar-system/#/jupiter?embed=true'],
    saturn: ['https://science.nasa.gov/saturn/', 'https://eyes.nasa.gov/apps/solar-system/#/saturn?embed=true'],
    uranus: ['https://science.nasa.gov/uranus/', 'https://eyes.nasa.gov/apps/solar-system/#/uranus?embed=true'],
    neptune: ['https://science.nasa.gov/neptune/', 'https://eyes.nasa.gov/apps/solar-system/#/neptune?embed=true'],
    pluto: ['https://science.nasa.gov/dwarf-planets/pluto/', 'https://eyes.nasa.gov/apps/solar-system/#/134340_pluto?embed=true']
  };
  for (const [id, [info, view]] of Object.entries(destinations)) {
    await page.locator(`#${id === 'pluto' ? 'dwarf-grid' : 'solar-grid'} [data-id="${id}"]`).click();
    const dialog = page.getByRole('dialog');
    const reference = dialog.locator('#dialog-reference');
    await expect(reference).toHaveAttribute('href', info);
    await expect(reference).toHaveAttribute('target', '_blank');
    await expect(reference).toHaveAttribute('rel', 'noopener noreferrer');
    const source = dialog.locator('#dialog-source');
    await expect(source).toHaveAttribute('href', /^https:\/\/images\.nasa\.gov\/details\//);
    await expect(source).toHaveAttribute('target', '_blank');
    await expect(source).toHaveAttribute('rel', 'noopener noreferrer');
    if (view) {
      await expect(dialog.getByRole('link', { name: /View in NASA 3D/ })).toHaveCount(0);
      await expect(dialog.locator('iframe')).toHaveCount(0);
      await dialog.getByRole('button', { name: 'View in 3D' }).click();
      const viewer = page.locator('#nasa-viewer-dialog');
      await expect(viewer).toBeVisible();
      await expect(viewer.locator('iframe')).toHaveAttribute('src', view);
      await expect(viewer.locator('#nasa-viewer-title')).toHaveText(await dialog.locator('#dialog-title').textContent());
      await expect(viewer.getByRole('link', { name: /Open on NASA/ })).toHaveAttribute('href', view);
      await viewer.getByRole('button', { name: 'Close 3D viewer' }).click();
      await expect(dialog.getByRole('button', { name: 'View in 3D' })).toBeFocused();
    } else {
      await expect(dialog.getByRole('link', { name: /View NASA information/ })).toBeVisible();
      await expect(dialog.getByRole('link', { name: /View in NASA 3D/ })).toHaveCount(0);
    }
    if (id === 'mercury') {
      await expect(dialog.locator('#dialog-image')).toHaveAttribute('src', 'assets/mercury-globe-nasa.jpg');
      await expect(dialog.locator('#mercury-surface img')).toBeVisible();
      await expect(dialog.locator('#mercury-surface a')).toHaveAttribute('href', 'https://images.nasa.gov/details/PIA18372');
    } else await expect(dialog.locator('#mercury-surface')).toBeHidden();
    await dialog.getByRole('button', { name: 'Close exhibit' }).click();
  }
});
test('NASA 3D opens separately at near-full-screen size and restores the exhibit', async ({ page }, testInfo) => {
  // Keep this test deterministic; NASA controls the remote application and WebGL.
  await page.route('https://eyes.nasa.gov/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>NASA viewer test fixture</title>' }));
  await page.locator('#solar-grid [data-id="mercury"]').click();
  const dialog = page.locator('#exhibit-dialog'), toggle = dialog.getByRole('button', { name: 'View in 3D' });
  await toggle.focus(); await page.keyboard.press('Enter');
  const viewer = page.locator('#nasa-viewer-dialog'), frame = viewer.locator('iframe');
  await expect(viewer).toBeVisible(); await expect(dialog).toHaveAttribute('open', '');
  await expect(frame).toBeVisible(); await expect(frame).toHaveAttribute('src', 'https://eyes.nasa.gov/apps/solar-system/#/mercury?embed=true');
  await expect(frame).toHaveAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
  await expect(frame).toHaveAttribute('title', /Mercury/);
  await expect(viewer.getByRole('button', { name: 'Close 3D viewer' })).toBeFocused();
  await expect(viewer.getByText('Viewer blocked?', { exact: false })).toBeVisible();
  const nasa = viewer.getByRole('link', { name: /Open on NASA/ });
  await expect(nasa).toHaveAttribute('target', '_blank'); await expect(nasa).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.locator('body')).toHaveClass(/dialog-open/);
  const viewport = testInfo.project.use.viewport, box = await viewer.boundingBox(), iframeBox = await frame.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(viewport.width * .94);
  expect(box.height).toBeGreaterThanOrEqual(viewport.height * .94);
  expect(iframeBox.width).toBeGreaterThanOrEqual(box.width - 3);
  expect(iframeBox.height).toBeGreaterThan(box.height - 100);
  await page.setViewportSize({ width: 320, height: 600 });
  await expect.poll(async () => (await viewer.boundingBox()).width).toBe(320);
  await expect.poll(async () => (await viewer.boundingBox()).height).toBe(600);
  const mobileBox = await viewer.boundingBox();
  expect(mobileBox.width).toBe(320); expect(mobileBox.height).toBe(600);
  await frame.focus();
  await viewer.getByRole('button', { name: 'Close 3D viewer' }).click();
  await expect(viewer).not.toBeVisible(); await expect(frame).toHaveCount(0);
  await expect(dialog).toBeVisible(); await expect(toggle).toBeFocused();
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(viewer).not.toBeVisible(); await expect(frame).toHaveCount(0);
  await expect(dialog).toBeVisible(); await expect(toggle).toBeFocused();
  await expect(page.locator('body')).toHaveClass(/dialog-open/);
  await dialog.getByRole('button', { name: 'Close exhibit' }).click();
  await expect(page.locator('body')).not.toHaveClass(/dialog-open/);
});
test('dialog supports keyboard, backdrop dismissal, and locks the background', async ({ page }) => {
  const card = page.locator('#solar-grid .exhibit-card').first(); await card.focus(); await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible(); await expect(dialog.getByRole('button', { name: 'Close exhibit' })).toBeFocused();
  await expect(page.locator('body')).toHaveClass(/dialog-open/); await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(card).toBeFocused();
  await card.click(); await page.mouse.click(2, 2); await expect(dialog).not.toBeVisible(); await expect(page.locator('body')).not.toHaveClass(/dialog-open/);
});
test('distance experiment calculates one-way light times and explains approximations', async ({ page }) => {
  const select = page.getByLabel('Choose a destination');
  for (const [value, result, detail] of [['moon','1.3 seconds','384,400 km'],['sun','8 minutes 19 seconds','1 AU'],['earth','0.0 seconds','0 km'],['mars','12 minutes 31 seconds','225 million km'],['proxima','about 4.24 years','4.24 light-years'],['andromeda','about 2.5 million years','2.5 million light-years']]) {
    await select.selectOption(value); await expect(page.locator('#distance-result')).toHaveText(result); await expect(page.locator('#distance-detail')).toContainText(detail);
  }
  for (const value of ['mercury','venus','jupiter','saturn','uranus','neptune','sirius','vega','polaris','betelgeuse']) { await select.selectOption(value); await expect(page.locator('#distance-result')).not.toBeEmpty(); }
  await expect(page.locator('#universe')).toContainText('Planetary distances vary with orbital positions');
});
test('skip link, mobile layout, reduced motion, and creator link work', async ({ page }, testInfo) => {
  await page.keyboard.press('Tab'); const skip = page.getByRole('link', { name: 'Skip to content' }); await expect(skip).toBeFocused(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/#main$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(testInfo.project.use.viewport.width);
  await expect(page.locator('.site-header nav')).toBeVisible(); await expect(page.locator('#destination')).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  const link = page.locator('a[href="https://github.com/ramasham"]'); await expect(link).toHaveAttribute('target','_blank'); await expect(link).toHaveAttribute('rel','noopener noreferrer');
});
