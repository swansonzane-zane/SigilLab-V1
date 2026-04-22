# SigilLab

SigilLab is a mystical emotional reading product with a consumer-facing ritual flow and a lightweight admin console for operations, configuration, and observability.

Current product scope:

- `/` ritualized homepage intake
- `/result` generated emotional reading result
- `/share` share-card style preview
- `/admin/*` read-only operations console

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- DeepSeek chat completions with mock fallback

## Local Development

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) after the dev server starts.

### Validation

```bash
npm run lint
npm run build
```

## Environment Variables

Required only for live AI generation:

- `DEEPSEEK_API_KEY`

Optional:

- `DEEPSEEK_BASE_URL`
  default: `https://api.deepseek.com`
- `DEEPSEEK_MODEL`
  default: `deepseek-chat`

If `DEEPSEEK_API_KEY` is not present, SigilLab falls back to the local mock reading generator.

## Routes

### Frontend

- `/`
- `/result`
- `/share`

### Admin

- `/admin/dashboard`
- `/admin/readings`
- `/admin/prompts`
- `/admin/ai-providers`
- `/admin/configs`

## Current Data Flow

1. The homepage accepts a full birth date plus reading intent.
2. The browser locally derives lower-sensitivity fields from the birth date before navigation.
3. `/result` reads the derived reading input and calls `generateReading()`.
4. `generateReading()` uses DeepSeek first and falls back to the mock generator if AI is unavailable or invalid.
5. `/share` renders from a derived share model in `engine/share-model.ts`.
6. Admin pages currently read from local mock services under `services/`.

## Privacy Boundary

Raw birth date is only used in the browser for local derivation.

The system does not preserve full birth date in:

- the result URL
- the API reading route
- the server-side reading pipeline
- admin reading records

Current downstream reading fields are limited to:

- `birthYear`
- `ageBand`
- `westernZodiac`
- `intent`
- `language`

## Architecture Boundaries

- Frontend is responsible for input, generation flow orchestration, and share experience.
- Admin is responsible for operations, configuration visibility, and observability.
- AI provider access is centralized through engine/lib code, not page components.
- There is currently no administrator authentication or permission system.

## API Route

- `POST /api/reading`

This route:

- accepts the de-identified `ReadingInput`
- performs basic request validation
- calls `generateReading()`
- returns `ReadingOutput` JSON

The route does not contain provider-specific DeepSeek logic.

## Mock And Non-Persistent Modules

The following modules are still mock-backed or read-only:

- `services/readings-service.ts`
- `services/prompts-service.ts`
- `services/ai-providers-service.ts`
- `services/configs-service.ts`
- `services/metrics-service.ts`
- admin pages in general, which currently do not persist edits
- share card generation, which is derived locally and not exported as a file

## Handoff Notes

- Reading generation lives in `engine/` and `lib/ai/deepseek.ts`.
- The homepage and result pages should not call provider APIs directly.
- Privacy-sensitive input handling starts in `components/home-signal-form.tsx` and `engine/reading-profile.ts`.

## Next Suggestions

- Replace mock admin services with persistent data sources.
- Add authenticated admin access control.
- Introduce saved reading records and share exports.
- Expand language support beyond the current default behavior.
