# Project Specifications

## Goal & Purpose
The goal is to build a premium, high-contrast, editorial landing page for **LocalFirst** (a service helping Colorado local businesses keep their Google Business Profiles active and ready for AI-powered local search).

 Nicholas Molina (founder) will use this website to sell the **6-Month Google Profile Activity Package** ($997 one-time).

## Tech Stack
- **Framework**: Next.js App Router (latest)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Hosting/Deployment**: Vercel (designed to be easily deployable)

## Design System (Brand DNA Profile)
- **Graphite** (`#2C2C2C`): primary foundation, dark sections, footer, and dark text.
- **Bright Brick** (`#EE7828`): primary CTAs, links, active states, review stars, and conversion emphasis.
  - *Contrast rule*: Text on Bright Brick MUST be Graphite for accessibility.
- **Concrete** (`#C5BAAA`): calm editorial backgrounds, secondary copy on Graphite, and quiet separators.
- **Craft** (`#806D61`): raised surfaces, warm transition fields, and supporting depth.
- **Utility White** (`#FFFFFF`): text on Graphite or Craft where longer-form readability requires it; not a decorative brand accent.
- **Backgrounds**:
  - Graphite for full-bleed heroes, dark calls-to-action, and footer.
  - Concrete for editorial content sections.
  - Craft, or a Graphite/Craft derived tone, for elevated cards and warm transitions.
  - Do not introduce blue, gold, green, or unrelated decorative colors.
- **Typography**:
  - Display Font: `LocalFirstDisplay` or high-quality sans-serif fallback (Inter/Outfit), weight 400 (never bold), letter-spacing `-0.02em` or `-0.015em` on large headers.
  - Body Font: `LocalFirstSans` or high-quality sans-serif fallback (Inter), using Concrete on dark fields and Graphite on light fields.
- **Geometry**:
  - Buttons: Rounded pill (`rounded-full`, 100px).
  - Cards: Rounded extra large (`rounded-[24px]`).
  - Icon Containers: Rounded circle (`rounded-full`).
  - Spacing: 96px (`py-24`) vertical padding for major editorial sections.

## Page Layout & Sections
The landing page will be structured based on the content in `localfirst_completed_landing_page.jsx`:
1. **Header/Navigation**: Brand Logo, "Google Profile Help for Colorado Businesses" subtext, and call-to-action to Call Nicholas.
2. **Hero Section (Graphite background)**: Headline: "Most Local Businesses Are Not Ready for AI Local Search", primary call-to-action, phone details, and a floating comparison card illustrating neglected profile symptoms.
3. **Core Message (Concrete background)**: "Your Business May Be Active. But Your Google Profile Looks Abandoned."
4. **Checklist Section (Concrete background)**: Checklist of profile updates and key message: "Your competitor does not need to be better than you. They only need to look more current..."
5. **AI Search Reframe (Concrete/Graphite card split)**: "Customers Are No Longer Just Searching. They Are Asking AI Who To Trust." Comparing Old vs AI local search.
6. **Strong Profile Needs (Concrete background)**: 6 feature cards detailing the practical profile updates (Fresh Photos, Consistent Posts, Review Responses, Updated Services, 360° Visuals, Short Video).
7. **Offer Section (Bright Brick/Graphite split)**: Direct breakdown of the core offer.
8. **Target Audience (Concrete background)**: Who this is for and why the price makes sense.
9. **Direct CTA (Graphite background)**: Heavy visual banner prompting the customer to Call or Text Nicholas.
10. **Mission Statement**: "No Business Left Behind."
11. **Footer**: Copyright, contact details, and signature.

## Definition of Done
- A compiled, error-free Next.js application.
- Fully implemented Tailwind config representing the brand colors, border radius, and typography custom styles.
- Pixel-perfect, high-contrast, premium page layout using Lucide icons.
- Responsive design from mobile up to desktop.
- `npm run build` succeeds without warnings or errors.
