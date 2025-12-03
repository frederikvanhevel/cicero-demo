"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { DraftingModal } from "@/components/DraftingModal"
import { SinglePageForm } from "./components/SinglePageForm"
import { questions } from "./data/questions"

export default function NewMemorandumPage() {
  const router = useRouter()
  const [progress, setProgress] = useState({ answered: 0, total: questions.length, percentage: 0 })
  const [showDraftingModal, setShowDraftingModal] = useState(false)

  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log("Form submitted:", data)

    // Show the drafting modal
    setShowDraftingModal(true)

    // In production, this would call your API to start drafting
    // For demo, the modal handles the visual progression
  }

  const handleMinimize = () => {
    // Redirect to overview page
    router.push('/memorandums')
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Drafting Modal */}
      <DraftingModal
        open={showDraftingModal}
        onOpenChange={setShowDraftingModal}
        onMinimize={handleMinimize}
        documentTitle="ABS Compliance Memorandum"
      />

      <main className="min-h-screen">
        {/* Header */}
        <Header logoType="image" />

        {/* Toolbar - Sticky with Progress */}
        <div className="border-b border-border bg-background ml-16 sticky top-[57px] z-10">
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
                <h1 className="text-sm text-foreground">Create new ABS Compliance Memorandum</h1>
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
              className="h-full bg-gradient-brand transition-all duration-500 ease-out shadow-sm"
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
