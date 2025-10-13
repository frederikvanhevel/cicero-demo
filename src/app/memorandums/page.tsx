"use client"

import { FileText, Plus, Download, MoreHorizontal, Filter, ArrowLeft, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function MemorandumsPage() {
  const router = useRouter()
  const memorandums = [
    {
      id: 1,
      name: "ABS Agreement - BioTech Research",
      type: "Access & Benefit Sharing",
      status: "Draft",
      lastModified: "2 hours ago",
      createdBy: "Jack Davis",
    },
    {
      id: 2,
      name: "Partnership MOU - Tech Corp",
      type: "Memorandum of Understanding",
      status: "Processing",
      lastModified: "1 day ago",
      createdBy: "Jack Davis",
    },
    {
      id: 3,
      name: "GDPR Compliance Memo",
      type: "Compliance Memorandum",
      status: "Completed",
      lastModified: "3 days ago",
      createdBy: "Jack Davis",
    },
    {
      id: 4,
      name: "Joint Venture Agreement",
      type: "Memorandum of Agreement",
      status: "Draft",
      lastModified: "5 days ago",
      createdBy: "Jack Davis",
    },
    {
      id: 5,
      name: "Remote Work Policy Update",
      type: "Internal Policy Memorandum",
      status: "Completed",
      lastModified: "1 week ago",
      createdBy: "Jack Davis",
    },
    {
      id: 6,
      name: "Case Law Summary - Smith v. Jones",
      type: "Legal Briefing Memorandum",
      status: "Processing",
      lastModified: "2 weeks ago",
      createdBy: "Jack Davis",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-muted text-muted-foreground"
      case "Processing":
        return "bg-accent/10 text-accent"
      case "Completed":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen flex flex-col">
        <header className="border-b border-border bg-background sticky top-0 z-10">
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
              <Button size="sm" className="gap-1.5 text-xs h-7 px-2.5 rounded-md cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
                New Memorandum
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 ml-16">
          <div className="h-full">
            <div className="border-b border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-medium">Document</TableHead>
                    <TableHead className="text-xs font-medium">Type</TableHead>
                    <TableHead className="text-xs font-medium">Status</TableHead>
                    <TableHead className="text-xs font-medium">Last Modified</TableHead>
                    <TableHead className="text-xs font-medium">Created By</TableHead>
                    <TableHead className="w-[40px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memorandums.map((memo) => (
                    <TableRow key={memo.id} className="cursor-pointer">
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded bg-muted flex items-center justify-center flex-shrink-0">
                            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <span className="text-xs font-medium text-foreground truncate">
                            {memo.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="text-xs text-muted-foreground">
                          {memo.type}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                            memo.status
                          )}`}
                        >
                          {memo.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="text-xs text-muted-foreground">
                          {memo.lastModified}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="text-xs text-muted-foreground">
                          {memo.createdBy}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
