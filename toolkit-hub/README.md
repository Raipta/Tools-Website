# ToolKit Hub

A modern, privacy-first multi-tool utility website built with **React + Vite + Tailwind CSS**.
All tools run **entirely client-side** — no files are ever uploaded to a server.

## ✅ What's fully built right now

- **Navbar** — logo, live search-as-you-type, category dropdown, dark/light toggle, mobile menu
- **Homepage** — animated gradient hero with search, 4 category sections, tool cards, ad slots
- **Footer** — link columns, About / Contact / Privacy
- **Merge PDF** (`/tools/merge-pdf`) — fully working: drag & drop multiple PDFs, reorder by
  dragging, merge with `pdf-lib`, download the result. 100% client-side.
- **Dark/Light mode** — persisted to localStorage, respects system preference
- **SEO** — per-page `<title>`/`<meta description>` via `react-helmet-async`
- **Privacy Policy / About / Contact** pages
- **Reserved ad slots** (banner, in-content, sidebar) — swap `<AdSlot />` contents for your
  AdSense `<ins>` tag once approved
- 17 other tools are scaffolded with icons, descriptions, categories and routes, currently
  rendering a "Coming soon" placeholder (`ComingSoon.jsx`) so the whole site is navigable today.

## 🚀 Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
```

## 🗂 Folder structure

```
toolkit-hub/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx                  # app entry (Router, Theme, Helmet providers)
    ├── App.jsx                   # route definitions
    ├── index.css                 # Tailwind + shared utility classes
    ├── context/
    │   └── ThemeContext.jsx      # dark/light mode
    ├── data/
    │   └── tools.js              # single source of truth: every tool's metadata
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Seo.jsx                # per-page meta tags
    │   ├── AdSlot.jsx              # reserved ad zones
    │   ├── ToolCard.jsx
    │   ├── FileDropzone.jsx        # reusable drag & drop uploader
    │   └── ToolLayout.jsx          # shared shell for every /tools/:id page
    └── pages/
        ├── Home.jsx
        ├── About.jsx
        ├── Contact.jsx
        ├── Privacy.jsx
        ├── ComingSoon.jsx          # placeholder for unbuilt tools
        └── tools/
            └── MergePdf.jsx        # ✅ fully working example tool
```

## 🧩 How to add the next tool (e.g. Split PDF)

1. Create `src/pages/tools/SplitPdf.jsx` — copy `MergePdf.jsx` as a starting template since it
   already shows the dropzone → process → download pattern with `pdf-lib`.
2. Add a `<Route path="/tools/split-pdf" element={<SplitPdf />} />` **above** the
   `/tools/:toolId` catch-all in `App.jsx`.
3. That's it — the homepage, search and navbar already link to `/tools/split-pdf` because it's
   registered in `src/data/tools.js`.

Suggested libraries for the remaining tools (already listed in `package.json` or easy to add):

| Tool | Library |
|---|---|
| Split PDF / Compress PDF / Watermark | `pdf-lib` (same pattern as Merge PDF) |
| PDF → Image | `pdf-lib` + `pdfjs-dist` to render pages to `<canvas>`, then export as PNG/JPG |
| Image compressor / resizer / format converter | `browser-image-compression`, or raw `<canvas>` |
| Background remover | client-side model e.g. `@imgly/background-removal` (runs locally via WASM/ONNX) |
| Word/character counter, case converter | plain JS, no library needed |
| Text comparison | `diff` (npm) for word/char-level diff highlighting |
| Paraphraser | a basic synonym map for offline use, or a free paraphrasing API for better quality |
| QR generator | `qrcode.react` |
| Resume / Invoice builder | form state + `jsPDF` (or `pdf-lib`) to export the live preview as PDF |
| Password generator | plain JS `crypto.getRandomValues` |

## 🎨 Design system

- Primary gradient: indigo → violet → fuchsia (`bg-brand-gradient`, see `tailwind.config.js`)
- Font: Inter (loaded from Google Fonts in `index.html`)
- Shared utility classes in `index.css`: `.btn-primary`, `.btn-secondary`, `.dropzone`,
  `.card-hover`
- Dark mode via Tailwind's `class` strategy, toggled in `ThemeContext`

## 📈 SEO / AdSense readiness

- Every tool and static page sets its own `<title>` and `<meta description>` via `<Seo />`
- Privacy Policy explicitly states all processing is local/client-side (important for AdSense
  trust review)
- Ad slots are reserved in the layout (header banner, sidebar, in-content) without blocking
  content — replace `AdSlot.jsx`'s placeholder with your AdSense script once approved
- No unnecessary backend calls — fast Core Web Vitals out of the box

## Notes

- The production bundle is a single ~250KB gzipped JS chunk. For a real launch, consider
  code-splitting tool pages with `React.lazy()` so users only download the JS for the tool
  they're using.
