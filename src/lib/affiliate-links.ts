/* <!-- TODO: Replace with real affiliate ID --> */
const AMAZON_AFFILIATE_TAG = 'religioncompa-20';
const AMAZON_PRODUCT_ID_REGEX = /^[A-Z0-9]{10}$/;
const PLACEHOLDER_MARKER_REGEX = /(placeholder|fake|dummy|sample|todo|test)/i;
const SUSPICIOUS_AMAZON_MARKER_REGEX = /(?:BUDDHA|HINDU|ISLAM|CHRIST|JUDA|SIKH|SHIN|JAIN|ZORO|BAHAI|CONF|TAO)/i;

export function extractAmazonProductId(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]{9,10})/i);
  return match?.[1]?.toUpperCase() ?? null;
}

export function isValidAmazonProductId(productId: string): boolean {
  const normalized = productId.trim().toUpperCase();
  return (
    AMAZON_PRODUCT_ID_REGEX.test(normalized) &&
    !PLACEHOLDER_MARKER_REGEX.test(normalized) &&
    !SUSPICIOUS_AMAZON_MARKER_REGEX.test(normalized)
  );
}

export function buildAmazonAffiliateUrl(productId: string): string {
  const normalized = productId.trim().toUpperCase();
  return isValidAmazonProductId(normalized)
    ? `https://www.amazon.com/dp/${normalized}?tag=${AMAZON_AFFILIATE_TAG}`
    : '';
}

export function buildAmazonSearchUrl(query: string): string {
  const normalized = query.trim();
  return normalized && !PLACEHOLDER_MARKER_REGEX.test(normalized)
    ? `https://www.amazon.com/s?k=${encodeURIComponent(normalized)}&tag=${AMAZON_AFFILIATE_TAG}`
    : '';
}
