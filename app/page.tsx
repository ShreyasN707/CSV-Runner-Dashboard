"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CsvUploader } from "@/components/CsvUploader"
import { SummaryCards } from "@/components/SummaryCards"
import { OverallChart } from "@/components/OverallChart"
import { PersonSelector } from "@/components/PersonSelector"
import { PersonChart } from "@/components/PersonChart"
import { ThemeToggle } from "@/components/ThemeToggle"
import { CsvRow } from "@/lib/validators"
import { getUniquePersons } from "@/lib/metrics"
import { FileText, BarChart3 } from "lucide-react"

export default function Home() {
  const [csvData, setCsvData] = useState<CsvRow[] | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [selectedPerson, setSelectedPerson] = useState<string>("")

  // Update selected person when data changes
  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const persons = getUniquePersons(csvData)
      if (persons.length > 0) {
        setSelectedPerson((current) => {
          // Keep current selection if it's still valid, otherwise select first person
          if (current && persons.includes(current)) {
            return current
          }
          return persons[0]
        })
      }
    } else {
      setSelectedPerson("")
    }
  }, [csvData])

  const handleUploadSuccess = (data: CsvRow[]) => {
    setCsvData(data)
    // Automatically switch to Overall Analysis tab
    setActiveTab("overall")
  }

  const handleReplaceCsv = () => {
    setCsvData(null)
    setSelectedPerson("")
    setActiveTab("upload")
  }

  return (
    <main className="min-h-screen sm:h-screen overflow-hidden bg-background transition-colors duration-200">
      <div className="h-full min-h-screen sm:min-h-0 flex flex-col container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 max-w-[1920px]">
        <div className="mb-2 sm:mb-3 flex items-center justify-between animate-fade-in shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-[#3B82F6] animate-float" />
            <h1 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
              <span className="hidden sm:inline">CSV Analytics Dashboard</span>
              <span className="sm:hidden">CSV Dashboard</span>
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col overflow-hidden animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10 mb-2 sm:mb-3 shrink-0">
            <TabsTrigger value="upload" className="text-xs sm:text-sm font-medium px-2 sm:px-3">Upload</TabsTrigger>
            <TabsTrigger value="overall" disabled={!csvData} className="text-xs sm:text-sm font-medium px-2 sm:px-3">
              <span className="hidden sm:inline">Overall</span>
              <span className="sm:hidden">Overall</span>
            </TabsTrigger>
            <TabsTrigger value="person" disabled={!csvData} className="text-xs sm:text-sm font-medium px-2 sm:px-3">
              <span className="hidden sm:inline">Per-Person</span>
              <span className="sm:hidden">Person</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="upload" className="mt-0 h-full">
              <CsvUploader
                onUploadSuccess={handleUploadSuccess}
                onReplaceCsv={handleReplaceCsv}
                hasData={csvData !== null}
              />
            </TabsContent>

            <TabsContent value="overall" className="mt-0 h-full">
              {csvData && csvData.length > 0 ? (
                <div className="space-y-4 h-full flex flex-col">
                  <SummaryCards data={csvData} />
                  <div className="flex-1 min-h-0">
                    <OverallChart data={csvData} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in px-4">
                  <div className="relative mb-2 sm:mb-3">
                    <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 animate-pulse" />
                    <div className="absolute inset-0 bg-[#3B82F6]/10 rounded-full blur-xl -z-10" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground/70">No Data Available</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-md">
                    Please upload a CSV file to view overall analysis.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="person" className="mt-0 h-full">
              {csvData && csvData.length > 0 ? (
                <div className="space-y-3 h-full flex flex-col">
                  <PersonSelector
                    data={csvData}
                    selectedPerson={selectedPerson}
                    onPersonChange={setSelectedPerson}
                  />
                  {selectedPerson && (
                    <div className="flex-1 min-h-0">
                      <PersonChart
                        data={csvData}
                        selectedPerson={selectedPerson}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in px-4">
                  <div className="relative mb-2 sm:mb-3">
                    <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 animate-pulse" />
                    <div className="absolute inset-0 bg-[#3B82F6]/10 rounded-full blur-xl -z-10" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground/70">No Data Available</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-md">
                    Please upload a CSV file to view per-person analysis.
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}

