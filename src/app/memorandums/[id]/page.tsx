"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, FileText, Bookmark, Info } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'

// Evaluation data
const evaluationData = {
  overallScore: 4.5,
  percentile: 89,
  criteriaCount: 5,
  areasForImprovement: 2,
  criteria: [
    {
      name: "User-Oriented Language and Communication",
      description: "Evaluates how well legal concepts are explained in accessible language. Measures clarity of writing, appropriate use of technical terminology, and consideration of the client's level of legal sophistication.",
      score: 4.2,
      percentage: 84,
      color: "bg-foreground",
      feedback: "Excellent use of plain language with technical terms properly explained. Minor improvements needed in executive summary structure."
    },
    {
      name: "Analytical Depth and Legal Accuracy",
      description: "Assesses the thoroughness and correctness of legal analysis across all relevant jurisdictions. Examines citation accuracy, interpretation of statutes, application of case law, and cross-jurisdictional considerations.",
      score: 4.65,
      percentage: 93,
      color: "bg-foreground",
      feedback: "Comprehensive analysis of Indian Biodiversity Act 2002 (amended 2024) and EU Regulation 511/2014. Excellent coverage of territorial, functional, and temporal scope with good distinction between German and French implementation requirements."
    },
    {
      name: "Practical Utility and Client Readiness",
      description: "Measures how actionable the memorandum is for clients. Evaluates the presence of clear next steps, timelines, risk assessments, and implementation guidance.",
      score: 4.0,
      percentage: 80,
      color: "bg-foreground",
      feedback: "Clear procedural guidance provided. Could benefit from more specific timelines and cost estimates for compliance procedures."
    },
    {
      name: "Ethical Integrity",
      description: "Assesses adherence to professional legal standards. Examines conflict identification, balanced analysis, appropriate disclaimers, and recognition of legal limitations.",
      score: 4.7,
      percentage: 94,
      color: "bg-foreground",
      feedback: "Excellent recognition of past non-compliance issues. Proactive approach to rectification demonstrates high ethical standards."
    },
    {
      name: "Trustworthiness and Verifiability",
      description: "Evaluates the quality and reliability of sources cited. Measures citation completeness, use of primary sources, currency of legal authorities, and transparency about uncertainty.",
      score: 4.6,
      percentage: 92,
      color: "bg-foreground",
      feedback: "Comprehensive references to current legislation and regulations. Clear distinction between different jurisdictions maintained throughout."
    }
  ]
}

