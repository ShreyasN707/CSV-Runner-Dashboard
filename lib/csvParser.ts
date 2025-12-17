import { CsvRow, ValidationError, validateHeaders, validateAllRows } from './validators'

export interface ParseResult {
  success: boolean
  data?: CsvRow[]
  error?: ValidationError
}

/**
 * Parses CSV text into structured data
 */
export function parseCsv(csvText: string): ParseResult {
  const lines = csvText.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  if (lines.length === 0) {
    return {
      success: false,
      error: {
        type: 'header',
        message: 'CSV file is empty.'
      }
    }
  }

  // Parse headers
  const headers = lines[0].split(',').map(h => h.trim())
  const headerError = validateHeaders(headers)
  if (headerError) {
    return {
      success: false,
      error: headerError
    }
  }

  // Parse rows
  const rows: string[][] = []
  for (let i = 1; i < lines.length; i++) {
    // Simple CSV parsing - handles basic cases
    // For production, consider using a proper CSV parser library
    const row = lines[i].split(',').map(cell => cell.trim())
    rows.push(row)
  }

  // Validate all rows
  const rowError = validateAllRows(rows)
  if (rowError) {
    return {
      success: false,
      error: rowError
    }
  }

  // Convert to structured data
  const data: CsvRow[] = rows.map(row => {
    const [dateStr, person, milesStr] = row
    return {
      date: dateStr,
      person: person.trim(),
      miles: parseFloat(milesStr)
    }
  })

  return {
    success: true,
    data
  }
}

/**
 * Reads a file as text
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      resolve(text)
    }
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    reader.readAsText(file)
  })
}

