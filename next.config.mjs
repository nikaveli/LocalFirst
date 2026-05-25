/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

// Wire OpenNext's dev-time Cloudflare bindings (`getCloudflareContext`) so the
// app can be developed with `next dev` and still resolve Cloudflare-specific
// APIs locally. No-op in production builds.
if (process.env.NODE_ENV === 'development') {
  const { initOpenNextCloudflareForDev } = await import(
    '@opennextjs/cloudflare'
  );
  initOpenNextCloudflareForDev();
}

export default nextConfig;
