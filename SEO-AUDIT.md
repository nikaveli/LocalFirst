# LocalFirst SEO audit

September 10, 2026 (Mountain Time)

## Executive summary

The rebuild has a solid technical foundation: server-rendered content, four clear routes, original local work and consistent contact information. All four routes scored **100/100 in Lighthouse SEO** and the production regression suite passed **220 checks** after corrections. Priorities are releasing the corrected crawl configuration, improving mobile loading without disrupting the approved hero, and developing focused service/case-study content. This is not certification of rankings, indexation, rich results, or a pass in every audit product.

The SEO audit skill guided technical/on-page, keyword and competitor review; the deployment checklist guided release preparation. No Search Console, analytics, Ahrefs or Semrush connector is available, so volumes, rankings, backlinks and field Core Web Vitals are not claimed.

## Evidence

| Page | Lighthouse SEO | Mobile performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 65 | 7.0 s | 450 ms | 0 |
| About | 100 | 89 | 3.7 s | 20 ms | 0 |
| Contact | 100 | 95 | 2.9 s | 10 ms | 0 |
| First Impressions | 100 | 78 | 6.0 s | 10 ms | 0 |

Single Lighthouse 13.4.1 mobile simulated-throttling runs, local production build before the release dependency update. These are lab results, not live 28-day Core Web Vitals; TBT is not INP. The baseline home also scored 100 SEO despite lacking a sitemap and canonical, illustrating the score's limited scope.

- `npm run seo:check -- http://localhost:3002`: 220 passing checks; 57 internal links/fragments and 54 image/media/script/style assets.
- Checked server-rendered metadata, one H1 per route, language/viewport, indexing directives, JSON-LD, alt attributes, canonical/social tags, 15 discoverable gallery video sources, robots, sitemap, 404s and www redirect.
- Reports: `/private/tmp/localfirst-seo-{home,about,contact,first-impressions}.json` and `/private/tmp/localfirst-seo-before-home.json`.
- Prior visual/responsive/interaction evidence is in `QA-AUDIT.md`. This SEO pass did not change hero composition, choreography, typography or layout.

Release dependency check: Next.js was updated from 16.2.6 to 16.3.4, alongside compatible OpenNext/Cloudflare tooling; `npm audit fix` applied compatible transitive fixes. The final full dependency audit reports zero known vulnerabilities. Both Next.js and Cloudflare production builds pass. The patched Next build passes 219 regression checks (one fewer generated asset than the earlier 220-check build).

The patched Cloudflare Workers preview also passes all 219 checks. Final post-upgrade Lighthouse SEO rechecks remain 100/100 on all four routes; reports use `/private/tmp/localfirst-seo-final-*.json`. HTTP-to-HTTPS must be enforced at the hosting edge: a header-based application rule was tested and removed because the Workers preview did not preserve the intended HTTPS destination. The www canonical redirect passes in both runtimes.

### Public release verification

