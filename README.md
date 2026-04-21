# Intelligence Query Engine (Backend Wizard)

A specialized Node.js backend that serves demographic profiles and features a Natural Language Processing (NLP) search engine to query data using human-like phrases.

## Tech Stack
- **Runtime:** Node.js / Express
- **Database:** SQLite3 (via Knex.js)
- **ID Standard:** UUID v7
- **Environment:** GitHub Codespaces

## Key Features
- **Natural Language Search:** Supports queries like "young males from Nigeria" or "females above 30".
- **Advanced Filtering:** Traditional GET endpoint with support for min/max age, probability thresholds, and sorting.
- **Idempotent Seeding:** Database seed script ensures no duplicate records are created on multiple runs.

## API Endpoints

### 1. Get All Profiles
`GET /api/profiles`
- **Parameters:** `gender`, `age_group`, `country_id`, `min_age`, `max_age`, `sort_by`, `page`, `limit`.

### 2. Intelligence Search
`GET /api/profiles/search?q={query}`
- **Example:** `/api/profiles/search?q=young+males+from+nigeria`

## Setup Instructions
1. Clone the repository.
2. Run `npm install`.
3. Run migrations: `npx knex migrate:latest --knexfile db/knexfile.js`.
4. Seed the data: `npx knex seed:run --knexfile db/knexfile.js`.
5. Start server: `node index.js`.