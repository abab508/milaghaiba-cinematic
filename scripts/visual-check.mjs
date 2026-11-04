import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = 'http://127.0.0.1:4173/';
const browser = await chromium.launch({ headless: true });
const errors = [];
const assert = (condition, description) => {
  if (!condition) throw new Error(description);
  console.log('PASS', description);
};
async function checkViewport(width, height, name) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  page.on('pageerror', e => errors.push(name + ': ' + e.message));
  const response = await page.goto(base, { waitUntil: 'networkidle' });
  assert(response?.ok(), name + ': HTTP OK');
  assert(await page.locator('.hero').count() === 0, name + ': écran intermédiaire supprimé');
  await page.locator('.theme-reference-stage').waitFor({ state: 'visible' });
  assert(await page.locator('.theme-reference-image').evaluate(img => img.complete && img.naturalWidth > 0), name + ': image panoramique chargée');
  assert(await page.locator('.reference-hotspot').count() === 9, name + ': neuf thèmes interactifs');
  const themeLink = page.locator('.reference-nav-themes');
  const beforeHover = await themeLink.locator('span').evaluate(el => getComputedStyle(el, '::after').opacity);
  assert(Number(beforeHover) === 0, name + ': Themes has no permanent underline');
  await themeLink.hover({ force: true });
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.reference-nav-themes span'), '::after').opacity) > .5);
  assert(true, name + ': Themes underline appears on hover');
  await page.mouse.move(0,0);

  assert(await page.locator('.theme-item').count() === 0, name + ': anciennes cartes absentes');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  assert(!overflow, name + ': sans débordement horizontal');
  await page.screenshot({ path: 'previews/accueil-' + name + '.png', fullPage: true, animations: 'disabled' });
  await page.locator('.reference-hotspot').first().click();
  assert(await page.locator('.theme-detail').count() === 1, name + ': ouverture du thème');
  await page.locator('.detail-back').click();
  await page.locator('.reference-nav-home').click();
  assert(await page.locator('.theme-reference-stage').isVisible(), name + ': Accueil revient sur les neuf thèmes');
  await page.locator('.reference-nav-chapters').click();
  assert(await page.locator('.reference-panel').isVisible(), name + ': navigation chapitres');
  await page.locator('.reference-panel-close').click();
  await page.close();
}
try {
  await mkdir('previews', { recursive: true });
  await checkViewport(1440, 900, 'desktop');
  await checkViewport(390, 844, 'mobile');
  assert(errors.length === 0, 'aucune exception JavaScript: ' + errors.join('; '));
} finally {
  await browser.close();
}
