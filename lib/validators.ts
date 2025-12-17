export interface CsvRow {
  date: string
  person: string
  miles: number
}

export interface ValidationError {
  type: 'header' | 'row'
  message: string
  rowIndex?: number
}

/**
 * Validates CSV headers
 */
export function validateHeaders(headers: string[]): ValidationError | null {
  const requiredHeaders = ['date', 'person', 'miles']
  const normalizedHeaders = headers.map(h => h.trim().toLowerCase())

  // Check for exact match
  if (normalizedHeaders.length !== requiredHeaders.length) {
    // Find which column is missing
    if (normalizedHeaders.length < requiredHeaders.length) {
      const missingColumns = requiredHeaders.filter(
        (header, idx) => !normalizedHeaders.includes(header)
      )
      if (missingColumns.length > 0) {
        return {
          type: 'header',
          message: `Missing required column: ${missingColumns[0]}`
        }
      }
    }
    return {
      type: 'header',
      message: `Expected exactly ${requiredHeaders.length} columns (date, person, miles), but found ${normalizedHeaders.length} columns.`
    }
  }

  for (let i = 0; i < requiredHeaders.length; i++) {
    if (normalizedHeaders[i] !== requiredHeaders[i]) {
      return {
        type: 'header',
        message: `Missing required column: ${requiredHeaders[i]}`
      }
    }
  }

  return null
}

/**
 * Validates a single CSV row
 */
export function validateRow(row: string[], rowIndex: number): ValidationError | null {
  if (row.length !== 3) {
    return {
      type: 'row',
      message: `Row ${rowIndex + 1}: Expected 3 columns, but found ${row.length}.`,
      rowIndex
    }
  }

  const [dateStr, personStr, milesStr] = row.map(cell => cell.trim())

  // Validate date
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    return {
      type: 'row',
      message: `Row ${rowIndex + 1}: invalid date format`,
      rowIndex
    }
  }

  // Validate person
  if (!personStr || personStr.length === 0) {
    return {
      type: 'row',
      message: `Row ${rowIndex + 1}: person name cannot be empty`,
      rowIndex
    }
  }

  // Validate miles
  const miles = parseFloat(milesStr)
  if (isNaN(miles) || miles <= 0) {
    return {
      type: 'row',
      message: `Row ${rowIndex + 1}: miles must be a positive number`,
      rowIndex
    }
  }

  return null
}

/**
 * Validates all rows in the CSV data
 */
export function validateAllRows(rows: string[][]): ValidationError | null {
  for (let i = 0; i < rows.length; i++) {
    const error = validateRow(rows[i], i)
    if (error) {
      return error
    }
  }
  return null
}

