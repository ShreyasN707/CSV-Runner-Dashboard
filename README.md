# 📊 CSV Runner Analytics Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge&logo=recharts&logoColor=white" />
  <img src="https://img.shields.io/badge/Client--Side_Only-22c55e?style=for-the-badge" />

  <br /><br />

  <h3>A production-quality CSV analytics dashboard built with Next.js</h3>
  <p>Clean • Validated • Accessible • Client-Side</p>
</div>

---

## ✨ Project Overview

**CSV Runner Analytics Dashboard** is a client-side analytics application that allows users to upload structured CSV data and derive insights through validated metrics and interactive visualizations.

The project is intentionally scoped to reflect real-world internal dashboards, focusing on:
- **Correctness** of data handling
- **Clarity** of user experience
- **Maintainable** frontend architecture

> **Goal:** Build a reliable, easy-to-verify analytics dashboard rather than an over-engineered system.

---

## 🧠 Assumptions

*   **CSV files contain exactly three columns:** `date`, `person`, `miles`
*   **Dates are parseable** by JavaScript’s `Date` constructor (e.g. `YYYY-MM-DD`)
*   **`miles` values** are positive numbers
*   **`person` values** are non-empty strings
*   **CSV files** are comma-separated and unquoted
*   **Application is run** in a modern browser

*All assumptions are enforced through validation.*

---

## 📱 Application Flow

<div align="center">

| 📁 **Upload** | 📊 **Overall Analysis** | 👤 **Per-Person Analysis** |
| :---: | :---: | :---: |
| Drag-and-drop CSV | Summary metrics | Person selector |
| Instant validation | Aggregated charts | Per-person metrics |
| Clear error feedback | Overall trends | Time-series view |

</div>

---

## 🔑 Core Features

- **Strict CSV Validation**
  Header and row-level validation with human-readable error messages.

- **Overall Analytics**
  Average, minimum, and maximum miles computed across all entries.

- **Per-Person Analysis**
  Drill-down metrics and charts for individual runners.

- **Interactive Visualizations**
  Bar and line charts with labels, tooltips, and responsive layout.

- **Client-Side Only**
  All parsing and computation happens in the browser. No backend required.

- **Accessible UI**
  Keyboard navigation, proper labels, focus indicators, and contrast.

---

## 📂 CSV Format & Validation

### Required CSV Schema
```csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2
2024-01-03,Alice,7.1
```

### Validation Rules

| Field | Rule | Behavior |
| :--- | :--- | :--- |
| **date** | Valid date | **Row rejected** |
| **person** | Non-empty string | **Row rejected** |
| **miles** | Positive number | **Row rejected** |
| **Headers** | Exact match | **File rejected** |

> **Note:** If validation fails, analytics views do not render and a clear error message is shown.

---

## 🚀 Tech Stack

| Category | Tools |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Charts** | Recharts |
| **Icons** | Lucide React |

---

## 🧩 Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9
- **Modern browser** (Chrome, Firefox, Edge, Safari)

---

## 🛠️ Setup

```bash
npm install
```
*No environment variables are required.*

---

## ▶️ Run & Verify

```bash
npm run dev
```
> Open: [http://localhost:3000](http://localhost:3000)

### Verification Steps
1.  Upload a **valid CSV** → auto-navigate to analytics.
2.  Confirm **overall metrics** and charts render correctly.
3.  Switch to **Per-Person** tab and change selection.
4.  Upload an **invalid CSV** and confirm errors are shown.
5.  **Replace CSV** and verify state resets cleanly.

---

## ✅ Acceptance Checklist

### Upload & Validation
- [x] Drag-and-drop + file picker
- [x] Header and row validation
- [x] Visible error messages
- [x] Empty file handling

### Analytics
- [x] Average / Min / Max metrics
- [x] Overall + per-person views
- [x] Meaningful charts with labels

### UX & Accessibility
- [x] Tab-based navigation
- [x] Keyboard accessible controls
- [x] Clear empty & loading states
- [x] Consistent spacing and typography

---

## 🧪 Example

### Input
```csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2
```

### Output
- **Average Miles:** 4.35
- **Alice Total:** 5.5
- **Bob Total:** 3.2

---

## 🏗️ Architecture Notes

```plaintext
csv-runner/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── CsvUploader.tsx
│   ├── SummaryCards.tsx
│   ├── OverallChart.tsx
│   ├── PersonSelector.tsx
│   └── PersonChart.tsx
├── lib/
│   ├── csvParser.ts
│   ├── validators.ts
│   └── metrics.ts
```

### Design Decisions
*   **Parsing, validation, and metrics isolated from UI**
*   Small, reusable components
*   Fully typed data flow
*   No backend or persistence by design

---

## ♿ Accessibility & UI Considerations

*   Keyboard-navigable tabs and inputs
*   Proper labels and ARIA attributes
*   Visible focus indicators
*   WCAG-compliant contrast
*   Readable typography and spacing

---

## ⚠️ Limitations

*   CSV parsing does not support quoted fields or escaped commas
*   Date parsing relies on JavaScript `Date`
*   Large files may affect performance
*   Data is stored in memory only

*These trade-offs are intentional to keep scope focused.*
