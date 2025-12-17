# CSV Runner Analytics Dashboard

A production-quality CSV analytics dashboard built with Next.js (App Router), TypeScript, and shadcn/ui. This application allows users to upload CSV files containing date, person, and miles data, then visualize and analyze the data through interactive charts and metrics.

## Project Overview

This dashboard provides a clean, accessible interface for analyzing CSV data. It features:
- Drag-and-drop CSV file upload with validation
- Overall analytics with summary metrics and visualizations
- Per-person analysis with filtered views
- Real-time data processing and visualization
- Fully client-side operation (no backend required)

## Assumptions

- CSV files follow a strict format with exactly three columns: `date`, `person`, `miles`
- Dates are in a standard format parseable by JavaScript's `Date` constructor
- Miles values are positive numbers
- Person names are non-empty strings
- CSV files use comma-separated values
- The application runs in modern browsers with JavaScript enabled

## Prerequisites

- **Node.js**: Version 18.0.0 or higher (LTS recommended)
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Setup Instructions

1. **Clone or download the project**
   ```bash
   cd csv-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - Next.js 14
   - React 18
   - TypeScript
   - Tailwind CSS
   - Recharts (for data visualization)
   - shadcn/ui components

3. **Verify installation**
   ```bash
   npm list --depth=0
   ```
   
   You should see all dependencies listed without errors.

## Run Instructions

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The dashboard should load in your browser

3. **Build for production** (optional)
   ```bash
   npm run build
   npm start
   ```

## Step-by-Step Verification Guide

### 1. Initial State Verification
- ✅ Application loads without errors
- ✅ Three tabs are visible: "Upload", "Overall Analysis", "Per-Person Analysis"
- ✅ "Overall Analysis" and "Per-Person Analysis" tabs are disabled (grayed out)
- ✅ Upload tab shows drag-and-drop area and format instructions

### 2. CSV Upload Verification

**Test Case 1: Valid CSV Upload**
1. Create a test CSV file (`test.csv`) with the following content:
   ```csv
   date,person,miles
   2024-01-01,Alice,5.5
   2024-01-02,Bob,3.2
   2024-01-03,Alice,7.1
   2024-01-04,Charlie,4.0
   2024-01-05,Bob,6.5
   ```
2. Drag and drop the file onto the upload area OR click to browse and select it
3. ✅ Loading indicator appears while parsing
4. ✅ Application automatically switches to "Overall Analysis" tab
5. ✅ No error messages displayed
6. ✅ "Replace CSV" button appears in upload tab

**Test Case 2: Invalid Headers**
1. Create a CSV with wrong headers (`test-invalid-headers.csv`):
   ```csv
   Date,Person,Miles,Extra
   ```
2. Upload the file
3. ✅ Error message appears: "Expected exactly 3 columns (date, person, miles)..."
4. ✅ Dashboard does not render
5. ✅ Remains on Upload tab

**Test Case 3: Invalid Row Data**
1. Create a CSV with invalid data (`test-invalid-data.csv`):
   ```csv
   date,person,miles
   2024-01-01,Alice,5.5
   invalid-date,Bob,3.2
   2024-01-03,,7.1
   2024-01-04,Charlie,-5
   ```
2. Upload the file
3. ✅ Error message appears indicating the first invalid row
4. ✅ Error message is clear and human-readable
5. ✅ Dashboard does not render

**Test Case 4: Empty File**
1. Create an empty CSV file
2. Upload it
3. ✅ Error message: "CSV file is empty"
4. ✅ Dashboard does not render

### 3. Overall Analysis Tab Verification

1. Upload a valid CSV file (use `test.csv` from above)
2. Navigate to "Overall Analysis" tab (should auto-switch after upload)
3. ✅ Three summary cards display:
   - Average Miles (calculated correctly)
   - Minimum Miles (lowest value)
   - Maximum Miles (highest value)
4. ✅ Two charts display:
   - "Total Miles per Person" bar chart
   - "Miles Over Time" line chart
5. ✅ Charts have:
   - Clear titles
   - Axis labels
   - Tooltips on hover
   - Responsive layout

**Verification Calculations** (using `test.csv`):
- Average: (5.5 + 3.2 + 7.1 + 4.0 + 6.5) / 5 = 5.26
- Minimum: 3.2
- Maximum: 7.1
- Total per person: Alice = 12.6, Bob = 9.7, Charlie = 4.0

### 4. Per-Person Analysis Tab Verification

1. Navigate to "Per-Person Analysis" tab
2. ✅ Person dropdown is visible and populated with unique person names
3. ✅ First person is selected by default
4. Select a different person from dropdown
5. ✅ Metrics update instantly:
   - Average Miles (for selected person)
   - Minimum Miles (for selected person)
   - Maximum Miles (for selected person)
6. ✅ Line chart updates to show only selected person's data
7. ✅ Chart shows miles over time for that person
8. ✅ Chart has proper labels and tooltips

**Verification** (using `test.csv`):
- Select "Alice": Average = 6.3, Min = 5.5, Max = 7.1 (2 data points)
- Select "Bob": Average = 4.85, Min = 3.2, Max = 6.5 (2 data points)
- Select "Charlie": Average = 4.0, Min = 4.0, Max = 4.0 (1 data point)

### 5. Replace CSV Functionality

1. With a CSV already uploaded, go to "Upload" tab
2. ✅ "Replace CSV" button is visible
3. Click "Replace CSV"
4. ✅ All data is cleared
5. ✅ Application returns to Upload tab
6. ✅ "Overall Analysis" and "Per-Person Analysis" tabs are disabled again
7. ✅ Can upload a new CSV file

### 6. Accessibility Verification

1. ✅ Keyboard navigation works:
   - Tab key navigates through interactive elements
   - Enter/Space activates buttons and selects
   - Arrow keys navigate dropdown options
2. ✅ Screen reader friendly:
   - All inputs have proper labels
   - Tabs have proper ARIA attributes
   - Charts have descriptive titles
3. ✅ Color contrast meets WCAG standards
4. ✅ Focus indicators are visible

### 7. Edge Cases

1. **Single row CSV**: Upload CSV with only header and one data row
   - ✅ Should work correctly
   - ✅ Metrics display properly
   - ✅ Charts render

2. **Many persons**: Upload CSV with 10+ different persons
   - ✅ Dropdown handles all persons
   - ✅ Charts scale appropriately
   - ✅ Performance remains good

3. **Large dataset**: Upload CSV with 100+ rows
   - ✅ Parsing completes successfully
   - ✅ Charts render all data points
   - ✅ No performance degradation

## Features

### Core Features
- ✅ Drag-and-drop CSV file upload
- ✅ File picker fallback for upload
- ✅ Comprehensive CSV validation (headers and rows)
- ✅ Clear, human-readable error messages
- ✅ Loading indicators during parsing
- ✅ Tab-based navigation (Upload, Overall Analysis, Per-Person Analysis)
- ✅ Automatic tab switching on successful upload
- ✅ Replace CSV functionality

### Analytics Features
- ✅ Overall summary metrics (Average, Min, Max miles)
- ✅ Total miles per person visualization (bar chart)
- ✅ Miles over time visualization (line chart)
- ✅ Per-person metrics (Average, Min, Max)
- ✅ Per-person time series chart (line chart)
- ✅ Interactive charts with tooltips

### UX Features
- ✅ Friendly empty states
- ✅ Loading indicators
- ✅ Proper form labels
- ✅ Keyboard navigation support
- ✅ Responsive design
- ✅ Clean, minimal dashboard UI

## Limitations

1. **CSV Parsing**: Uses simple comma-splitting. Does not handle:
   - Quoted fields with commas inside
   - Escaped quotes
   - Different line endings (CRLF vs LF)
   - For production use, consider a proper CSV parser library

2. **Date Format**: Relies on JavaScript's `Date` constructor, which can be lenient. For stricter validation, consider using a date parsing library.

3. **File Size**: No explicit file size limit, but very large files (>10MB) may cause performance issues.

4. **Browser Support**: Requires modern browser features. May not work in older browsers.

5. **Data Persistence**: Data is stored only in memory. Refreshing the page will lose uploaded data.

## Architecture Notes

### Project Structure
```
csv-reader/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main app shell and tab layout
│   └── globals.css         # Global styles and Tailwind setup
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── select.tsx
│   ├── CsvUploader.tsx     # CSV upload and validation UI
│   ├── SummaryCards.tsx    # Metric cards component
│   ├── OverallChart.tsx    # Overall data visualizations
│   ├── PersonSelector.tsx  # Person dropdown selector
│   └── PersonChart.tsx     # Per-person visualization
├── lib/
│   ├── utils.ts            # Utility functions (cn helper)
│   ├── csvParser.ts        # CSV parsing logic
│   ├── validators.ts       # Header and row validation
│   └── metrics.ts          # Metric calculations
└── [config files]
```

### Key Design Decisions

1. **Client-Side Only**: All processing happens in the browser. No backend required.

2. **Component Separation**: Logic separated from UI:
   - `lib/csvParser.ts`: Handles file reading and CSV parsing
   - `lib/validators.ts`: Contains all validation logic
   - `lib/metrics.ts`: Contains all calculation logic

3. **Reusable Components**: UI components are small and focused, following single responsibility principle.

4. **Type Safety**: Full TypeScript coverage with proper interfaces and types.

5. **Accessibility First**: Built with accessibility in mind using semantic HTML and ARIA attributes.

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (custom-built components)
- **Charts**: Recharts
- **Icons**: Lucide React

## Accessibility Considerations

1. **Keyboard Navigation**: All interactive elements are keyboard accessible
2. **ARIA Labels**: Proper labels and roles for screen readers
3. **Focus Management**: Clear focus indicators
4. **Color Contrast**: Meets WCAG AA standards
5. **Semantic HTML**: Proper use of headings, buttons, and form elements
6. **Error Messages**: Clear, descriptive error messages
7. **Loading States**: Proper loading indicators for async operations

## Troubleshooting

### Issue: `npm install` fails
**Solution**: Ensure you have Node.js 18+ installed. Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

### Issue: Application won't start
**Solution**: Check that port 3000 is not in use. You can change the port by setting `PORT` environment variable or modifying the dev script.

### Issue: CSV upload fails silently
**Solution**: Check browser console for errors. Ensure CSV file has correct format and headers.

### Issue: Charts not displaying
**Solution**: Ensure Recharts is properly installed. Check browser console for errors.

### Issue: TypeScript errors
**Solution**: Run `npm install` to ensure all type definitions are installed. Check `tsconfig.json` is properly configured.

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## License

This project is provided as-is for demonstration purposes.

## Support

For issues or questions, please refer to the verification guide above or check the browser console for error messages.

