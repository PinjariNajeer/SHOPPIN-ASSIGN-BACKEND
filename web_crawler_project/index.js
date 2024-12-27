const { discoverUrls } = require('./crawler/urlDiscovery');
const { scrapeDynamicContent } = require('./crawler/scraper');
const { saveUrls } = require('./crawler/utils');

const baseUrl = 'https://example.com';
const patterns = ['/product', '/item', '/p'];

(async () => {
  console.log('Discovering URLs...');
  const urls = await discoverUrls(baseUrl, patterns);

  console.log(`Found ${urls.length} URLs. Scraping dynamic content...`);
  for (const url of urls) {
    const content = await scrapeDynamicContent(url);
    if (content) {
      console.log(`Scraped content from: ${url}`);
    }
  }

  saveUrls(new URL(baseUrl).hostname, urls);
})();
