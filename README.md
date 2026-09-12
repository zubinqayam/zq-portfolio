# ZQ Labs Portfolio

## Corporate BD, Healthcare Operations & Smart Industry

This portfolio presents the professional focus of **Zubin Qayam**, a Healthcare Business Development & Marketing professional exploring AI-enabled workflow systems, automation, corporate medical services, occupational health, and industrial workforce solutions.

**Advancing Health & Industry Through Smart Technology.**

## Why This Project Exists

The site is a working portfolio for communicating professional experience, project interests, and early technical explorations at the intersection of healthcare business development, industrial operations, and responsible automation.

## What It Shows

- Professional positioning and business-development context
- Healthcare and occupational-health interests
- Industrial workforce and smart-operations concepts
- AI workflow, dashboard, and automation explorations
- Selected visual work and portfolio material

## Professional Context

ZQ Labs is a personal innovation workspace. The projects represented here may be research systems, prototypes, experiments, or early-stage implementation work. The portfolio is intended to make the work understandable to professional and technical audiences without implying customer deployment or clinical validation.

## Current Status

**Prototype** — active portfolio development and presentation work.

The site’s content, visual assets, and project descriptions should be reviewed periodically for accuracy, privacy, and claim scope.

## Architecture

This repository is a client-side Vite application using React and TypeScript. It uses shadcn/ui-style components, Tailwind CSS, and supporting UI libraries from the package manifest. The main application entry points are `App.tsx`, `main.tsx`, and `index.html`.

## Tech Stack

Verified from `package.json` and the repository structure:

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui and Radix UI components
- Framer Motion
- Recharts
- Lucide React

## How to Run

Prerequisite: Node.js and pnpm.

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm run dev
```

Create a production build:

```bash
pnpm run build
```

Run the configured linter:

```bash
pnpm run lint
```

## Verification

- Build status: currently fails because `index.html` references missing absolute `/assets` bundles; verify locally before release.
- Test status: no dedicated test script is currently defined in `package.json`.
- Lint status: currently fails because the configured script targets a missing `./src` directory.
- CI status: requires repository workflow review.
- Known limitations: portfolio content and visual assets require ongoing review; the site is not a healthcare delivery or clinical decision system.

## Safety / Privacy Notes

- Use demo, synthetic, or publicly available data only.
- Do not include patient data, confidential client data, hospital internal records, OP numbers, or insurance information.
- Do not commit passwords, API keys, private keys, tokens, or real `.env` files.
- Do not publish corporate contact data, pricing, proposals, contracts, or WhatsApp exports.
- This portfolio does not establish clinical validation, regulatory approval, customer deployment, or production readiness.

## Links

- [GitHub profile](https://github.com/zubinqayam)
- [LinkedIn](https://www.linkedin.com/in/zubin-qayam-p-m-b22bb7170)
- [ZQ Labs GitHub profile README](https://github.com/zubinqayam/Zubin-Qayam)

## Roadmap

- Refine project summaries and evidence links.
- Add approved screenshots and demonstrations using safe data.
- Record verification status for featured projects.
- Keep professional claims aligned with documented experience and repository evidence.

## License

License status should be confirmed before external distribution. See the repository files and GitHub license metadata for the current project terms.
