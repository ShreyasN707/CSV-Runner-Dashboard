"use client"

import { Select } from "@/components/ui/select"
import { CsvRow } from "@/lib/validators"
import { getUniquePersons } from "@/lib/metrics"
import { User } from "lucide-react"

interface PersonSelectorProps {
  data: CsvRow[]
  selectedPerson: string
  onPersonChange: (person: string) => void
}

export function PersonSelector({ data, selectedPerson, onPersonChange }: PersonSelectorProps) {
  const persons = getUniquePersons(data)

  return (
    <div className="space-y-1.5 sm:space-y-2 animate-fade-in">
      <label htmlFor="person-select" className="text-xs sm:text-sm font-semibold text-foreground/80 flex items-center gap-1.5 sm:gap-2">
        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#3B82F6]" />
        Select Person
      </label>
      <Select
        id="person-select"
        value={selectedPerson}
        onChange={(e) => onPersonChange(e.target.value)}
        aria-label="Select a person to view their analytics"
        className="transition-all duration-300 focus:ring-2 focus:ring-[#3B82F6]/20 h-8 sm:h-9 text-xs sm:text-sm border-border/50"
      >
        {persons.map((person) => (
          <option key={person} value={person}>
            {person}
          </option>
        ))}
      </Select>
    </div>
  )
}

