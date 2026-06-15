# Dev-in.tw Frontend — 重建提示詞（Prompts）

這份文件收錄「從零做出這個專案」所需的全部 prompt，依建置順序分階段。
每個區塊都是可直接貼給 AI coding agent（如 Claude Code）的指令。
目標技術堆疊：**Next.js 16（App Router）+ React 19 + TypeScript 6 + Tailwind CSS v4 + shadcn/ui + Biome + pnpm**。

> 專案定位：給台灣開發者註冊個人子網域的平台前端。前端只負責 UI 與 OAuth 轉址，
> 所有資料與 secret 交換都在後端（NestJS，`:3001`）。前端跑 `:3000`。

---

## 階段 0 — 專案初始化

```
建立一個 Next.js 專案，需求如下：
- 使用 App Router、TypeScript、pnpm
- 不要用 src/ 目錄，所有程式碼放在 repo 根目錄
- 設定 path alias：@/* 對應 repo 根目錄
- dev script 使用 Turbopack
- 套件版本全部用最新穩定版（Next 16、React 19、TypeScript 6）
```

---

## 階段 1 — 工具鏈：Biome

```
這個專案用 Biome 取代 ESLint + Prettier。請：
- 安裝 @biomejs/biome 並建立 biome.json
- 程式碼風格：雙引號、結尾分號、不加 trailing comma、2 空格縮排、80 字寬
- 啟用 recommended 規則，但關閉 noExplicitAny 與 noArrayIndexKey
- 開啟 organizeImports
- 把 components/ui/** 與 *.css 排除在 Biome 之外（之後放 shadcn 產物與 Tailwind 指令）
- package.json 加上 scripts：lint = "biome check"、lintfix = "biome check --write"、
  format = "biome format --write ."、test = "biome check && next build"
```

---

## 階段 2 — 樣式：Tailwind CSS v4 + shadcn/ui

```
導入 Tailwind CSS v4（CSS-first，不要 tailwind.config.*）與 shadcn/ui：
- PostCSS 使用 @tailwindcss/postcss（postcss.config.mjs），不要 autoprefixer
- 在 styles/globals.css 用 @import "tailwindcss" 設定，主題以 @theme inline + CSS 變數
  定義（採 neutral base color、oklch），dark variant 用 @custom-variant
- 加入 tw-animate-css
- 建立 components.json（style: new-york、rsc、cssVariables、icon library = lucide、
  css 指向 styles/globals.css、alias @/components/ui、util @/lib/utils）
- 建立 lib/utils.ts 的 cn() helper（clsx + tailwind-merge）
- 保留專案專屬樣式：黑色漸層背景、自訂 webkit 捲軸、text-balance utility
```

```
用 shadcn/ui 在 components/ui/ 建立以下元件（new-york 風格、data-slot 慣例、
支援 React 19 與 Tailwind v4）：button、card、input、table、tooltip、avatar、
dropdown-menu，以及一個用 lucide Loader2Icon + animate-spin 的 spinner。
```

---

## 階段 3 — 環境變數

```
建立環境變數與 .env.example，命名原則：只有瀏覽器端會讀到的值才加 NEXT_PUBLIC_ 前綴。
- NEXT_PUBLIC_API_URL：後端 API base URL（client 端 axios 用）
- APP_URL：前端對外網址（僅 server 端：metadata、OAuth callback 轉址）
- GITHUB_CLIENT_ID：GitHub OAuth Client ID（/login 組授權連結用，server 端）
- GITHUB_REDIRECT_URI：OAuth callback 路徑，對應 /api/auth/callback/github
- GITHUB_CLIENT_SECRET：前端不使用（由後端 /auth/github 處理），僅供參考對齊
確認 .gitignore 已忽略 .env 與 .env*.local。
```

---

## 階段 4 — API 層（巢狀 class-based axios client）

```
建立一個 class-based 的巢狀 API client，從單例出發呼叫：
- api/client.ts：一個獨立的 axios instance（baseURL = NEXT_PUBLIC_API_URL）
- api/index.ts：ApiClient class，建構時建立共用 axios instance，持有 .auth 與 .user，
  並 default export 出單例 apiClient
- api/auth/index.ts：AuthApi，持有 .github
- api/auth/github/index.ts：GithubAuthApi，方法 post(code) → POST /auth/github
- api/user/index.ts：UserApi，持有 .info
- api/user/info/index.ts：UserInfoApi，方法 get(token) → GET /user/info，帶 Bearer token
用法應為 apiClient.auth.github.post(code) 與 apiClient.user.info.get(token)。
```

---

## 階段 5 — 型別與假資料

```
建立 TypeScript 型別與 mock 資料：
- types/userType.ts：使用者資料型別（_id、githubId、email、name、avatar、
  primaryEmail、domain_names、premium、create_time 等欄位）
- types/domainType.ts：子網域資料型別
- data/fakeOwnDomains.ts：使用者自有子網域假資料（name + status，status 可為
  active/inactive/pending/reject/空字串）
- data/fakeDomains.ts：相關子網域名稱假資料字串陣列
```

