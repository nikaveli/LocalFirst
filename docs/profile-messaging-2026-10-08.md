# Google Business Profile messaging update — October 8, 2026

## Purpose

Lead with the owner's customer-acquisition problem: a profile created once may
not show today's dishes, drinks, specials, or business details. Present on-site
photos, video, and profile updates as the practical service, without promising
rankings, guaranteed customers, or unsupported search-volume statistics.

## Scope

- Homepage: food-photography/location H1, customer-focused supporting copy, an educational
  section, clearer gallery/monthly copy, and photography-specific text inquiries.
- Visual Refresh: descriptive photo-service/location H1, updated explanatory
  copy, set-and-forget FAQ, and the same photography inquiry CTA.
- Contact: consistent inquiry CTA; retain the owner's preferred email-draft flow.
- Websites, About, Contact, and Guides: descriptive visible H1s matching page intent.
- Home and Refresh: unique titles/descriptions, inherited by social/page schema.
- Preserve pricing, package inclusions, media, animation code, and existing URLs.

Keyword choices reflect actual services and locations, not measured search
volume or difficulty. H1s are visible, server-rendered text, not hidden keyword
blocks. Google crawl/index/ranking changes cannot be confirmed by local tests.
The owner's clarified positioning leads the homepage with food photography;
Google Business Profile is the platform where that content helps customers
understand what the restaurant offers. The dedicated Refresh page retains its
profile-specific heading. The owner approved pushing and publishing this release
on October 8, 2026. Deployment uses the existing GitHub Actions workflow so only
committed release files are built, excluding unrelated local work.

The owner confirmed the first package's delivery details: a 2–3-hour shoot,
20 photos total including 5 signature dish photos and 5 specials photos (drinks
or daily specials), with turnaround within one week. These are stated on the
$349 Visual Refresh card and service page/FAQ. The two five-photo groups are
included in the total, not extras. No counts or timing were changed for the
other one-time or monthly packages.

Training is a standalone alternative, not a photography add-on. The secondary
section below the monthly packages offers $497 one-time Google Business Profile
training: a two-hour on-site session, a take-home guide, and a one-hour follow-up.
It explicitly requires no photography booking and no monthly subscription. The
training inquiry opens an SMS draft identifying this offer. Existing photography
and monthly offers remain unchanged, with no new navigation item or DIY page.

Main inquiry buttons on Home, Visual Refresh, and Contact now say "Text Nick
about a photo shoot" and open a photography-specific draft. The homepage's
secondary hero link says "See photography packages," and its closing copy leads
with food photography. Google Business Profile remains a distribution platform
and supporting service. Training and website-service inquiries remain distinct.

## Release checks

Build and targeted ESLint; 15 motion unit checks; SEO/internal-link checks;
desktop and 360/440px layout/inquiry checks; homepage regression suite; WebKit
desktop/mobile zoom and native-sticky story regression checks. Verify live
headings, SMS destinations, and indexing directives after deployment.

No new dependencies, paid services, forms backend, or tracking are introduced.
Unrelated package changes, `lib/gsap.ts`, and `Praxis/` are excluded from this release.
If headings overflow, contact fails, or animations regress, revert this release
and redeploy the previous production commit `9eb1f11c70a6511822581a0cce77d5422165ddbb`.

Guidance checked: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
and [Google Business Profile local ranking guidance](https://support.google.com/business/answer/7091).