export default function MemorandumDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [memoContent, setMemoContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Get color based on score percentage (red to yellow to green)
  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "bg-emerald-500"
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 70) return "bg-lime-500"
    if (percentage >= 60) return "bg-yellow-500"
    if (percentage >= 50) return "bg-amber-500"
    if (percentage >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  const getScoreTextColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600"
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 70) return "text-lime-600"
    if (percentage >= 60) return "text-yellow-600"
    if (percentage >= 50) return "text-amber-600"
    if (percentage >= 40) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreGradient = (percentage: number) => {
    if (percentage >= 90) return { start: "rgb(16, 185, 129)", end: "rgb(5, 150, 105)" } // emerald
    if (percentage >= 80) return { start: "rgb(34, 197, 94)", end: "rgb(22, 163, 74)" } // green
    if (percentage >= 70) return { start: "rgb(132, 204, 22)", end: "rgb(101, 163, 13)" } // lime
    if (percentage >= 60) return { start: "rgb(234, 179, 8)", end: "rgb(202, 138, 4)" } // yellow
    if (percentage >= 50) return { start: "rgb(251, 146, 60)", end: "rgb(249, 115, 22)" } // amber
    if (percentage >= 40) return { start: "rgb(251, 146, 60)", end: "rgb(234, 88, 12)" } // orange
    return { start: "rgb(239, 68, 68)", end: "rgb(220, 38, 38)" } // red
  }

  useEffect(() => {
    // Load the memo.md file
    fetch('/memorandums/1/memo.md')
      .then(res => res.text())
      .then(text => {
        setMemoContent(text)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading memo:', err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading memorandum...</div>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <main className="min-h-screen flex flex-col">
        {/* Header */}
        <Header logoType="image" />

        {/* Toolbar */}
        <div className="border-b border-border bg-background ml-16 sticky top-[57px] z-10">
          <div className="px-4 h-11 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
                onClick={() => router.push('/memorandums')}
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Button>
              <h1 className="text-sm font-medium text-foreground">ABS Compliance Memorandum</h1>
            </div>

            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7 px-2.5 rounded-md cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7 px-2.5 rounded-md cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 ml-16 bg-muted/30">
          <div className="max-w-[1600px] mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Content - Document */}
              <div className="lg:col-span-8">
                <Card className="p-8 shadow-sm">
                  {/* Document Header */}
                  <div className="border-b border-border pb-6 mb-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h1 className="text-xl font-semibold text-foreground mb-1">
                            ABS Compliance Memorandum
                          </h1>
                          <p className="text-sm text-muted-foreground">
                            Biodiversity Access & Benefit-Sharing Compliance Analysis
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-50 text-green-600 hover:bg-green-100 border border-green-200">
                        Analysis Complete
                      </Badge>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Jurisdictions</p>
                        <p className="text-sm text-foreground">Germany, India, EU, France</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Case Timeline</p>
                        <p className="text-sm text-foreground">November 2016 - Present</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Industry</p>
                        <p className="text-sm text-foreground">Pharmaceutical</p>
                      </div>
                    </div>
                  </div>

                  {/* Markdown Content */}
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {memoContent}
                    </ReactMarkdown>
                  </div>
                </Card>
              </div>

              {/* Sidebar - Evaluation */}
              <div className="lg:col-span-4">
                <div className="sticky top-[101px] max-h-[calc(100vh-101px)] overflow-y-auto pr-1">
                  <div className="flex flex-col gap-4">
                    {/* Overall Score Card */}
                    <Card className="p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-base font-semibold text-foreground">Overall Score</h3>
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="transform -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="url(#scoreGradient)"
                          strokeWidth="8"
                          strokeDasharray={`${evaluationData.percentile * 3.39} 339`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={getScoreGradient(evaluationData.percentile).start} />
                            <stop offset="100%" stopColor={getScoreGradient(evaluationData.percentile).end} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">
                          {evaluationData.percentile}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      High-quality legal analysis
                    </p>
                  </Card>

                  {/* Evaluation Criteria */}
                  <Card className="shadow-sm divide-y divide-border">
                    <div className="p-6 pb-5">
                      <h3 className="text-base font-semibold text-foreground">
                        Quality Assessment
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Professional evaluation across {evaluationData.criteriaCount} criteria
                      </p>
                    </div>

                    <div className="divide-y divide-border">
                      {evaluationData.criteria.map((criterion, index) => (
                        <div key={index} className="p-5 hover:bg-muted/20 transition-colors">
                          <div className="flex items-center gap-2 mb-3">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="inline-flex items-center justify-center shrink-0">
                                  <Info className="w-3.5 h-3.5 text-muted-foreground/50 hover:text-muted-foreground cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-sm">
                                <p className="text-xs leading-relaxed">{criterion.description}</p>
                              </TooltipContent>
                            </Tooltip>
                            <h4 className="text-sm font-semibold text-foreground">
                              {criterion.name}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getScoreColor(criterion.percentage)} transition-all duration-300 shadow-sm`}
                                style={{ width: `${criterion.percentage}%` }}
                              />
                            </div>
                            <span className={`text-xs font-medium ${getScoreTextColor(criterion.percentage)} tabular-nums min-w-[3ch]`}>
                              {criterion.percentage}%
                            </span>
                          </div>

                          <p className="text-xs text-foreground/70 leading-relaxed">
                            {criterion.feedback}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </TooltipProvider>
  )
}
