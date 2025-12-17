"use client"

import { useCallback, useState } from "react"
import { Upload, FileText, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { parseCsv, readFileAsText } from "@/lib/csvParser"
import { CsvRow, ValidationError } from "@/lib/validators"

interface CsvUploaderProps {
  onUploadSuccess: (data: CsvRow[]) => void
  onReplaceCsv: () => void
  hasData: boolean
}

export function CsvUploader({ onUploadSuccess, onReplaceCsv, hasData }: CsvUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ValidationError | null>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError({
        type: 'header',
        message: 'Please upload a CSV file (.csv extension).'
      })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const text = await readFileAsText(file)
      const result = parseCsv(text)

      if (result.success && result.data) {
        onUploadSuccess(result.data)
      } else if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError({
        type: 'header',
        message: 'Failed to read file. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }, [onUploadSuccess])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (isLoading) return

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile, isLoading])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isLoading) {
      setIsDragging(true)
    }
  }, [isLoading])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  return (
    <div className="space-y-2 sm:space-y-3 animate-fade-in h-full flex flex-col">
      <Card className="animate-slide-up h-full flex flex-col bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm shadow-md">
        <CardHeader className="px-3 sm:px-4 pt-2.5 sm:pt-3 pb-1.5 sm:pb-2">
          <CardTitle className="text-sm sm:text-base font-semibold bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
            Upload CSV File
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Upload a CSV file with the following format: date, person, miles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col">
          {hasData && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 sm:p-2.5 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20 animate-scale-in transition-all duration-300 hover:bg-[#10B981]/15">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                <p className="text-xs sm:text-sm font-medium text-foreground">
                  CSV file uploaded successfully.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={onReplaceCsv} disabled={isLoading} className="transition-all hover:scale-105 text-xs h-7 px-2 sm:px-3 border-border/50 w-full sm:w-auto">
                Replace CSV
              </Button>
            </div>
          )}

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative border-2 border-dashed rounded-lg p-4 sm:p-6 text-center transition-all duration-300 flex items-center justify-center min-h-[140px] sm:min-h-[190px]
              ${isDragging ? 'border-[#3B82F6] bg-[#3B82F6]/10 scale-[1.01] sm:scale-[1.02] shadow-lg shadow-[#3B82F6]/20' : 'border-border/40 bg-muted/20'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#3B82F6]/50 hover:bg-muted/30'}
            `}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              disabled={isLoading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Upload CSV file"
            />
            
            {isLoading ? (
              <div className="flex flex-col items-center gap-2 animate-fade-in">
                <Loader2 className="h-7 w-7 sm:h-8 sm:w-8 animate-spin text-[#3B82F6]" />
                <p className="text-xs sm:text-sm font-medium text-foreground">Parsing CSV file...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 animate-fade-in">
                <div className="relative">
                  <Upload className={`h-8 w-8 sm:h-10 sm:w-10 text-[#3B82F6] transition-all duration-300 ${isDragging ? 'scale-110 rotate-12' : ''}`} />
                  <div className="absolute inset-0 bg-[#3B82F6]/20 rounded-full blur-xl -z-10 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground transition-all duration-300">
                    {isDragging ? 'Drop your CSV file here' : 'Drag and drop your CSV file here'}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    or click to browse
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2 p-2.5 sm:p-3 bg-destructive/10 border border-destructive/30 rounded-lg animate-scale-in shadow-sm">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive mt-0.5 flex-shrink-0 animate-pulse" />
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-destructive">Validation Error</p>
                <p className="text-xs sm:text-sm text-destructive/90 mt-1 leading-relaxed">{error.message}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 text-xs sm:text-sm p-2.5 sm:p-3 bg-muted/30 rounded-lg border border-border/40">
            <p className="font-semibold text-foreground text-xs sm:text-sm">CSV Format Requirements:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2 text-[11px] sm:text-xs">
              <li>Headers: <code className="bg-background px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-mono text-[10px] sm:text-xs border border-border/50">date, person, miles</code></li>
              <li>Date: valid format (e.g., YYYY-MM-DD)</li>
              <li>Person: non-empty string</li>
              <li>Miles: positive number</li>
            </ul>
            <div className="mt-2 p-2 bg-background/60 rounded-lg border border-border/40">
              <p className="text-[11px] sm:text-xs font-semibold mb-1 text-foreground">Example:</p>
              <pre className="text-[10px] sm:text-xs text-muted-foreground overflow-x-auto font-mono p-1.5 sm:p-2 bg-muted/40 rounded">
{`date,person,miles
2024-01-01,Alice,5.5
2024-01-02,Bob,3.2`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

