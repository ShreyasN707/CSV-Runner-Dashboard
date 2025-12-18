"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CsvRow } from "@/lib/validators"
import { calculateAverageMiles, calculateMinMiles, calculateMaxMiles } from "@/lib/metrics"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface SummaryCardsProps {
  data: CsvRow[]
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const averageMiles = calculateAverageMiles(data)
  const minMiles = calculateMinMiles(data)
  const maxMiles = calculateMaxMiles(data)

  return (
    <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 animate-fade-in">
      <Card className="animate-slide-up transition-all duration-300 hover:shadow-md border-l-4 border-l-[#3B82F6] bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 sm:px-4 pt-2.5 sm:pt-3">
          <CardTitle className="text-xs sm:text-sm font-semibold text-foreground/80">Average Miles</CardTitle>
          <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#3B82F6] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-2.5 sm:pb-3">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent animate-glow">
            {averageMiles.toFixed(2)}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
            Across all entries
          </p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up transition-all duration-300 hover:shadow-md border-l-4 border-l-[#06B6D4] bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-sm [animation-delay:0.05s]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 sm:px-4 pt-2.5 sm:pt-3">
          <CardTitle className="text-xs sm:text-sm font-semibold text-foreground/80">Minimum Miles</CardTitle>
          <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#06B6D4] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-2.5 sm:pb-3">
          <div className="text-xl sm:text-2xl font-bold text-[#06B6D4] animate-glow">
            {minMiles.toFixed(2)}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
            Lowest value
          </p>
        </CardContent>
      </Card>

      <Card className="animate-slide-up transition-all duration-300 hover:shadow-md border-l-4 border-l-[#10B981] bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-sm [animation-delay:0.1s] sm:col-span-2 md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 sm:px-4 pt-2.5 sm:pt-3">
          <CardTitle className="text-xs sm:text-sm font-semibold text-foreground/80">Maximum Miles</CardTitle>
          <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#10B981] group-hover:scale-110 transition-transform" />
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-2.5 sm:pb-3">
          <div className="text-xl sm:text-2xl font-bold text-[#10B981] animate-glow">
            {maxMiles.toFixed(2)}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
            Highest value
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

