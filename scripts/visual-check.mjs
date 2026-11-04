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
  await page.locator('h1').first().waitFor();
  assert(await page.locator('h1').first().innerText() === 'Les Hadiths', name + ': accueil');
  const assets = await page.locator('.scene img').evaluateAll(items =>
    items.map(img => ({ src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 }))
  );
  assert(assets.length === 4, name + ': quatre images de calques prévues');
  assert(assets.every(a => a.loaded), name + ': tous les calques images chargés (' + JSON.stringify(assets) + ')');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  assert(!overflow, name + ': sans débordement horizontal');
  await page.screenshot({ path: 'previews/accueil-' + name + '.png', fullPage: true, animations: 'disabled' });
  await page.getByRole('button', { name: /Commencer l’exploration/i }).click();
  await page.getByRole('heading', { name: 'Choisissez un thème' }).waitFor();
  assert(await page.locator('.theme-item').count() === 9, name + ': neuf thèmes');
  await page.screenshot({ path: 'previews/themes-' + name + '.png', fullPage: true, animations: 'disabled' });
  const q = page.locator('#theme-query');
  await q.fill('croyance');
  assert(await page.locator('.theme-item').count() === 1, name + ': recherche des thèmes');
  await page.locator('.theme-item').click();
  assert(await page.locator('.theme-detail').count() === 1, name + ': aperçu du thème');
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
