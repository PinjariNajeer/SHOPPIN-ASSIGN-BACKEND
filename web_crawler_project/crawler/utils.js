const fs = require('fs-extra');

function saveUrls(domain, urls, filename = 'output.json') {
  const data = { [domain]: urls };
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Data saved to ${filename}`);
}

module.exports = { saveUrls };
