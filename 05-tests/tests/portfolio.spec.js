const { test: base, expect } = require('@playwright/test');

// Install listeners before navigation and check them after each test, including failures.
const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`Console error: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`Uncaught exception: ${error.message}`));
    page.on('requestfailed', (request) => {
      errors.push(`Failed request: ${request.url()} (${request.failure()?.errorText})`);
    });
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`);
    });
    await use(page);
    expect(errors, 'The page should not produce console, JavaScript, or network errors').toEqual([]);
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('homepage presents its main headings and content', async ({ page }) => {
  await expect(page).toHaveTitle('Developer Portfolio | Backend & Systems');
  for (const heading of [
    "Curious about what's underneath.", 'A little about me.', 'Built to understand.',
    'Areas of practice.', "Let's connect.",
  ]) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
  for (const heading of ['webserv', 'ft_malloc', 'minishell', 'pipex', 'Inception', 'ft_transcendence']) {
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
  await expect(page.getByText('Contact details will be added here when available.')).toBeVisible();
  await expect(page.getByText('Memory allocation, Unix pipes, process execution')).toBeVisible();
});

test('site icon is available to browsers', async ({ page, request }) => {
  // Browsers fall back to /favicon.ico when no icon is declared in the page.
  const icon = page.locator('link[rel~="icon"]').first();
  const iconUrl = await icon.count() ? await icon.getAttribute('href') : null;
  const response = await request.get(new URL(iconUrl || '/favicon.ico', page.url()).href);
  expect(response.ok(), `Site icon returned HTTP ${response.status()}: ${response.url()}`).toBeTruthy();
  expect(response.headers()['content-type']).toMatch(/^image\//i);
});

const links = [
  ['brand', 'Inside the System', 'home'],
  ['navigation Home', 'Home', 'home'],
  ['navigation About', 'About', 'about'],
  ['navigation Projects', 'Projects', 'projects'],
  ['navigation Skills', 'Skills', 'skills'],
  ['navigation Contact', 'Contact', 'contact'],
  ['primary call to action', 'Explore the work', 'projects'],
  ['featured project', 'webserv HTTP/1.0 server', 'project-webserv'],
  ['skill ft_malloc', 'Seen in ft_malloc', 'project-malloc'],
  ['skill pipex', 'Seen in pipex', 'project-pipex'],
  ['skill webserv', 'Seen in webserv', 'project-webserv'],
  ['skill Inception', 'Seen in Inception', 'project-inception'],
  ['footer', 'Back to top', 'home'],
];

for (const [description, name, target] of links) {
  test(`${description} navigates to #${target}`, async ({ page }) => {
    const link = page.getByRole('link', { name, exact: false });
    await expect(link).toHaveAttribute('href', `#${target}`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`#${target}$`));
    await expect(page.locator(`[id="${target}"]`)).toBeInViewport();
  });
}

test('skip link is keyboard accessible and navigates to the main content', async ({ page }) => {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveAttribute('href', '#main');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('main')).toBeInViewport();
});

test('layout adapts to the viewport without horizontal overflow', async ({ page }, testInfo) => {
  const mobile = testInfo.project.name === 'mobile';
  const header = page.locator('.header-inner');
  const hero = page.locator('.hero-inner');
  const projects = page.locator('.featured-grid');
  const skills = page.locator('.skill-groups');
  await expect(header).toHaveCSS('flex-direction', mobile ? 'column' : 'row');
  // Computed grid tracks reflect actual rendered columns, rather than just viewport size.
  for (const grid of [hero, projects, skills]) {
    await expect.poll(async () => grid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length))
      .toBe(mobile ? 1 : 2);
  }
  const copy = await page.locator('.hero-copy').boundingBox();
  const art = await page.locator('.system-art').boundingBox();
  expect(copy).not.toBeNull();
  expect(art).not.toBeNull();
  if (mobile) expect(art.y).toBeGreaterThanOrEqual(copy.y + copy.height);
  else expect(art.x).toBeGreaterThanOrEqual(copy.x + copy.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(testInfo.project.use.viewport.width);
});
