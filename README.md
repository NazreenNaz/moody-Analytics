# Credit Ratings Analytics Application

Minimal Angular implementation of the case study brief:

- Ratings Dashboard
- Issuer Detail View
- Multi-step Feedback Form

## Stack

- Angular 19
- TypeScript
- PrimeNG
- SCSS
- Angular Router
- Reactive Forms
- Nodejs

## Run

```bash
npm install
npm run start:api
npm start
```

Open `http://localhost:4200`.

To start both together in one terminal:

```bash
npm run start:all
```

The Angular app proxies `/api` requests to the Express backend on port `3000`.

## API Endpoints

```bash
GET  /api/issuers
GET  /api/issuers/:id
POST /api/feedback
```

## Frontend Data Integration

The frontend now uses Angular `HttpClient` in:

```bash
src/app/services/ratings.service.ts
```

The Express backend lives in:

```bash
backend/server.js
backend/data/mock-data.js
```

## Legacy Frontend Mock Data

The original frontend mock data file is still present for reference/tests:

```bash
src/app/data/mock-data.ts
```

## Notes

- Search, sorting, responsive layouts, loading states, validation, and feedback submission flow are included per the brief.
- Jest screen tests pass with `npm test`.
- TypeScript compilation passes with `./node_modules/.bin/tsc -p tsconfig.app.json --noEmit`.
- In this environment, `ng build` is hitting a native Node/macOS malloc crash during bundling, so bundle verification is blocked by the local runtime rather than TypeScript or Angular template errors.
- The backend uses the same mock payload values as the frontend case-study data.
