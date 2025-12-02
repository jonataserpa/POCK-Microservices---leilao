# Changelog - Pock Microservices

## [Unreleased]

### Frontend Foundation Setup
- **Monorepo Initialization**:
  - Initialized Turborepo with `npm` in `frontend/`.
  - Renamed default apps to `portal-publico` and `painel-admin`.
  - Renamed `packages/ui` to `packages/ui-kit`.

- **Mock Server**:
  - Created `apps/mock-server` using `json-server`.
  - Populated `db.json` with Campaign, i18n, and Tenant data from PRD 005.

- **UI Kit Configuration**:
  - Installed Tailwind CSS, PostCSS, and Autoprefixer in `packages/ui-kit`.
  - Created `tailwind.config.js` and `postcss.config.js`.
  - Created base styles in `src/styles.css`.
  - Created basic `Button` and `Card` components.
  - Updated `package.json` exports to point to `src/index.tsx`.

- **App Configuration (`portal-publico` & `painel-admin`)**:
  - Updated dependencies to use `@repo/ui-kit`.
  - Installed Tailwind CSS dependencies.
  - Configured `tailwind.config.js` to include UI Kit paths.
  - Configured `globals.css` to import UI Kit styles.
  - Added `transpilePackages: ["@repo/ui-kit"]` to `next.config.js`.
  - **Fix**: Removed `postcss.config.js` from apps to resolve Turbopack compatibility issues (relying on Next.js defaults).
  - **Fix**: Converted `painel-admin` to CJS (removed `"type": "module"`) to resolve build issues.
  - **Fix**: Downgraded Tailwind CSS to v3 (`^3.4.1`) in all packages to resolve PostCSS plugin incompatibility errors with v4.
  - **Fix**: Restored `postcss.config.js` in apps after downgrading to v3.
  - **Fix**: Converted `portal-publico` to CJS (removed `"type": "module"`) to resolve ESM/PostCSS compatibility issues.

### Documentation
- Created `docs/roadmap-execucao.md`.
- Created `docs/frontend/CHANGELOG.md` (this file).

### Navigation & UI Improvements
- **Tenant Selection**:
  - Implemented `TenantSelectionModal` component in `ui-kit`.
  - Updated `Header` to trigger modal when menu links are clicked without a tenant context (Root Page).
- **Routing Fixes**:
  - Fixed 404 on Tenant Home Route (`/[tenantId]`) by redirecting to `/[tenantId]/leiloes`.
  - Fixed 404 on Car Detail Page (`/[tenantId]/[slug]/car/[carId]`).
  - Added "Back to Campaign" button on Car Detail Page.
  - Fixed Header Title link on Car Detail Page to redirect back to the Campaign Page.
- **Root Page**:
  - Fixed `CampaignCard` links on the homepage to correctly redirect to dynamic campaign routes.

### Documentation & Repository
- **Git**: Initialized repository and pushed to GitHub.
- **README**: Updated `README.md` with comprehensive project documentation, architecture overview, and setup instructions.

