const axios = require('axios');
const cheerio = require('cheerio');

async function discoverUrls(baseUrl, patterns) {
  try {
    const { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);

    const urls = [];
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (patterns.some((pattern) => href.includes(pattern))) {
        urls.push(new URL(href, baseUrl).toString());
      }
    });

    return [...new Set(urls)]; // Remove duplicates
  } catch (error) {
    console.error(`Error fetching ${baseUrl}:`, error.message);
    return [];
  }
}

module.exports = { discoverUrls };
