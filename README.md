# Profile Card & Showcase Hub (`alikuxac.xyz`)

A modern, high-performance personal portfolio, project showcase, donation gateway, and resume hub built with **Next.js App Router** and powered by **Cloudflare Pages & D1 Edge Database**.

---

## ✨ Features

- **Automated GitHub Integration**: Internal Edge API proxy fetching real-time repository stats (stars, forks, releases, and push freshness) with zero token exposure and edge caching.
- **Dynamic Project Showcase**: Interactive project cards with lifecycle badges, technology pills, direct release links, and live demos.
- **Harvard-Style Resume (`/cv`)**: Clean, public curriculum vitae page formatted according to Harvard guidelines.
- **Admin Dashboard**: Full CRUD management for projects, social links, and donation channels with drag-and-drop reordering.
- **Donation Gateway**: Support for custom donation methods with automated VietQR code generation.
- **Analytics & SEO**: Built-in page view counter, OpenGraph / Twitter social preview metadata, and optimized edge caching.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS, `next-themes` (Dark/Light mode)
- **Backend & API**: Cloudflare Pages Functions (`functions/api/`)
- **Database**: Cloudflare D1 (Serverless SQLite) with **Drizzle ORM**
- **Deployment**: Cloudflare Pages (Serverless / Edge)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alikuxac/profile-card.git
   cd profile-card
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Preview with Cloudflare Pages Functions (Wrangler):
   ```bash
   npm run build
   npm run preview
   ```

---

## 🗄️ Database Management

Generate and apply D1 database migrations locally:

```bash
# Generate migration files from schema
npm run db:generate

# Apply migrations to local D1 database
npm run db:migrate:local
```

---

## 🔑 Environment Variables

Configure the following environment variables in your Cloudflare Pages Dashboard or in `.dev.vars` for local development:

| Variable | Required | Description |
| :--- | :---: | :--- |
| `ADMIN_SECRET` | Yes | Secret passphrase to authenticate Admin Dashboard endpoints. |
| `GITHUB_TOKEN` | Optional | GitHub Personal Access Token to raise REST API rate limits to 5,000 req/h. |

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
