# 📊 CSV Runner Analytics Dashboard

<div align="center">

  <img src="https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/Client_Only-Success?style=for-the-badge&logo=vercel&logoColor=white" alt="Client-Side" />

  <br />
  <br />

  <h3>A production-ready analytics dashboard for structured CSV data.</h3>
  <p>Clean • Validated • Accessible • Private</p>

</div>

---

## ✨ Overview

**CSV Runner Analytics Dashboard** is a high-performance, client-side analytics tool designed for engineering teams. It allows users to upload structured CSV data and instantly visualize insights through validated metrics and interactive charts.

> [!NOTE]
> This project mirrors real-world internal tools, prioritizing **correctness**, **UX clarity**, and **maintainable frontend architecture**.

---

## 📱 Application Flow & Features

<div align="center">

| 📁 **1. Upload** | 📊 **2. Analyze** | 👤 **3. Drill-down** |
| :---: | :---: | :---: |
| Drag-and-drop CSVs<br>Instant Validation<br>Error Feedback | Summary Metrics<br>Trend Visualization<br>Overall Stats | Individual Performance<br>Per-Person Metrics<br>Specific History |

</div>

<br>

### 🧠 Core Capabilities
*   **Strict CSV Validation**: Ensures data integrity before processing.
*   **Instant Analytics**: Computes averages, min/max, and totals in milliseconds.
*   **Privacy-First**: Runs 100% in the browser. No data leaves your device.
*   **Accessibility**: Fully navigable via keyboard with ARIA support.

---

## 📂 Data Format & Validation

To ensure accurate processing, your CSV must follow this strict schema:

```csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2
2024-01-03,Alice,7.1
```

### 🛡️ Validation Rules
| Field | Rule | Error Behavior |
| :--- | :--- | :--- |
| **date** | `YYYY-MM-DD` format | Row rejected |
| **person** | Non-empty string | Row rejected |
| **miles** | Positive number | Row rejected |
| **headers** | Exact match | **File rejected** |

> [!IMPORTANT]
> If a file contains errors, the dashboard will display a **human-readable error report** and prevent rendering until fixed.

---

## 🚀 Tech Stack

<div align="center">

| Core | UI & Styling | Visualization |
| :---: | :---: | :---: |
| <img src="https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white" /> | <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" /> | <img src="https://img.shields.io/badge/Recharts-22b5bf?style=flat-square&logo=recharts&logoColor=white" /> |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> | <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" /> | <img src="https://img.shields.io/badge/Lucide_Icons-F64900?style=flat-square&logo=lucide&logoColor=white" /> |

</div>

---

## 🛠️ Setup & Usage

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
> Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## ✅ Verification Checklist

### 🟢 Upload & Validation
- [x] Valid CSV auto-navigates to analytics.
- [x] Invalid headers or rows show visible errors.
- [x] Empty files are rejected gracefully.

### 🔵 Analytics
- [x] Metrics calculated correctly (Avg/Min/Max).
- [x] Charts include titles, axes, and tooltips.
- [x] Fully responsive layout.

### 🟣 UX & Accessibility
- [x] Keyboard navigation support.
- [x] High-contrast UI & Focus states.
- [x] Friendly empty/loading states.

---

## 🧪 Example Outputs

**Input:**
```csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2
```

**Output:**
*   **Average Miles:** `4.35`
*   **Total Miles (Alice):** `5.5`
*   **Total Miles (Bob):** `3.2`

---

## 🏗️ Project Structure

```plaintext
csv-runner/
├── 📂 app/                     # Next.js App Router pages
│   ├── layout.tsx              # Root layout with ThemeProvider and font setup
│   ├── page.tsx                # Main dashboard page assembling all components
│   └── globals.css             # Global Tailwind styles and CSS parsing
│
├── 📂 components/              # Reusable UI components
│   ├── 📂 ui/                  # shadcn/ui primitive components (buttons, cards, etc.)
│   ├── CsvUploader.tsx         # File dropzone with validation logic
│   ├── OverallChart.tsx        # Aggregated bar/line charts for all runners
│   ├── PersonChart.tsx         # Individual progress line charts
│   ├── PersonSelector.tsx      # Dropdown for drill-down analysis
│   ├── SummaryCards.tsx        # Stat cards (Avg, Min, Max, Total)
│   └── ThemeToggle.tsx         # Light/Dark mode switcher
│
├── 📂 lib/                     # Core business logic (isolated from UI)
│   ├── csvParser.ts            # Raw CSV string parsing to JSON
│   ├── metrics.ts              # Mathematical calculations (aggregations, stats)
│   ├── validators.ts           # Zod-based schemas and strict data validation
│   └── utils.ts                # Helper functions (CN, date formatting)
│
├── � public/                  # Static assets
└── 📄 tailwind.config.ts       # Design system configuration
```

---

*Built for the **Advanced Engineering Assessment**.*
