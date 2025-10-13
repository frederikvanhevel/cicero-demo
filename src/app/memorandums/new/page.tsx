"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { SinglePageForm } from "./components/SinglePageForm"
import { questions } from "./data/questions"

export default function NewMemorandumPage() {
  const router = useRouter()
  const [progress, setProgress] = useState({ answered: 0, total: questions.length, percentage: 0 })

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="text-sm font-semibold text-foreground">Cicero</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-all duration-100">
                <span className="text-xs font-medium text-primary">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Toolbar - Sticky with Progress */}
        <div className="border-b border-border bg-background/95 backdrop-blur-sm ml-16 sticky top-[57px] z-10">
          <div className="px-6 h-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted cursor-pointer transition-all duration-100"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Button>
              <div className="flex items-center gap-3">
                <h1 className="text-sm font-semibold text-foreground">ABS Compliance Memorandum</h1>
                <span className="text-xs text-muted-foreground">
                  {progress.answered} of {progress.total}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8 px-3 rounded-md cursor-pointer transition-all duration-100">
                Save Draft
              </Button>
            </div>
          </div>
          {/* Minimal Progress Bar */}
          <div className="h-0.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        {/* Main Content with Form */}
        <div className="ml-16">
          <SinglePageForm questions={questions} onSubmit={handleSubmit} onProgressChange={setProgress} />
        </div>
      </main>
    </div>
  )
}
