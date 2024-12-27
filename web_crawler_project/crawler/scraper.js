const puppeteer = require('puppeteer');

async function scrapeDynamicContent(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Emulate infinite scrolling if needed
    let previousHeight;
    do {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForTimeout(1000); // Wait for content to load
    } while ((await page.evaluate('document.body.scrollHeight')) > previousHeight);

    const content = await page.content();
    await browser.close();
    return content;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    await browser.close();
    return null;
  }
}

module.exports = { scrapeDynamicContent };