The replacement was pushed to `nikaveli/LocalFirst` main and deployed successfully through [GitHub Actions run 34549143030](https://github.com/nikaveli/LocalFirst/actions/runs/34549143030). On the public domain, all four pages, 57 internal links/fragments and 53 assets passed the regression suite. Two parser fixtures were added so Cloudflare's training-bot exclusions are not mistaken for Google Search restrictions: **221 checks passed live**. Live homepage Lighthouse SEO also scored **100/100** (`/private/tmp/localfirst-seo-live-home.json`). Browser checks confirmed the new logo, page navigation, all three home films loaded, and a gallery video playing without a media error.

The initial live check found HTTP still returned 200. A native Cloudflare wrapper (`worker.mjs`) was added to redirect production HTTP/www page requests before the framework adapter; six unit tests cover exact host matching, path/query preservation, localhost and loop prevention. This is distinct from the removed header-based framework rule. No Cloudflare AI-training restrictions were changed. Image transformation service was not enabled; production can serve originals without an Images binding, so local performance scores must not be presented as live scores.

## Findings and corrections

| Page/scope | Issue | Severity | Resolution |
| --- | --- | --- | --- |
| Home | Missing canonical | High | Added self-referencing HTTPS apex canonical |
| All pages | Subpages inherited home Open Graph; no share images/Twitter cards | Medium | Unique route-specific metadata with absolute image URL and alt |
| Supporting pages | Short generic descriptions | Medium | Service/location-relevant titles and descriptions |
| Rebuild | Missing robots.txt and sitemap.xml | High | Cached routes; exactly four canonical pages |
| Existing live robots | Disallowed `/_next/` | High | Rebuild permits rendering assets; verify Cloudflare combined output after release |
| Existing live sitemap | Retained `/diy-google-profile` | Medium | Excluded; removed DIY routes return actual 404/noindex |
| Business schema | ProfessionalService lacked public address; serviceType on wrong entity | Medium | Organization, WebSite, four Services and route-specific page schema |
| Gallery | Video source URLs only appeared after interaction | Medium | Server-rendered sources, retaining `preload="none"` |
| Existing live hosts | HTTP and www returned 200 | High | Tested www-to-HTTPS-apex 308; edge HTTP redirect remains a launch check |

Titles are 55–57 characters and descriptions 155–157: editorial ranges, not Google hard limits. Expressive H1s were preserved; an exact-match keyword in every H1 is not a technical requirement. No hidden SEO text, fake review stars or invented physical address was added.

Google needs access to scripts and layout resources to render pages. [JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Organization schema avoids fabricating the physical address required for Google LocalBusiness eligibility. Self-serving review stars were deliberately omitted. [LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization), [review policy](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful).

## Technical checklist

| Check | Status | Detail |
| --- | --- | --- |
| Crawlability/server rendering | Pass locally | Four HTTP 200 pages with content and links in initial HTML |
| Robots/sitemap | Pass locally | Assets allowed; no DIY or fabricated current lastmod timestamps |
| Canonicals/social cards | Pass locally | Unique HTTPS targets and page metadata |
| Internal links/assets | Pass locally | 57 links/fragments and 54 assets |
| Missing pages | Pass locally | Real 404/noindex, no misleading homepage canonical |
| Structured data | Pass locally | JSON/properties checked; live rendered validation still required |
| Mobile layout | Pass in prior QA | 48 route/viewport combinations; physical devices not certified |
| Mobile loading | Warning | Home/gallery LCP requires work; no CWV pass claimed |
| HTTPS/duplication | Warning | Public HTTPS responds; verify/enable edge HTTP redirect |
| Mixed content | Pass locally | No insecure embedded HTTP resources found |
| External links/trust | Warning | No ordinary external HTTP anchors in app components; add exact Google/BBB profile proof links once confirmed |
| Indexation/manual actions | Warning | Requires Search Console access and rendered URL inspection |
| Reviews/credentials | Warning | Static owner-supplied numbers/ages/credentials, not newly verified |
| Video indexing | Warning | Sources discoverable; gallery is not a dedicated watch-page strategy |

Home clips total roughly 30 MB desktop and 16.5 MB mobile. Lighthouse flags image delivery, resource priority, render-blocking resources and JavaScript. Responsive posters and staged video loading need separate slow-network and reverse-scroll testing while preserving approved animation. No fabricated VideoObject upload dates were derived from month/year labels. [Google video guidance](https://developers.google.com/search/docs/appearance/video).

## Keyword opportunities

Research hypotheses, not measured search volumes. Difficulty, demand and rankings require an SEO data provider. Priority means business fit/conversion intent, not a measured opportunity score. Connect Ahrefs/Semrush for precise volume and difficulty; no integration was purchased or installed.

| Keyword | Difficulty | Fit priority | Rank | Intent | Content |
| --- | --- | --- | --- | --- | --- |
| Google Business Profile optimization Denver | Unmeasured | High | Unknown | Commercial | Service page |
| Google Business Profile optimization Aurora | Unmeasured | High | Unknown | Commercial | Service page with real local examples |
| Google Business Profile photography Denver | Unmeasured | High | Unknown | Transactional | Home/photography detail |
| Google Business Profile photography Aurora | Unmeasured | High | Unknown | Transactional | Photography case study |
| business photography Denver | Unmeasured | High | Unknown | Commercial | Photography service |
| business photography Aurora | Unmeasured | High | Unknown | Commercial | On-site case study |
| commercial videography Denver | Unmeasured | High | Unknown | Commercial | Video service |
| business videography Aurora | Unmeasured | High | Unknown | Commercial | Video service/gallery |
| restaurant photography Denver | Unmeasured | High | Unknown | Transactional | Restaurant case study |
| restaurant photography Aurora | Unmeasured | High | Unknown | Transactional | Restaurant case study |
| med spa photography Denver | Unmeasured | High | Unknown | Transactional | Med spa case study |
| med spa videography Denver | Unmeasured | High | Unknown | Transactional | Video case study |
| 360 virtual tour photography Denver | Unmeasured | High | Unknown | Commercial | 360 service detail |
| 360 virtual tour photography Aurora | Unmeasured | High | Unknown | Commercial | 360 local example |
| Google Business Profile management Denver | Unmeasured | Medium | Unknown | Commercial | Ongoing vs one-time care |
| Google Maps photos for my business | Unmeasured | Medium | Unknown | Informational | Photo guidance |
| how much does business photography cost | Unmeasured | Medium | Unknown | Commercial | Pricing/inclusions FAQ |
| what photos should a Google Business Profile have | Unmeasured | Medium | Unknown | Informational | Photo-planning guide |

## Competitors and content gaps

Qualitative comparison from competitors' own pages, not rank tracking. [321 Digital](https://321digital.com/services/google-business-profile-optimization/) describes GBP inclusions, process and FAQs. [Moneta Strategies](https://www.monetastrategies.com/google-business/) describes optimization, reviews, insights and listing maintenance. This suggests coverage opportunities, not proof of superior rankings.

| Dimension | LocalFirst | 321 Digital | Moneta Strategies | Assessment |
| --- | --- | --- | --- | --- |
| Ranking keyword count | Unavailable | Unavailable | Unavailable | No winner inferred |
| Content depth | Four pages, 15-business gallery, home service offer | Dedicated GBP process/inclusions/FAQ | Dedicated GBP service explanations | Competitors have focused service coverage |
| Publishing frequency | Unmeasured | Unmeasured | Unmeasured | Unknown |
| Backlink signals | No dataset | No dataset | No dataset | Unknown |
| Technical score | Local SEO 100 on four routes | Not benchmarked | Not benchmarked | Not comparable |
| SERP features | Unmeasured | Unmeasured | Unmeasured | Unknown |

| Gap | Why / format | Priority | Effort/dependency |
| --- | --- | --- | --- |
| GBP optimization detail | Consideration-stage service page with scope/process/realistic outcomes | High | Half to full day |
| Photo/video/360 detail | Deliverables, rights and examples for distinct buyer intents | High | 1–2 days, owner facts |
| Restaurant/med spa proof | Original permission-backed case studies, no invented results | High | Multi-day, client permission |
| Pricing/ongoing-care questions | Visible FAQ on $497 scope, turnaround and follow-up | Medium | 1–2 hours plus owner answers |
| Individual video stories | Selected watch pages with context/transcripts/accurate dates | Medium | Multi-day |
| Review/credential provenance | Exact public Google/BBB links and checked totals | High | Under 2 hours, owner verification |

No arbitrary word count was imposed on Contact/About and no stale-content age claim was invented. Review ages and brand-reference claims still need confirmation. Avoid duplicate city doorway pages. DIY was not restored.

## Action plan

### Quick wins this week

1. Release fixes and inspect live robots, four-page sitemap, DIY 404, www 308 and HTTP-to-HTTPS. High impact; under 2 hours if hosting succeeds; depends on release access.
2. Inspect rendered URLs/selected canonicals/indexing/manual actions and submit sitemap in Search Console. High impact; under 1 hour plus processing; verified property access required.
3. Validate deployed JSON-LD with Schema.org Validator and Google's Rich Results Test. Medium impact; under 1 hour; no enhancement guarantee.
4. Verify reviews, price, hours, credentials and real-device SMS/email destinations. High trust impact; under 2 hours; owner confirmation required.

### Strategic investments

1. Media performance pass preserving approved creative treatment. High impact; half day to multi-day; slow-network/physical-device testing and agreement before hero behavior changes.
2. One GBP service page and two factual case studies. High relevance/conversion impact; multi-day; owner facts/client permissions.
3. Organic-conversion and field-performance measurement. High decision-making impact; half-day setup then real traffic; analytics/Search Console access and privacy choices. No tracking added here.
4. Genuine local mentions/client referrals. Medium long-term impact; ongoing; no paid/spam link schemes.

Next content options: service-page brief, case-study brief, content calendar or deeper competitor research. Titles and descriptions are already implemented.
