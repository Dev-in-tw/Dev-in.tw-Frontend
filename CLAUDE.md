# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概要

Dev-in.tw 的前端：給台灣開發者註冊個人子網域的平台。前端只負責 UI 與授權轉址，**所有資料邏輯與 OAuth secret 交換都在後端**（Dev-in.tw-Backend，NestJS，預設跑在 `:3001`）。前端預設 `:3000`。

## 技術堆疊

Next.js 16（App Router + Turbopack）、React 19、TypeScript 6、Tailwind CSS v4、shadcn/ui（new-york）、Biome（lint + format）、pnpm。

## 常用指令

```bash
pnpm dev        # 開發 (Turbopack)
pnpm build      # 正式 build（含 TypeScript 型別檢查）
pnpm start      # 跑 build 後的產物
pnpm lint       # Biome check（lint + format 檢查），CI/驗收標準
pnpm lintfix    # Biome 自動修復（safe fixes）
pnpm format     # 只跑 Biome formatter
pnpm test       # = biome check && next build（完整驗收）
```

驗收一律以 `pnpm lint`（exit 0）與 `pnpm build` 成功為準。沒有單元測試框架，`test` script 實際上是 lint + build。

## 架構重點（跨檔案才看得懂的部分）

### API 層：class-based 巢狀 client
`@/api`（`api/index.ts`）匯出單例 `apiClient`，所有呼叫都從它出發：

- `ApiClient` → `.auth`（`AuthApi`）、`.user`（`UserApi`）
- `AuthApi` → `.github`（`GithubAuthApi`，`apiClient.auth.github.post(code)` → `POST /auth/github`）
- `UserApi` → `.info`（`UserInfoApi`，`apiClient.user.info.get(token)` → `GET /user/info`，帶 Bearer token）

全部共用同一個 axios instance（baseURL = `NEXT_PUBLIC_API_URL`）。**新增 endpoint** 的作法：在 `api/<domain>/<resource>/index.ts` 建一個 leaf class 包 axios instance，再到上層 domain class 把它接上去。
（註：`api/client.ts` 是另一個獨立 axios instance，目前未被巢狀 client 使用。）

### GitHub OAuth 登入流程（橫跨多檔）
1. `app/login/page.tsx`（**Server Component**）用 `GITHUB_CLIENT_ID` + `GITHUB_REDIRECT_URI` 組授權 URL 後 `redirect()` 到 GitHub。
2. GitHub 帶 `?code=` 導回 `app/api/auth/callback/[service]/route.ts`。此 route 把 code 丟給**後端** `apiClient.auth.github.post(code)`，由後端完成 secret 交換並回傳 token，再 `redirect` 到 `/callback?token=...`。
3. `app/callback/page.tsx`（client）把 token 寫進 `localStorage`（usehooks-ts）。
4. `hooks/useUserAccount` 讀 localStorage token → 打 `/user/info` → 對外提供 `{ token, userData, isLogin, isLoading, setIsLogin }`；`components/Global/Navbar.tsx` 消費它決定顯示登入鈕還是頭像選單。

**關鍵**：前端從不接觸 `GITHUB_CLIENT_SECRET`，secret 交換是後端的責任。

### 環境變數命名原則
只有「瀏覽器端會讀到」的值才加 `NEXT_PUBLIC_` 前綴：
- `NEXT_PUBLIC_API_URL` —— 唯一公開值（axios client 在 client component 用）。
- `APP_URL` / `GITHUB_CLIENT_ID` / `GITHUB_REDIRECT_URI` —— 只在 server 端使用（metadata、route handler、Server Component），不加前綴。
- `GITHUB_CLIENT_SECRET` —— 前端不使用，僅供參考對齊。

新增環境變數時先判斷它是 client 還是 server 端使用，再決定要不要 `NEXT_PUBLIC_`。範本見 `.env.example`。

### 樣式與 UI
- Tailwind v4 **全部設定都在 `styles/globals.css`**（沒有 `tailwind.config.*`）：`@import "tailwindcss"`、主題用 `@theme inline` + CSS 變數、dark variant 用 `@custom-variant`、自訂 utility 用 `@utility`。content 路徑自動偵測。
- PostCSS 用 `@tailwindcss/postcss`（`postcss.config.mjs`）。
- shadcn/ui 元件在 `components/ui/`，設定見 `components.json`（alias `@/components/ui`，工具 `cn` 在 `@/lib/utils`，icon library = lucide）。要新增 shadcn 元件可 `pnpm dlx shadcn@latest add <name>`。
- **整站只有深色模式**：`app/provider.tsx` 用 next-themes 並設 `forcedTheme="dark"`。
- 業務元件（非 shadcn）放在 `components/<Domain>/`、`components/Global/`、`components/Icons/`。

### Biome 設定要點（`biome.json`）
- 排除 `components/ui/**` 與 `*.css`（shadcn 產物 / Tailwind 指令 Biome CSS parser 不支援）。
- 程式碼風格：雙引號、結尾分號、**不加** trailing comma、2 空格縮排、80 字寬。
- `noExplicitAny` 與 `noArrayIndexKey` 已關閉（現有程式碼大量使用）。

## Next.js 16 注意事項
- Route handler 的 `params` 是 **Promise**，要 `await`（見 `[service]/route.ts`）。
- 任何用 `useSearchParams` 的元件都必須包在 `<Suspense>` 內，否則 build 會失敗（見 `app/find` 與 `app/callback`）。

## 其他
- Path alias：`@/*` → repo 根目錄。
- `data/` 下是 mock 假資料（`fakeDomains`、`fakeOwnDomains`），UI 目前接的是假資料，尚未串真實後端資料。
- 套件管理用 pnpm；`package.json` 的 `pnpm.onlyBuiltDependencies` 允許 `sharp` / `@parcel/watcher` 跑 build script。
