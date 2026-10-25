/* Run against a local production server. Playwright can be supplied via PLAYWRIGHT_MODULE. */
import { pathToFileURL } from 'node:url';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(path.join(process.env.PLAYWRIGHT_MODULE, 'index.mjs')).href : 'playwright');
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const output = path.resolve('.next/article-qa');
  fs.mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 1024, 768, 390, 375]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto(`${process.env.TEST_BASE_URL || 'http://localhost:3100'}/blog/engineering-sentinelapi-api-security-monitoring`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.screenshot({ path: path.join(output, `${width}-hero.png`) });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.verified-card').count(), 3);
      assert.equal(await page.locator('.sentinel-architecture').count(), 1);
      assert.equal(await page.locator('pre').count(), 3);
      assert.equal(await page.locator('pre').filter({ hasText: '```' }).count(), 0);
      assert.equal(await page.locator('pre').first().innerText(), '{\n  "code": "900902",\n  "message": "Missing Credentials"\n}');
      const pageFits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
      assert.ok(pageFits, `Page overflow at ${width}`);
      for (const image of await page.locator('article > figure > button > img, .blog-body figure > button > img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(element => element.decode());
        const dimensions = await image.evaluate(element => { const style = getComputedStyle(element); return { src: element.getAttribute('src'), width: element.getBoundingClientRect().width - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth), height: element.getBoundingClientRect().height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth), naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight }; });
        assert.ok(dimensions.naturalWidth > 0 && Math.abs(dimensions.width / dimensions.height - dimensions.naturalWidth / dimensions.naturalHeight) < 0.02, JSON.stringify(dimensions));
      }
      assert.equal(await page.locator('article > figure > button > img, .blog-body figure > button > img').count(), 9);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Loaded page overflow at ${width}`);
      await page.locator('.sentinel-architecture').scrollIntoViewIfNeeded();
      await page.locator('.sentinel-architecture').screenshot({ path: path.join(output, `${width}-architecture.png`) });
      for (const link of await page.locator('.article-toc a').all()) {
        const href = await link.getAttribute('href');
        assert.equal(await page.locator(`[id="${href.split('#')[1]}"]`).count(), 1);
      }
      const link = page.locator('.article-toc a').nth(4);
      await link.click();
      await page.waitForFunction(() => location.hash === '#section-5-rule-based-detection-evidence-backed-alerts');
      await page.waitForFunction(() => document.querySelector('.article-toc a[aria-current="location"]')?.getAttribute('href')?.endsWith(location.hash));
      const offset = await page.locator('#section-5-rule-based-detection-evidence-backed-alerts').evaluate(element => element.getBoundingClientRect().top);
      assert.ok(offset >= 80 && offset < 200, `Anchor offset ${offset} at ${width}`);
      await page.locator('.article-toc summary').click();
      assert.equal(await page.locator('.article-toc details').getAttribute('open'), null);
      await page.locator('.article-toc summary').click();
      assert.equal(await page.locator('.article-challenge').count(), 3);
      for (const button of await page.locator('.article-image-button').all()) {
        const expected = await button.locator('img').getAttribute('alt');
        const before = await page.evaluate(() => document.documentElement.clientWidth);
        await button.click();
        const viewer = page.locator('dialog[open]');
        const gallery = await viewer.locator('a').getAttribute('href');
        assert.equal(await viewer.locator('img').getAttribute('alt'), expected);
        assert.equal(await viewer.locator('p').innerText(), expected);
        await viewer.locator('img').evaluate(image => image.decode());
        assert.equal(await page.evaluate(() => document.documentElement.clientWidth), before);
        await viewer.locator('img').click();
        assert.equal(await viewer.count(), 1);
        await viewer.getByRole('button', { name: 'Next →', exact: true }).click();
        const next = await viewer.locator('a').getAttribute('href');
        assert.notEqual(next, gallery);
        await page.keyboard.press('ArrowLeft');
        assert.equal(await viewer.locator('a').getAttribute('href'), gallery);
        await page.keyboard.press('ArrowRight');
        assert.equal(await viewer.locator('a').getAttribute('href'), next);
        await viewer.getByRole('button', { name: '← Previous', exact: true }).click();
        assert.equal(await viewer.locator('img').getAttribute('src'), gallery);
        assert.equal(await viewer.locator('p').innerText(), expected);
        await page.keyboard.press('Escape');
        assert.ok(await button.evaluate(element => element === document.activeElement));
      }
      for (const block of await page.locator('.article-code').all()) {
        await block.getByRole('button', { name: 'Copy code', exact: true }).click();
        assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n'), await block.locator('code').innerText());
      }
      const trigger = page.locator('.blog-body .article-image-button').first();
      await trigger.click();
      const modal = page.locator('dialog[open]');
      assert.equal(await modal.count(), 1);
      await page.keyboard.press('ArrowRight');
      await modal.getByRole('button', { name: 'Zoom to original size' }).click();
      assert.equal(await modal.getByRole('button', { name: 'Fit image to screen' }).getAttribute('aria-pressed'), 'true');
      assert.ok(await modal.locator('.article-lightbox-image').evaluate(element => element.scrollWidth > element.clientWidth));
      await modal.getByRole('button', { name: 'Fit image to screen' }).click();
      await page.keyboard.press('Tab');
      assert.ok(await modal.evaluate(element => element.contains(document.activeElement)));
      await page.screenshot({ path: path.join(output, `${width}-lightbox.png`) });
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog[open]').count(), 0);
      assert.ok(await trigger.evaluate(element => element === document.activeElement));
      await trigger.click();
      await page.getByRole('button', { name: 'Close image viewer' }).click();
      assert.equal(await page.locator('dialog[open]').count(), 0);
      await trigger.click();
      await page.mouse.click(2, 2);
      assert.equal(await page.locator('dialog[open]').count(), 0);
      await page.getByRole('button', { name: 'Copy code', exact: true }).first().click();
      assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, '\n'), '{\n  "code": "900902",\n  "message": "Missing Credentials"\n}');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://kaveesha-portfolio-khaki.vercel.app/blog/engineering-sentinelapi-api-security-monitoring');
      assert.ok(await page.getByRole('link', { name: 'Explore Project Case Study' }).count());
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: layout, image loading/aspect ratios, TOC anchors/active state, code/copy, lightbox keyboard/close/focus, canonical, console.`);
      await context.close();
    }
    const normal = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const normalPage = await normal.newPage();
    await normalPage.goto(`${process.env.TEST_BASE_URL || 'http://localhost:3100'}/blog/engineering-sentinelapi-api-security-monitoring`, { waitUntil: 'networkidle' });
    await normalPage.locator('.article-toc a').nth(1).click();
    await normalPage.waitForFunction(() => { const top = document.getElementById('section-2-system-architecture-key-trade-offs').getBoundingClientRect().top; return top >= 95 && top <= 125; });
    console.log('PASS normal-motion anchor scrolling alongside the existing portfolio scroll controller.');
    await normalPage.locator('.article-challenge').first().screenshot({ path: path.join(output, 'oauth-challenge.png') });
    const caseLink = normalPage.getByRole('link', { name: 'Explore Project Case Study' });
    assert.equal(await caseLink.getAttribute('href'), '/projects/sentinelapi');
    await caseLink.click();
    await normalPage.waitForURL('**/projects/sentinelapi');
    const articleLink = normalPage.getByRole('link', { name: 'Read Technical Article' });
    assert.equal(await articleLink.getAttribute('href'), '/blog/engineering-sentinelapi-api-security-monitoring');
    await articleLink.click();
    await normalPage.waitForURL('**/blog/engineering-sentinelapi-api-security-monitoring');
    assert.equal(await normalPage.getByRole('link', { name: 'View Source on GitHub' }).first().getAttribute('href'), 'https://github.com/Kaveesha23dil/sentinelapi');
    assert.equal((await normalPage.request.get(new URL('/blog', normalPage.url()).href)).status(), 200);
    console.log('PASS article/case-study round trip, GitHub destination, and blog index.');
    await normal.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
