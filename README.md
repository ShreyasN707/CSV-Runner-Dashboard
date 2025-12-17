# 📊 CSV Runner Analytics Dashboard

<p align="center">
  <strong>A production-quality CSV analytics dashboard built with Next.js</strong><br>
  Clean • Validated • Accessible • Client-side
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" alt="TypeScript Strict" />
  <img src="https://img.shields.io/badge/UI-shadcn/ui-000000?style=for-the-badge&logo=shadcnui" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Charts-Recharts-22c55e?style=for-the-badge&logo=recharts" alt="Recharts" />
  <img src="https://img.shields.io/badge/Client--Side-Only-success?style=for-the-badge" alt="Client-Side Only" />
</p>

## ✨ Overview

CSV Runner Analytics Dashboard is a clean, production-style analytics tool that allows users to upload structured CSV data and instantly derive insights through validated metrics and interactive charts.

The project focuses on correctness, UX clarity, and maintainable frontend architecture, closely mirroring real-world internal dashboards used by engineering teams.

## 🧠 What This App Does

- 📁 **Uploads CSV files** with strict validation.
- 📊 **Computes accurate summary metrics.**
- 📈 **Visualizes trends and distributions.**
- 👤 **Supports per-person drill-down analysis.**
- ♿ **Designed with accessibility in mind.**
- ⚡ **Runs entirely client-side** (no backend required).

## 📂 Supported CSV Format

To ensure accurate processing, your CSV should follow this structure:

```csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2
2024-01-03,Alice,7.1
```

### 🛡️ Validation Rules

- **date** → Valid date format (e.g., YYYY-MM-DD).
- **person** → Non-empty string.
- **miles** → Must be a positive number.
- **Headers** → Must match the format exactly.

> **Note:** Invalid files display clear, human-readable errors and will not render analytics until corrected.

## 🧭 Application Flow

### 🔹 1. Upload
- Drag-and-drop CSV upload or file picker fallback.
- Inline validation feedback.
- "Replace CSV" option for quick swaps.

### 🔹 2. Overall Analysis
- **Summary Metrics:** Average Miles, Minimum Miles, Maximum Miles.
- **Charts:** Total Miles per Person (Bar) and Miles Over Time for all runners (Line).

### 🔹 3. Per-Person Analysis
- Dedicated Person Selector dropdown.
- Specific metrics (Avg / Min / Max) for the selected individual.
- Drill-down Line Chart for personal progress.
- Empty states guide users when data is not yet available.

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Charts** | Recharts |
| **Icons** | Lucide React |

## 🛠️ Setup & Run

### Prerequisites
- Node.js ≥ 18 (LTS recommended)
- npm ≥ 9

### Installation

```bash
npm install
```

### Run (Development)

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000) 👈

### Build (Optional)

```bash
npm run build
npm start
```

## ✅ Verification Checklist

### Upload & Validation
- [x] Valid CSV auto-navigates to analytics.
- [x] Invalid headers or rows show visible errors.
- [x] Empty files are rejected gracefully.

### Analytics
- [x] Metrics calculated correctly.
- [x] Charts include titles, axes, and interactive tooltips.
- [x] Fully responsive layout.

### UX & Accessibility
- [x] Keyboard navigation support.
- [x] Proper labels and focus states.
- [x] High-contrast UI.
- [x] Friendly empty and loading states.

## 🧪 Example Calculations

Given the following input:

```csv
date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2
2024-01-03,Alice,7.1
```

The dashboard will output:

- **Average Miles:** 5.27
- **Min Miles:** 3.2
- **Max Miles:** 7.1
- **Alice Total:** 12.6

## 🏗️ Project Structure

```plaintext
csv-reader/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
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

## 🏗️ Design Principles

- **Clear separation of concerns.**
- **Small, reusable components.**
- **Logic isolated from UI** (see `lib/` directory).
- **Strong typing** throughout the application.
- **Accessibility-first mindset.**

## ⚠️ Limitations

- CSV parsing does not currently support quoted fields or escaped commas.
- Date parsing relies on standard JavaScript Date objects.
- Large files (>10MB) may impact performance due to client-side processing.
- No persistence (data is kept in-memory only).

*These are intentional trade-offs to keep the scope focused on the core assignment requirements.*

## ♿ Accessibility

- Keyboard-accessible tabs and controls.
- ARIA-compliant navigation.
- Visible focus indicators for all interactive elements.
- WCAG-compliant color contrast.
- Descriptive error and loading feedback.

## 📝 Notes for Reviewers

This project intentionally avoids backend complexity to focus on:
- Input validation
- UX clarity
- Data correctness
- Maintainable frontend architecture

The implementation aims to reflect how real-world internal dashboards are built and reviewed in professional engineering teams.

## 📄 License

Provided for evaluation and demonstration purposes only.
