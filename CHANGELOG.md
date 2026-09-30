# Changelog

All notable changes to this project are documented in this file based on Git releases.

## [1.7.0] - Unreleased

### Added
- **GitHub Edge API Proxy (`functions/api/repo-stats/[repo].ts`)**:
  - Secure internal proxy using Web Standard `fetch()` with optional `GITHUB_TOKEN` support (up to 5,000 req/h).
  - **Three-Tier Fallback System**: Queries Latest Release Tag $\rightarrow$ Git Tags $\rightarrow$ Development Badge (`🏗️ In Development`).
  - Edge caching with `s-maxage=3600` and `stale-while-revalidate=86400`.
- **Refactored Project Card UI (`src/components/project-card.tsx`)**:
  - Added lifecycle badges (`Production`, `Open Source`), technology stack pills, and dynamic action buttons.
  - Always-visible metrics row displaying live stars ⭐, forks 🍴, version tag 🏷️, and relative push age 🕒.

---

## [1.6.0] - 2026-09-20

### Added
- **Harvard-Style CV (`/cv`)**: Added public Curriculum Vitae page structured according to Harvard guidelines.

---

## [1.5.0] - 2026-09-20

### Added
- **Donate & Admin Edit Functionality**: Added edit capability for links, projects, and donation methods with dynamic VietQR code generation.

---

## [1.4.0] - 2026-09-19

### Added
- **SEO & Social Metadata**: Added OpenGraph and Twitter card metadata for social media sharing.

---

## [1.2.4] - 2026-03-07

### Fixed
- **Edge Cache Optimization**: Switched to strict 15s `s-maxage` TTL to resolve edge update delays.

---

## [1.2.0] - 2026-03-07

### Added
- **Core Optimization**: Migration to Cloudflare Pages & D1 Database with drag-and-drop reordering.

---

## [1.0.0] - 2026-03-07

### Added
- Initial release of Next.js portfolio hub.
