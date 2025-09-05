# CUMSA Web Application

A modern, modular web application for the Carleton University Muslim Students’ Association (CUMSA).

## Tech Stack
- **Framework:** Next.js 15 (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** framer-motion
- **UI:** shadcn/ui, custom components
- **Maps:** react-leaflet, leaflet
- **Testing:** Jest, React Testing Library, snapshot tests
- **CI:** GitHub Actions (see `.github/workflows/ci.yml`)

## Getting Started

### Prerequisites
- Node.js >= 22.18.0 (see `package.json`)
- Yarn (recommended)

### Setup
```sh
yarn install
```

### Development
```sh
yarn dev
```
- Starts the app locally at http://localhost:3000
- Uses Next.js with Turbopack for fast refresh

### Build
```sh
yarn build
```
- Builds the app for production

### Lint & Format
```sh
yarn lint
yarn format
```

### Run Tests
```sh
yarn test
```
- Runs all snapshot/component/page tests
- See `.github/workflows/ci.yml` for CI setup

## Project Structure

- `src/app/` — App routes, pages, and API endpoints
  - `layout.tsx`, `page.tsx` — Main layout and homepage
  - `about/`, `contact-us/`, `documents/`, etc. — Feature pages
  - `api/` — API endpoints (e.g., `/api/contact`)
- `src/components/` — All UI components, each in its own folder with colocated snapshot test
- `src/lib/` — Shared utilities (e.g., `db.ts`, constants)
- `public/` — Static assets (images, etc.)
- `__mocks__/` — Jest/RTL mocks for Next.js, leaflet, images, etc.
- `.github/workflows/ci.yml` — GitHub Actions workflow for CI

## Contributing

- Keep code modular and simple. Avoid cleverness; prefer clarity.
- All components must have a colocated snapshot test.
- Use only snapshot tests for UI unless testing an API endpoint.
- Use mocks for external dependencies in tests (see `__mocks__`).
- Follow the existing folder structure and naming conventions.
- Document any new features or changes in `Release_Notes.txt`.

## Support
- For questions, open an issue or contact the maintainers.

