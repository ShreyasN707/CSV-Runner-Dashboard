"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CsvRow } from "@/lib/validators"
import { filterByPerson, sortByDate, calculateAverageMiles, calculateMinMiles, calculateMaxMiles } from "@/lib/metrics"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"

interface PersonChartProps {
  data: CsvRow[]
  selectedPerson: string
}

export function PersonChart({ data, selectedPerson }: PersonChartProps) {
  const personData = filterByPerson(data, selectedPerson)
  const sortedData = sortByDate(personData)

  const averageMiles = calculateAverageMiles(personData)
  const minMiles = calculateMinMiles(personData)
  const maxMiles = calculateMaxMiles(personData)

  // Prepare data for line chart
  const chartData = sortedData.map(row => ({
    date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    miles: row.miles
  }))

  return (
    <div className="space-y-2 sm:space-y-3 animate-fade-in h-full flex flex-col">
      <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.01] sm:hover:scale-[1.02] border-l-4 border-l-[#3B82F6] bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 sm:px-4 pt-2.5 sm:pt-3">
            <CardTitle className="text-xs sm:text-sm font-semibold text-foreground/80">Average Miles</CardTitle>
            <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#3B82F6] group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pb-2.5 sm:pb-3">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent animate-glow">
              {averageMiles.toFixed(2)}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
              For {selectedPerson}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.01] sm:hover:scale-[1.02] border-l-4 border-l-[#06B6D4] bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-sm">
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

        <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.01] sm:hover:scale-[1.02] border-l-4 border-l-[#10B981] bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-sm sm:col-span-2 md:col-span-1">
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

      <Card className="transition-all duration-300 hover:shadow-lg animate-slide-up flex-1 flex flex-col min-h-0 bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm shadow-md min-h-[300px] sm:min-h-0">
        <CardHeader className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2">
          <CardTitle className="text-sm sm:text-base font-semibold text-foreground/90">
            Miles Over Time — <span className="text-[#3B82F6]">{selectedPerson}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 flex-1 min-h-0">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <LineChart data={chartData} margin={{ top: 10, right: 5, left: -10, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                <XAxis
                  dataKey="date"
                  angle={-30}
                  textAnchor="end"
                  height={60}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "12px",
                    padding: "6px 10px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)} miles`, 'Miles']}
                  animationDuration={300}
                />
                <Line
                  type="monotone"
                  dataKey="miles"
                  stroke="url(#personLineGradient)"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#2563EB" }}
                  animationDuration={800}
                  animationBegin={0}
                />
                <defs>
                  <linearGradient id="personLineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs sm:text-sm">
              No data available for {selectedPerson}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

