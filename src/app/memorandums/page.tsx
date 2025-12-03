"use client"

import { Plus, Download, Filter, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import Sidebar from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function MemorandumsPage() {
  const router = useRouter()
  const [draftsCollapsed, setDraftsCollapsed] = useState(false)
  const [processingCollapsed, setProcessingCollapsed] = useState(false)
  const [allMemosCollapsed, setAllMemosCollapsed] = useState(false)

  // Track animated progress for processing items
  const [animatedProgress, setAnimatedProgress] = useState<Record<number, number>>({})

  const memorandums = [
    {
      id: 1,
      name: "ABS Compliance Memorandum - German Pharma India",
      type: "Pharmaceutical",
      status: "Draft",
      progress: null,
      progressStage: null,
      timeRemaining: null,
      lastModified: "Just now",
      createdBy: "Bart Van Vooren",
    },
    {
      id: 2,
      name: "Marine Biotechnology - EU Regulation Assessment",
      type: "Biotechnology",
      status: "Processing",
      progress: 65,
      progressStage: "Drafting memorandum",
      timeRemaining: "3-5 min",
      lastModified: "3 minutes ago",
      createdBy: "Bart Van Vooren",
    },
    {
      id: 3,
      name: "Plant Genetic Resources - Kenya Collection",
      type: "Plant Breeding",
      status: "Completed",
      progress: null,
      progressStage: null,
      timeRemaining: null,
      lastModified: "3 days ago",
      createdBy: "Bart Van Vooren",
    },
    {
      id: 4,
      name: "Cosmetic Ingredient - Brazil Sourcing",
      type: "Cosmetics",
      status: "Draft",
      progress: null,
      progressStage: null,
      timeRemaining: null,
      lastModified: "5 days ago",
      createdBy: "Bart Van Vooren",
    },
    {
      id: 5,
      name: "Digital Sequence Data - Multi-Country Analysis",
      type: "Biotechnology",
      status: "Completed",
      progress: null,
      progressStage: null,
      timeRemaining: null,
      lastModified: "1 week ago",
      createdBy: "Bart Van Vooren",
    },
    {
      id: 6,
      name: "Agricultural Breeding Program - Thailand",
      type: "Plant Breeding",
      status: "Processing",
      progress: 30,
      progressStage: "Researching legal requirements",
      timeRemaining: "8-12 min",
      lastModified: "5 minutes ago",
      createdBy: "Bart Van Vooren",
    },
  ]

  // Separate memorandums by status into three categories
  const draftMemos = memorandums.filter(m => m.status === "Draft")
  const processingMemos = memorandums.filter(m => m.status === "Processing")
  const completedMemos = memorandums.filter(m => m.status === "Completed")

  // Animate progress for processing items
  useEffect(() => {
    // Initialize animated progress for processing items
    const initialProgress: Record<number, number> = {}
    const processing = memorandums.filter(m => m.status === "Processing")

    processing.forEach(memo => {
      initialProgress[memo.id] = memo.progress || 0
    })
    setAnimatedProgress(initialProgress)

    // Slowly increment progress for each processing item
    const interval = setInterval(() => {
      setAnimatedProgress(prev => {
        const updated = { ...prev }
        processing.forEach(memo => {
          const current = updated[memo.id] || memo.progress || 0
          if (current < 100) {
            updated[memo.id] = Math.min(100, current + 1) // Increment by 1% every second
          }
        })
        return updated
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  const renderMemoRow = (memo: typeof memorandums[0]) => {
    return (
      <TableRow
        key={memo.id}
        className="cursor-pointer hover:bg-blue-50/50 transition-colors"
        onClick={() => router.push(`/memorandums/${memo.id}`)}
      >
        <TableCell className="py-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground truncate">
                {memo.name}
              </span>
            </div>
            {memo.status === "Processing" && (
              <div className="max-w-[500px] mt-1">
                {memo.progressStage && (
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground truncate">
                      {memo.progressStage}
                    </span>
                    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-600 font-medium">
                        {Math.round(animatedProgress[memo.id] || memo.progress || 0)}%
                      </span>
                    </div>
                  </div>
                )}
                <div className="w-full bg-muted rounded-full h-1 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${animatedProgress[memo.id] || memo.progress}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="py-3">
          <span className="text-xs text-muted-foreground">
            {memo.type}
          </span>
        </TableCell>
        <TableCell className="py-3">
          <div className="flex items-center gap-2">
            <Image
              src="/avatar.jpg"
              alt={memo.createdBy}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full flex-shrink-0"
            />
            <span className="text-xs text-muted-foreground">
              {memo.createdBy}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-3">
          <span className="text-xs text-muted-foreground">
            {memo.lastModified}
          </span>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen flex flex-col">
        <Header logoType="image" />

        <div className="border-b border-border bg-background ml-16">
          <div className="px-6 h-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Button>
              <h1 className="text-sm text-foreground">Overview</h1>
            </div>

            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7 px-2.5 rounded-md cursor-pointer">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7 px-2.5 rounded-md cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
              <Button
                size="sm"
                className="gap-1.5 text-xs h-7 px-2.5 rounded-md cursor-pointer bg-accent text-white hover:bg-accent/90"
                onClick={() => router.push('/memorandums/new')}
              >
                <Plus className="w-3.5 h-3.5" />
                New Memorandum
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 ml-16 p-6 space-y-6">
          {/* Processing Section */}
          {processingMemos.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <colgroup>
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "203px" }} />
                    <col style={{ width: "254px" }} />
                    <col style={{ width: "203px" }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-muted/30">
                      <TableHead className="text-xs font-medium py-3">
                        <button
                          onClick={() => setProcessingCollapsed(!processingCollapsed)}
                          className="flex items-center gap-2 hover:text-foreground transition-colors"
                        >
                          {processingCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold flex items-center gap-1.5">
                            In Progress
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          </span>
                          <span className="text-muted-foreground">({processingMemos.length})</span>
                        </button>
                      </TableHead>
                      <TableHead className="text-xs font-medium">Type</TableHead>
                      <TableHead className="text-xs font-medium">Created By</TableHead>
                      <TableHead className="text-xs font-medium">Last Modified</TableHead>
                    </TableRow>
                  </TableHeader>
                  {!processingCollapsed && (
                    <TableBody>
                      {processingMemos.map((memo) => renderMemoRow(memo))}
                    </TableBody>
                  )}
                </table>
              </div>
            </div>
          )}

          {/* Drafts Section */}
          {draftMemos.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <colgroup>
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "203px" }} />
                    <col style={{ width: "254px" }} />
                    <col style={{ width: "203px" }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-muted/30">
                      <TableHead className="text-xs font-medium py-3">
                        <button
                          onClick={() => setDraftsCollapsed(!draftsCollapsed)}
                          className="flex items-center gap-2 hover:text-foreground transition-colors"
                        >
                          {draftsCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold flex items-center gap-1.5">
                            Drafts
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          </span>
                          <span className="text-muted-foreground">({draftMemos.length})</span>
                        </button>
                      </TableHead>
                      <TableHead className="text-xs font-medium">Type</TableHead>
                      <TableHead className="text-xs font-medium">Created By</TableHead>
                      <TableHead className="text-xs font-medium">Last Modified</TableHead>
                    </TableRow>
                  </TableHeader>
                  {!draftsCollapsed && (
                    <TableBody>
                      {draftMemos.map((memo) => renderMemoRow(memo))}
                    </TableBody>
                  )}
                </table>
              </div>
            </div>
          )}

          {/* All Memorandums Section */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <colgroup>
                  <col style={{ width: "auto" }} />
                  <col style={{ width: "203px" }} />
                  <col style={{ width: "254px" }} />
                  <col style={{ width: "203px" }} />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-transparent bg-muted/30">
                    <TableHead className="text-xs font-medium py-3">
                      <button
                        onClick={() => setAllMemosCollapsed(!allMemosCollapsed)}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        {allMemosCollapsed ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        <span className="font-semibold">All Memorandums</span>
                        <span className="text-muted-foreground">({completedMemos.length})</span>
                      </button>
                    </TableHead>
                    <TableHead className="text-xs font-medium">Type</TableHead>
                    <TableHead className="text-xs font-medium">Created By</TableHead>
                    <TableHead className="text-xs font-medium">Last Modified</TableHead>
                  </TableRow>
                </TableHeader>
                {!allMemosCollapsed && (
                  <TableBody>
                    {completedMemos.map((memo) => renderMemoRow(memo))}
                  </TableBody>
                )}
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
