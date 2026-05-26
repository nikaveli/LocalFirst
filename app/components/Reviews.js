import { fetchGoogleReviews } from '../_data/reviews';
import ReviewsClient from './ReviewsClient';

/**
 * Server component — fetches reviews at render time, passes serializable
 * data to the client component that handles animation + interaction.
 *
 * If the fetch fails (missing key, network error, API quota), we render
 * nothing — the page just skips the section. Quiet failure mode.
 */
export default async function Reviews() {
  const data = await fetchGoogleReviews();
  if (!data || !data.reviews?.length) return null;
  return <ReviewsClient data={data} />;
}
