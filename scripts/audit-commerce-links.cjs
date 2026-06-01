const fs = require('node:fs');
const path = require('node:path');

const AMAZON_PRODUCT_ID_REGEX = /^[A-Z0-9]{10}$/;
const PLACEHOLDER_MARKER_REGEX = /(placeholder|fake|dummy|sample|todo|test)/i;
const SUSPICIOUS_AMAZON_MARKER_REGEX = /(?:BUDDHA|HINDU|ISLAM|CHRIST|JUDA|SIKH|SHIN|JAIN|ZORO|BAHAI|CONF|TAO)/i;

const root = process.cwd();
const readingPath = path.join(root, 'src', 'app', '[locale]', 'religions', '[slug]', 'recommended-reading.ts');
const sacredItemsPath = path.join(root, 'src', 'lib', 'sacred-items.ts');

function extractAmazonProductId(url) {
  const match = url.match(/\/dp\/([A-Z0-9]{9,10})/i);
  return match?.[1]?.toUpperCase() ?? '';
}

function isValidAmazonProductId(productId) {
  const normalized = productId.trim().toUpperCase();
  return (
    AMAZON_PRODUCT_ID_REGEX.test(normalized) &&
    !PLACEHOLDER_MARKER_REGEX.test(normalized) &&
    !SUSPICIOUS_AMAZON_MARKER_REGEX.test(normalized)
  );
}

function buildAmazonSearchUrl(query) {
  const normalized = query.trim();
  return normalized && !PLACEHOLDER_MARKER_REGEX.test(normalized)
    ? `https://www.amazon.com/s?k=${encodeURIComponent(normalized)}`
    : '';
}

function auditRecommendedReading() {
  const source = fs.readFileSync(readingPath, 'utf8');
  const issues = [];
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    const amazonMatch = line.match(/amazonUrl:\s*'([^']+)'/);

    if (!amazonMatch) {
      return;
    }

    const amazonUrl = amazonMatch[1];
    const productId = extractAmazonProductId(amazonUrl);

    if (!productId) {
      issues.push({
        type: 'book',
        line: index + 1,
        message: 'Missing Amazon product ID in recommended reading entry',
        value: amazonUrl,
      });
      return;
    }

    if (!isValidAmazonProductId(productId)) {
      issues.push({
        type: 'book',
        line: index + 1,
        message: 'Suspicious Amazon product ID in recommended reading entry',
        value: productId,
      });
    }
  });

  return issues;
}

function auditSacredItems() {
  const source = fs.readFileSync(sacredItemsPath, 'utf8');
  const warnings = [];
  const lines = source.split(/\r?\n/);

  lines.forEach((line, index) => {
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    const amazonMatch = line.match(/amazonProductId:\s*'([^']*)'/);
    const name = nameMatch?.[1] ?? '';

    if (amazonMatch) {
      const amazonProductId = amazonMatch[1];
      if (!isValidAmazonProductId(amazonProductId)) {
        warnings.push({
          type: 'sacred-item',
          line: index + 1,
          message: buildAmazonSearchUrl(name)
            ? 'Placeholder Amazon product ID in sacred items catalog, search fallback will be used'
            : 'Invalid sacred-item Amazon data without usable search fallback',
          value: amazonProductId || name,
        });
      }
    }
  });

  return warnings;
}

function printIssues(title, issues) {
  if (!issues.length) {
    console.log(`${title}: OK`);
    return;
  }

  console.log(`${title}: ${issues.length} issue(s)`);
  issues.forEach((issue) => {
    console.log(`- line ${issue.line}: ${issue.message}`);
    console.log(`  ${issue.value}`);
  });
}

const bookIssues = auditRecommendedReading();
const sacredItemWarnings = auditSacredItems();
const totalIssues = bookIssues.length;

printIssues('Recommended reading audit', bookIssues);
printIssues('Sacred items audit warnings', sacredItemWarnings);

if (totalIssues > 0) {
  console.error(`\nCommerce audit failed with ${totalIssues} issue(s).`);
  process.exit(1);
}

if (sacredItemWarnings.length > 0) {
  console.log(`\nCommerce audit passed with ${sacredItemWarnings.length} sacred-item warning(s).`);
  process.exit(0);
}

console.log('\nCommerce audit passed.');
