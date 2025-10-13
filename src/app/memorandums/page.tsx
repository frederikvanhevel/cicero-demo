"use client"

import { Plus, Download, MoreHorizontal, Filter, ArrowLeft, ChevronDown, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
  const [generatingCollapsed, setGeneratingCollapsed] = useState(false)
  const [allMemosCollapsed, setAllMemosCollapsed] = useState(false)

  const memorandums = [
    {
      id: 1,
      name: "ABS Agreement - BioTech Research",
      type: "Access & Benefit Sharing",
      status: "Draft",
      progress: null,
      lastModified: "2 hours ago",
      createdBy: "Jack Davis",
    },
    {
      id: 2,
      name: "Partnership MOU - Tech Corp",
      type: "Memorandum of Understanding",
      status: "Processing",
      progress: 65,
      lastModified: "1 day ago",
      createdBy: "Jack Davis",
    },
    {
      id: 3,
      name: "GDPR Compliance Memo",
      type: "Compliance Memorandum",
      status: "Completed",
      progress: null,
      lastModified: "3 days ago",
      createdBy: "Jack Davis",
    },
    {
      id: 4,
      name: "Joint Venture Agreement",
      type: "Memorandum of Agreement",
      status: "Draft",
      progress: null,
      lastModified: "5 days ago",
      createdBy: "Jack Davis",
    },
    {
      id: 5,
      name: "Remote Work Policy Update",
      type: "Internal Policy Memorandum",
      status: "Completed",
      progress: null,
      lastModified: "1 week ago",
      createdBy: "Jack Davis",
    },
    {
      id: 6,
      name: "Case Law Summary - Smith v. Jones",
      type: "Legal Briefing Memorandum",
      status: "Processing",
      progress: 30,
      lastModified: "2 weeks ago",
      createdBy: "Jack Davis",
    },
  ]

  // Separate memorandums by status into three categories
  const draftMemos = memorandums.filter(m => m.status === "Draft")
  const generatingMemos = memorandums.filter(m => m.status === "Processing")
  const completedMemos = memorandums.filter(m => m.status === "Completed")

  const renderMemoRow = (memo: typeof memorandums[0]) => {
    return (
      <TableRow
        key={memo.id}
        className="cursor-pointer hover:bg-blue-50/50 transition-colors"
        onClick={() => router.push(`/memorandums/${memo.id}`)}
      >
        <TableCell className="py-3">
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="text-xs font-medium text-foreground truncate">
              {memo.name}
            </span>
            {memo.status === "Processing" && memo.progress !== null && (
              <span className="text-xs text-blue-600 font-medium whitespace-nowrap flex items-center gap-1">
                <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {memo.progress}%
              </span>
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
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-medium text-blue-700">
                {memo.createdBy.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
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
        <TableCell className="py-3">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </Button>
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
          <div className="px-4 h-11 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Button>
              <h1 className="text-sm font-medium text-foreground">Memorandums</h1>
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
          {/* Drafts Section */}
          {draftMemos.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm" style={{ tableLayout: "fixed" }}>
                  <colgroup>
                    <col style={{ width: "45%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "3%" }} />
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
                      <TableHead className="text-xs font-medium"></TableHead>
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

          {/* Generating Section */}
          {generatingMemos.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm" style={{ tableLayout: "fixed" }}>
                  <colgroup>
                    <col style={{ width: "45%" }} />
                    <col style={{ width: "25%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "3%" }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-muted/30">
                      <TableHead className="text-xs font-medium py-3">
                        <button
                          onClick={() => setGeneratingCollapsed(!generatingCollapsed)}
                          className="flex items-center gap-2 hover:text-foreground transition-colors"
                        >
                          {generatingCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold flex items-center gap-1.5">
                            Generating
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          </span>
                          <span className="text-muted-foreground">({generatingMemos.length})</span>
                        </button>
                      </TableHead>
                      <TableHead className="text-xs font-medium">Type</TableHead>
                      <TableHead className="text-xs font-medium">Created By</TableHead>
                      <TableHead className="text-xs font-medium">Last Modified</TableHead>
                      <TableHead className="text-xs font-medium"></TableHead>
                    </TableRow>
                  </TableHeader>
                  {!generatingCollapsed && (
                    <TableBody>
                      {generatingMemos.map((memo) => renderMemoRow(memo))}
                    </TableBody>
                  )}
                </table>
              </div>
            </div>
          )}

          {/* All Memorandums Section */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm" style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "45%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "12%" }} />
                  <col style={{ width: "3%" }} />
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
                    <TableHead className="text-xs font-medium"></TableHead>
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
