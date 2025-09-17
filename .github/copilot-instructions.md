# Copilot Instructions for miraj-portfolio

## Project Overview
- This is a Next.js project (TypeScript, App Router) created with `create-next-app`.
- Main app code is in `src/app/` (entry: `page.tsx`, layout: `layout.tsx`).
- UI components are in `src/components/` (e.g., `Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`).
- Static assets are in `public/`.

## Key Workflows
- **Development:** Use `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`) to start the local server at http://localhost:3000.
- **Editing:** Edit `src/app/page.tsx` for the main page. Changes auto-refresh.
- **Styling:** Global styles in `src/app/globals.css`. Component-level styles use CSS modules or inline styles.
- **Build:** Use `npm run build` to create a production build.
- **Deployment:** Designed for Vercel, but standard Next.js deployment applies.

## Patterns & Conventions
- **Component Structure:** All UI components are functional React components using TypeScript. Props are typed explicitly.
- **File Naming:** Use PascalCase for React components (e.g., `Hero.tsx`).
- **Imports:** Use relative imports within `src/`.
- **No API routes** are present; this is a static portfolio site.
- **Font Optimization:** Uses `next/font` for loading and optimizing fonts (see README for details).

## External Dependencies
- Next.js, React, TypeScript, PostCSS (see `package.json` for full list).
- No custom server or backend logic.

## Examples
- To add a new section, create a new component in `src/components/` and import it in `src/app/page.tsx`.
- To update the hero section, edit `src/components/Hero.tsx`.

## References
- See `README.md` for getting started, build, and deployment instructions.
- See `next.config.ts` and `tsconfig.json` for project configuration.

## AI Agent Guidance
- Follow existing component and file structure.
- Use TypeScript and functional components for all new UI.
- Do not introduce backend logic or API routes.
- Keep all styling consistent with `globals.css` and component conventions.
