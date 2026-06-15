# Dev-in.tw Frontend — Rebuild Prompts

This document collects every prompt needed to build this project from scratch, ordered by build phase.
Each block is ready to paste into an AI coding agent (e.g. Claude Code).
Target stack: **Next.js 16 (App Router) + React 19 + TypeScript 6 + Tailwind CSS v4 + shadcn/ui + Biome + pnpm**.

> Project purpose: the frontend of a platform that lets Taiwanese developers register a personal subdomain.
> The frontend only handles UI and OAuth redirects; all data and secret exchange live in the backend
> (NestJS, `:3001`). The frontend runs on `:3000`.

---

## Phase 0 — Project bootstrap

```
Create a Next.js project with these requirements:
- Use the App Router, TypeScript, and pnpm
- Do NOT use a src/ directory; keep all code at the repo root
- Configure the path alias @/* to point at the repo root
- The dev script should use Turbopack
- Pin all packages to the latest stable versions (Next 16, React 19, TypeScript 6)
```

---

## Phase 1 — Tooling: Biome

```
This project uses Biome instead of ESLint + Prettier. Please:
- Install @biomejs/biome and create biome.json
- Code style: double quotes, semicolons, NO trailing commas, 2-space indent, 80 columns
- Enable the recommended rules, but turn off noExplicitAny and noArrayIndexKey
- Enable organizeImports
- Exclude components/ui/** and *.css from Biome (these will hold shadcn output and
  Tailwind directives later)
- Add package.json scripts: lint = "biome check", lintfix = "biome check --write",
  format = "biome format --write .", test = "biome check && next build"
```

---

## Phase 2 — Styling: Tailwind CSS v4 + shadcn/ui

```
Set up Tailwind CSS v4 (CSS-first, no tailwind.config.*) and shadcn/ui:
- Use @tailwindcss/postcss for PostCSS (postcss.config.mjs); no autoprefixer
- In styles/globals.css, configure via @import "tailwindcss"; define the theme with
  @theme inline + CSS variables (neutral base color, oklch), and the dark variant with
  @custom-variant
- Add tw-animate-css
- Create components.json (style: new-york, rsc, cssVariables, icon library = lucide,
  css pointing at styles/globals.css, alias @/components/ui, util @/lib/utils)
- Create the cn() helper in lib/utils.ts (clsx + tailwind-merge)
- Preserve the project-specific styles: black gradient background, custom webkit
  scrollbar, and a text-balance utility
```

```
Using shadcn/ui, create the following components under components/ui/ (new-york style,
data-slot convention, compatible with React 19 and Tailwind v4): button, card, input,
table, tooltip, avatar, dropdown-menu, plus a spinner built from lucide Loader2Icon +
animate-spin.
```

---

## Phase 3 — Environment variables

```
Create the environment variables and .env.example. Naming rule: only values that the
browser needs get the NEXT_PUBLIC_ prefix.
- NEXT_PUBLIC_API_URL: backend API base URL (used by the client-side axios)
- APP_URL: the frontend's public URL (server-only: metadata, OAuth callback redirect)
- GITHUB_CLIENT_ID: GitHub OAuth Client ID (used to build the authorize link on /login, server)
- GITHUB_REDIRECT_URI: OAuth callback path, matching /api/auth/callback/github
- GITHUB_CLIENT_SECRET: NOT used by the frontend (the backend /auth/github handles it);
  kept only for reference/parity
Make sure .gitignore already ignores .env and .env*.local.
```

---

## Phase 4 — API layer (nested class-based axios client)

```
Build a class-based, nested API client invoked from a singleton:
- api/client.ts: a standalone axios instance (baseURL = NEXT_PUBLIC_API_URL)
- api/index.ts: an ApiClient class that creates the shared axios instance in its
  constructor, holds .auth and .user, and default-exports the singleton apiClient
- api/auth/index.ts: AuthApi, holds .github
- api/auth/github/index.ts: GithubAuthApi, method post(code) -> POST /auth/github
- api/user/index.ts: UserApi, holds .info
- api/user/info/index.ts: UserInfoApi, method get(token) -> GET /user/info with a Bearer token
Usage should be apiClient.auth.github.post(code) and apiClient.user.info.get(token).
```

---

## Phase 5 — Types and mock data

```
Create the TypeScript types and mock data:
- types/userType.ts: the user data type (_id, githubId, email, name, avatar,
  primaryEmail, domain_names, premium, create_time, etc.)
- types/domainType.ts: the subdomain data type
- data/fakeOwnDomains.ts: mock data for the user's own subdomains (name + status, where
  status can be active/inactive/pending/reject/empty string)
- data/fakeDomains.ts: a string array of related subdomain names (mock)
```

