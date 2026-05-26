import 'server-only';

const PLACE_ID = 'ChIJrzJnf_2BbIcRg3WdViubCGo';

/**
 * Fetch the latest Google reviews for LocalFirst.
 *
 * - Runs ONLY on the server (server-only import enforces it).
 * - The Places API key (GOOGLE_PLACES_API_KEY) is never sent to the browser.
 * - Returns null on any error so callers can degrade gracefully.
 *
 * Caching: at build time the data is baked into the static HTML. To refresh
 * on production, redeploy — or set up a weekly GitHub Action cron that
 * triggers a Cloudflare deploy. Adding ISR with a configured incremental
 * cache (KV/R2) is the upgrade path if real-time refresh matters.
 */
export async function fetchGoogleReviews() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  const fields = 'name,rating,user_ratings_total,reviews,url';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=${fields}&reviews_sort=newest&key=${key}`;

  try {
    const res = await fetch(url, {
      // Hint to Next's data cache; on Cloudflare Workers we mostly rely on
      // build-time generation, but this keeps dev behavior sane.
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 'OK' || !data.result) return null;

    const r = data.result;
    return {
      name: r.name,
      rating: r.rating ?? null,
      totalReviews: r.user_ratings_total ?? 0,
      mapsUrl: r.url || `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
      reviews: (r.reviews || [])
        // Skip ratings-only reviews — the cards show a blockquote, so empty text
        // would render as an awkward empty card.
        .filter((rev) => (rev.text || '').trim().length > 0)
        .map((rev) => ({
          author: rev.author_name,
          rating: rev.rating,
          relativeTime: rev.relative_time_description,
          text: rev.text,
          profilePhoto: rev.profile_photo_url || null,
        })),
    };
  } catch {
    return null;
  }
}
