# SigilLab

SigilLab is a mystical emotional reading app built with the Next.js App Router, TypeScript, and Tailwind CSS. It currently includes:

- a ritualized homepage flow at `/`
- a productized reading result page at `/result`
- a share-card style preview at `/share`
- a dark admin surface under `/admin`

## Getting Started

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Privacy Boundary

SigilLab currently accepts a full birth date in the browser UI, but the raw date is only used locally on the client to derive lower-sensitivity profile fields before navigation.

The system does not retain or forward the full birth date in:

- the result URL
- the server-side reading pipeline
- the admin reading records

The reading flow now uses only these derived fields:

- `birthYear`
- `ageBand`
- `westernZodiac`

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Notes

- DeepSeek is used as the first-pass text model when configured.
- The reading flow falls back to a mock generator when AI credentials are missing or the provider response is invalid.
- Admin pages currently use local mock data and read-only structure intended for future expansion.

## Deployment

Any standard Next.js deployment target will work as long as the runtime environment can provide optional DeepSeek environment variables.
