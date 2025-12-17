import { CsvRow } from './validators'

/**
 * Calculate average miles
 */
export function calculateAverageMiles(data: CsvRow[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, row) => acc + row.miles, 0)
  return sum / data.length
}

/**
 * Calculate minimum miles
 */
export function calculateMinMiles(data: CsvRow[]): number {
  if (data.length === 0) return 0
  return Math.min(...data.map(row => row.miles))
}

/**
 * Calculate maximum miles
 */
export function calculateMaxMiles(data: CsvRow[]): number {
  if (data.length === 0) return 0
  return Math.max(...data.map(row => row.miles))
}

/**
 * Get unique persons from data
 */
export function getUniquePersons(data: CsvRow[]): string[] {
  const persons = new Set(data.map(row => row.person))
  return Array.from(persons).sort()
}

/**
 * Filter data by person
 */
export function filterByPerson(data: CsvRow[], person: string): CsvRow[] {
  return data.filter(row => row.person === person)
}

/**
 * Calculate total miles per person
 */
export function calculateTotalMilesPerPerson(data: CsvRow[]): Array<{ person: string; totalMiles: number }> {
  const personTotals = new Map<string, number>()
  
  data.forEach(row => {
    const current = personTotals.get(row.person) || 0
    personTotals.set(row.person, current + row.miles)
  })

  return Array.from(personTotals.entries())
    .map(([person, totalMiles]) => ({ person, totalMiles }))
    .sort((a, b) => b.totalMiles - a.totalMiles)
}

/**
 * Sort data by date
 */
export function sortByDate(data: CsvRow[]): CsvRow[] {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })
}

