# SigilLab

SigilLab is a small ritual-style web app that generates emotional readings and shareable sigil cards. It is built as an MVP: the core public flow works, admin controls exist for launch operations, and AI generation has a local fallback when DeepSeek is unavailable.

## Features

- Homepage reading intake with language support for English and Spanish.
- AI-backed result generation with safe mock fallback.
- Share preparation page that creates a share record and `/shared/[shareId]` landing page.
- Lightweight local i18n dictionaries.
- Energy economy MVP: daily free readings, share reward, sponsor reward placeholder, and mock premium mode.
- Admin pages for dashboard metrics, configs, prompts, readings, and AI provider visibility.
- Basic error and empty states for invalid routes, invalid shared seals, unavailable readings, and failed runtime rendering.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- DeepSeek chat completions
- Local JSON files for MVP data storage

## Local Development

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env.local
```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Required for live AI generation:

- `DEEPSEEK_API_KEY`: DeepSeek API key. If missing or invalid, SigilLab falls back to the local mock reading generator when fallback is enabled in admin configs.

Required for deployment clarity:

- `NEXT_PUBLIC_APP_URL`: Public app URL. Use `http://localhost:3000` locally and your Vercel URL or custom domain in production.
- `ADMIN_USERNAME`: Basic Auth username for `/admin` and `/api/admin/*`.
- `ADMIN_PASSWORD`: Basic Auth password for `/admin` and `/api/admin/*`.

Optional client-side analytics:

- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`: PostHog project token. If missing, analytics is disabled and the app continues normally.
- `NEXT_PUBLIC_POSTHOG_HOST`: PostHog ingest host. Defaults to `https://us.i.posthog.com`.

Optional DeepSeek overrides:

- `DEEPSEEK_BASE_URL`: defaults to `https://api.deepseek.com`
- `DEEPSEEK_MODEL`: defaults to `deepseek-chat`

## Build

Run launch checks before deploying:

```bash
npm run lint
npm run build
```

Start a production build locally:

```bash
npm run start
```

## Deploy To Vercel

1. Import the repository into Vercel.
2. Set the environment variables:
   - `DEEPSEEK_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` if analytics is enabled
   - `NEXT_PUBLIC_POSTHOG_HOST` if using a non-default PostHog region
3. Keep the default build command:

```bash
npm run build
```

4. Keep the default start behavior managed by Vercel.

The app does not depend on local absolute paths or the Codex worktree. MVP data uses local JSON files under `data/`; this is suitable for local launch validation, but not durable serverless production storage.

## Admin Routes

- `/admin/dashboard`: local metrics and launch health overview.
- `/admin/configs`: editable runtime configuration, including default language, fallback, share, energy, ads, and premium placeholders.
- `/admin/prompts`: prompt versions and active prompt selection.
- `/admin/readings`: generated reading records.
- `/admin/ai-providers`: configured AI provider surface.

## Admin Protection

Admin routes and admin API routes are protected with HTTP Basic Auth through `middleware.ts`.

- Protected paths: `/admin`, `/admin/*`, `/api/admin/*`
- Public paths remain open, including `/`, `/result`, `/share`, `/shared/*`, `/premium`, and `/api/reading`
- Configure `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your environment before deploying
- If admin credentials are missing, protected routes return `401 Unauthorized` instead of falling through

## PostHog Analytics

SigilLab uses `posthog-js` for minimal client-side funnel analytics. Initialization happens in `instrumentation-client.ts` only when `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is configured.

Tracked public events include:

- `landing_view`
- `generate_clicked`
- `reading_generated`
- `share_ritual_clicked`
- `share_page_view`
- `seal_poster_saved`
- `seal_link_copied`
- `ritual_card_saved`
- `shared_page_opened`
- `reveal_your_seal_clicked`
- `energy_gate_viewed`
- `sponsor_omen_clicked`
- `blessing_sent_clicked`

Admin paths are skipped by the analytics wrapper, and PostHog is not initialized when the first page load is under `/admin`. Events intentionally avoid full birth dates, names, emails, admin credentials, and free-form user input. Before larger paid distribution, add a formal privacy and consent strategy appropriate to the launch regions.

## Current MVP Scope

The launch-ready MVP includes:

- Public reading flow: `/` to `/result`
- Share flow: `/result` to `/share` to `/shared/[shareId]`
- Return-home flow from shared landing pages
- English and Spanish user-facing copy for the main flow
- DeepSeek generation with validation and fallback output
- Local admin controls for the settings needed to operate the MVP
- Basic monetization placeholders without real payments or ad SDKs

## Known Limitations

- No user accounts.
- No database; local JSON files are not durable production storage on Vercel.
- Admin is protected with Basic Auth, not a full login system.
- No Stripe, real premium entitlement, or real ad network.
- No anti-abuse system beyond a basic in-memory API rate limit.
- No long-term saved reading history for users.
- Only English and Spanish are supported.