---

## 階段 6 — 認證流程（GitHub OAuth）

```
實作 GitHub OAuth 登入流程（前端只轉址，secret 交換交給後端）：
1. app/login/page.tsx：Server Component，用 GITHUB_CLIENT_ID 與 GITHUB_REDIRECT_URI
   組出 GitHub authorize URL（scope=user:email）後 redirect() 過去
2. app/api/auth/callback/[service]/route.ts：route handler。注意 Next 16 的 params 是
   Promise 要 await。當 service === "github" 時取 ?code，呼叫 apiClient.auth.github.post(code)
   讓後端換 token，再 redirect 到 `${APP_URL}/callback?token=...`
3. app/callback/page.tsx：client component，從 query 取 token 寫入 localStorage
   （usehooks-ts 的 useLocalStorage），完成後導回首頁。useSearchParams 必須包在 Suspense 內
4. hooks/useUserAccount/index.tsx：讀 localStorage token → 打 /user/info 取使用者資料，
   對外回傳 { token, userData, isLoading, isLogin, setIsLogin }
也加上幾個簡單的 app/api 範例 GET route（回傳 Hello World）。
```

---

## 階段 7 — 全域 Layout、Provider、主題

```
建立全域結構：
- app/provider.tsx：client component，用 next-themes 包裹，整站只有深色模式
  （attribute="class"、forcedTheme="dark"、enableSystem=false）
- app/layout.tsx：RootLayout，import styles/globals.css，套用 Providers 與 Navbar，
  內容區用 h-[100dvh] 的 flex 直向結構（Navbar 高 4rem、其餘可捲動、max-w 1024 置中）。
  metadata 用 process.env.APP_URL 當 metadataBase，並設定完整的 OpenGraph / Twitter
  / keywords（站名 Dev-in.tw，作者 LAZCO STUDIO LTD）。viewport 設深色。
```

---

## 階段 8 — 共用元件

```
建立共用元件：
- components/Global/Navbar.tsx：client component，sticky 高 4rem。左側 logo 連回首頁，
  右側有 Discord / GitHub 連結。用 useUserAccount 決定狀態：
  載入中顯示 spinner；已登入顯示 avatar + dropdown-menu（顯示姓名/email、子網域設定、
  登出 destructive 項）；未登入顯示圓角「登入」按鈕導到 /login。全部用 shadcn 元件。
- components/Global/ThemeSwitch.tsx：太陽/月亮切換鈕（目前未使用，保留）。button 要有 type。
- components/Icons/：Eye、Edit、Delete 三個 inline SVG 元件（1em、currentColor）。
- components/Domain/PathCheck.tsx：用 usePathname 判斷目前路徑是否符合。
- components/Domain/Status.tsx：依 status 字串回傳不同顏色的中文狀態標籤。
```

---

## 階段 9 — 頁面

```
建立各頁面：
- app/page.tsx：首頁。大標題 DEV-IN.TW（RWD 字級）、副標，以及一個 SearchInput 搜尋框。
- components/Domain/SearchInput.tsx：用 shadcn Input 組成的圓角搜尋框，左側固定顯示
  "https://"、右側 ".dev-in.tw"，按 Enter 導到 /find?sub=<值>。
- components/Find/ResultCard.tsx：顯示某個子網域是否可申請（綠勾 + 名稱 + 申請鈕）；
  沒有輸入時顯示提示。用 useSearchParams 取 sub。
- app/find/page.tsx：搜尋結果頁。SearchInput + 一張主結果卡 + 「相關結果」清單
  （map fakeDomains）。useSearchParams 必須包在 Suspense 內。
- app/domain/layout.tsx：子網域管理頁的左右欄佈局。用 shadcn Card 包成左側選單
  （我的子網域 / DNS / 憑證 / 擴充 / 伺服器，多數標示開發中，用 PathCheck 標示 active）
  + 右側內容區。
- app/domain/page.tsx：用 shadcn Table 列出使用者子網域（子網域 / 狀態 / 動作三欄），
  動作欄用 Tooltip 包訪問 / 編輯 / 刪除三個 icon 按鈕，刪除用 destructive 樣式。
```

---

## 階段 10 — 驗證

```
跑 pnpm build 與 pnpm lint，把所有 TypeScript 型別錯誤與 Biome lint 錯誤修到全綠。
特別注意 Next 16：route handler 的 params 要 await、用 useSearchParams 的元件要包 Suspense、
button 要有明確 type。
```

---

## （選用）若是從舊版升級而非全新建置

```
把整個專案升級到最新：Next 14→16、React 18→19、TypeScript 5→6、Tailwind 3→4；
ESLint+Prettier 改用 Biome；已棄用的 @nextui-org/react 全面改用 shadcn/ui。
過程中檢查所有環境變數，把不需要瀏覽器存取的拿掉 NEXT_PUBLIC_ 前綴。
驗收標準：pnpm build 與 pnpm lint 皆通過。
```
