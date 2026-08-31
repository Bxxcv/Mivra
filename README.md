# README.md

## MIVRA – Supercharged LinkBio Platform

### What is MIVRA?
MIVRA is a **modern, over‑powered LinkBio service** that lets creators, influencers, and e‑commerce sellers showcase their brand, catalog, and portfolio on a single, beautiful landing page. It offers a **free tier** with essential features and a **premium tier** packed with advanced capabilities, making it a clear upgrade over LinkTree and similar tools.

### Key Features
- **Free Tier**
  - 5 free themes (customizable colors & fonts)
  - Up to 5 products in a simple catalog
  - Up to 10 social media links
  - Basic click analytics
- **Premium Tier**
  - Premium themes & layout options
  - Catalog up to 500 products with categories, search, and sorting
  - Full‑screen portfolio gallery (Vue micro‑frontend)
  - Order and revenue dashboard
  - Custom domain support
  - Advanced analytics (heatmaps, conversion rates)
  - Priority support & early feature access

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | **React (Next.js)** for main site, **Vue (Nuxt 3)** for gallery micro‑frontend |
| Backend | **Supabase** (Auth, PostgreSQL, Storage, Edge Functions) |
| Payments | **Stripe Checkout** (subscription + trial) |
| CI/CD | GitHub Actions → Vercel (frontend) + Supabase Deploy |
| UI Framework | Tailwind CSS + Headless UI |
| Design System | Shared component library (React & Vue) |
| Internationalization | Bahasa Indonesia (default) + English |

### Getting Started (Development)
```bash
# Clone repository
git clone https://github.com/your-org/mivra.git
cd mivra

# Install dependencies (npm workspaces)
npm install

# Set up Supabase project and create .env.local
cp .env.example .env.local
# Fill in SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_SECRET_KEY, etc.

# Run development servers
# React app (landing & user profiles)
npm run dev:react
# Vue micro‑frontend (gallery)
npm run dev:vue
```

### Folder Structure
```
Mivra/
├─ docs/                # PRD, DESIGN, ROADMAP, STRUKTUR
├─ packages/
│   ├─ react-app/      # Next.js app (public site, user profiles)
│   └─ vue-gallery/   # Nuxt 3 micro‑frontend for gallery
├─ supabase/            # Supabase migrations & edge functions
├─ public/              # Static assets (logo, icons)
└─ scripts/             # CI/CD helpers, deployment scripts
```

### Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Follow the **code style** (Prettier, ESLint) and **write tests**.
4. Submit a pull request with a clear description.

### License
MIT – see `LICENSE` file.
