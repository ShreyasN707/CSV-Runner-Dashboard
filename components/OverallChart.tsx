"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CsvRow } from "@/lib/validators"
import { calculateTotalMilesPerPerson, sortByDate } from "@/lib/metrics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface OverallChartProps {
  data: CsvRow[]
}

export function OverallChart({ data }: OverallChartProps) {
  const totalMilesPerPerson = calculateTotalMilesPerPerson(data)
  const sortedData = sortByDate(data)

  // Prepare data for line chart (miles over time)
  const timeSeriesData = sortedData.map(row => ({
    date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    miles: row.miles
  }))

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 animate-fade-in h-full">
      <Card className="animate-slide-up transition-all duration-300 hover:shadow-lg h-full flex flex-col bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-md min-h-[300px] sm:min-h-0">
        <CardHeader className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2">
          <CardTitle className="text-sm sm:text-base font-semibold text-foreground/90">Total Miles per Person</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
            <BarChart data={totalMilesPerPerson} margin={{ top: 10, right: 5, left: -10, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
              <XAxis
                dataKey="person"
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
                formatter={(value: number) => [`${value.toFixed(2)} miles`, 'Total Miles']}
                animationDuration={300}
              />
              <Bar
                dataKey="totalMiles"
                fill="url(#colorGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={800}
                animationBegin={0}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="animate-slide-up transition-all duration-300 hover:shadow-lg [animation-delay:0.05s] h-full flex flex-col bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm group shadow-md min-h-[300px] sm:min-h-0">
        <CardHeader className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2">
          <CardTitle className="text-sm sm:text-base font-semibold text-foreground/90">Miles Over Time (All Runners)</CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4 flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
            <LineChart data={timeSeriesData} margin={{ top: 10, right: 5, left: -10, bottom: 50 }}>
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
                stroke="url(#lineGradient)"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#2563EB" }}
                animationDuration={800}
                animationBegin={0}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={1} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

