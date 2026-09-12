# Zubin Qayam Portfolio

## Professional portfolio for business development, digital strategy, workflow automation, AI-assisted productivity, and public-safe project documentation.

**Advancing professional growth through smart technology.**

## Project Overview

This is a professional portfolio website for **Zubin Qayam**, presenting business development, digital strategy, workflow automation concepts, data dashboards, AI-assisted productivity experiments, and professional brand projects.

## Why This Project Exists

The portfolio provides a clear public-facing record of professional interests, prototype software, project documentation, and general operations concepts. It is designed to make selected work understandable to professional, creative, and technical audiences.

## What the Portfolio Contains

- Business development and digital strategy positioning
- Workflow automation and general operations concepts
- AI-assisted productivity experiments
- Data dashboards and visual project documentation
- Prototype software and professional brand projects

## Target Audience

This portfolio is intended for professional peers, prospective collaborators, hiring teams, technology audiences, and people interested in practical digital strategy and responsible automation concepts.

## Professional Context

The portfolio is a public-safe project space. The work represented here may include prototypes, experiments, research systems, and early-stage implementation work. Descriptions should remain grounded in documented evidence and should not imply customer deployment or enterprise readiness.

## Current Status

**Preview / Active professional brand project**

The site's content, visual assets, and project descriptions should be reviewed periodically for accuracy, privacy, accessibility, and claim scope.

## Architecture

This repository contains a root client-side Vite portfolio application and an isolated Python subsystem under `xv1/`. The frontend uses React and TypeScript, shadcn/ui-style components, Tailwind CSS, and supporting UI libraries from the package manifest. Its main entry points are `App.tsx`, `main.tsx`, and `index.html`.

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

- Build/runtime status: the local page currently cannot load because `index.html` references missing absolute `/assets` bundles. Verify `pnpm run dev` and the build output locally before release.
- Test status: no dedicated test script is currently defined in `package.json`.
- Lint status: currently fails because the configured script targets a missing `./src` directory.
- CI status: requires repository workflow review.
- Known limitations: portfolio content, visual assets, and referenced build assets require ongoing review.

## Safety / Privacy Notes

This repository is intended for public-safe portfolio content only. It must not include restricted organizational information, employer-specific material, private personal information, business-sensitive material, access credentials, private messages, or non-public process details.

Do not claim production readiness, customer deployment, commercial use, regulated use, formal validation, or enterprise readiness unless independently verified.

- Use demo, synthetic, or publicly available data only.
- Do not commit passwords, API keys, private keys, tokens, or real `.env` files.
- Review screenshots, sample content, links, and generated assets before publication.

## Links

- [GitHub profile](https://github.com/zubinqayam)
- [LinkedIn](https://www.linkedin.com/in/zubin-qayam-p-m-b22bb7170)
- [ZQ Labs GitHub profile README](https://github.com/zubinqayam/Zubin-Qayam)

## Roadmap

- Refine project summaries and evidence links.
- Add approved screenshots and demonstrations using public-safe data.
- Record verification status for featured projects.
- Keep professional claims aligned with documented experience and repository evidence.

## License

License status should be confirmed before external distribution. See the repository files and GitHub license metadata for the current project terms.