---

## Phase 6 — Authentication flow (GitHub OAuth)

```
Implement the GitHub OAuth login flow (the frontend only redirects; secret exchange is
the backend's job):
1. app/login/page.tsx: a Server Component that builds the GitHub authorize URL from
   GITHUB_CLIENT_ID and GITHUB_REDIRECT_URI (scope=user:email) and redirect()s to it
2. app/api/auth/callback/[service]/route.ts: a route handler. Note that Next 16's params
   is a Promise and must be awaited. When service === "github", read ?code, call
   apiClient.auth.github.post(code) so the backend exchanges the token, then redirect to
   `${APP_URL}/callback?token=...`
3. app/callback/page.tsx: a client component that reads the token from the query and
   writes it to localStorage (usehooks-ts useLocalStorage), then redirects home. The
   useSearchParams call must be wrapped in Suspense
4. hooks/useUserAccount/index.tsx: read the localStorage token -> call /user/info to get
   the user, and return { token, userData, isLoading, isLogin, setIsLogin }
Also add a few simple app/api GET routes (returning Hello World) as examples.
```

---

## Phase 7 — Global layout, provider, theme

```
Build the global structure:
- app/provider.tsx: a client component wrapped with next-themes; the whole site is
  dark-only (attribute="class", forcedTheme="dark", enableSystem=false)
- app/layout.tsx: the RootLayout, importing styles/globals.css, applying Providers and
  Navbar. The content area is a vertical flex with h-[100dvh] (Navbar at 4rem, the rest
  scrollable, max-w 1024 centered). Use process.env.APP_URL as metadataBase, and set full
  OpenGraph / Twitter / keywords metadata (site name Dev-in.tw, author LAZCO STUDIO LTD).
  Set the viewport to dark.
```

---

## Phase 8 — Shared components

```
Build the shared components:
- components/Global/Navbar.tsx: a client component, sticky, 4rem tall. Logo on the left
  linking home; Discord / GitHub links on the right. Use useUserAccount to drive state:
  show a spinner while loading; when logged in show an avatar + dropdown-menu (name/email,
  a "subdomain settings" item, and a destructive "logout" item); when logged out show a
  rounded "Login" button that routes to /login. Use shadcn components throughout.
- components/Global/ThemeSwitch.tsx: a sun/moon toggle button (currently unused, kept for
  later). Its buttons need an explicit type.
- components/Icons/: three inline SVG components — Eye, Edit, Delete (1em, currentColor).
- components/Domain/PathCheck.tsx: use usePathname to check whether the current path matches.
- components/Domain/Status.tsx: return a colored Chinese status label based on the status string.
```

---

## Phase 9 — Pages

```
Build the pages:
- app/page.tsx: the home page. A large DEV-IN.TW heading (responsive sizing), a subtitle,
  and a SearchInput search box.
- components/Domain/SearchInput.tsx: a rounded search box built from the shadcn Input, with
  a fixed "https://" on the left and ".dev-in.tw" on the right; pressing Enter routes to
  /find?sub=<value>.
- components/Find/ResultCard.tsx: shows whether a given subdomain is available to claim
  (green check + name + a claim button); shows a hint when there is no input. Use
  useSearchParams to read sub.
- app/find/page.tsx: the search results page. A SearchInput + one primary result card + a
  "related results" list (map over fakeDomains). The useSearchParams call must be wrapped
  in Suspense.
- app/domain/layout.tsx: the left/right layout for the subdomain management page. Use a
  shadcn Card for the left menu (My Subdomains / DNS / Certificate / Extensions / Server,
  most marked as "in development", with PathCheck marking the active item) plus a right
  content area.
- app/domain/page.tsx: a shadcn Table listing the user's subdomains (three columns:
  subdomain / status / actions); the actions column wraps view / edit / delete icon buttons
  in Tooltips, with delete using the destructive style.
```

---

## Phase 10 — Verification

```
Run pnpm build and pnpm lint, and fix every TypeScript type error and Biome lint error
until both are green. Pay special attention to Next 16: route handler params must be
awaited, components using useSearchParams must be wrapped in Suspense, and buttons need an
explicit type.
```

---

## (Optional) If upgrading an existing project instead of building fresh

```
Upgrade the whole project to the latest: Next 14->16, React 18->19, TypeScript 5->6,
Tailwind 3->4; switch from ESLint+Prettier to Biome; and replace the deprecated
@nextui-org/react with shadcn/ui entirely. Along the way, audit every environment variable
and drop the NEXT_PUBLIC_ prefix from any value the browser does not need. Acceptance
criteria: both pnpm build and pnpm lint pass.
```
