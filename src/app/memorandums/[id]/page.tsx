"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, FileText, Bookmark, Info, CheckCircle2, Sparkles, TrendingUp } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'

/**
 * AI Evaluation Markers System
 *
 * This system allows you to highlight text in the legal memorandum with tooltips that explain
 * AI evaluation insights for legal review purposes.
 *
 * Syntax: [[text to highlight::tooltip content|severity:level]]
 *
 * Severity levels (optional):
 * - low (green): Verified facts, correct citations
 * - medium (blue): Analysis insights, assessments (default if not specified)
 * - high (red/orange): Critical compliance issues, high-priority risks
 *
 * Examples:
 * - [[Actinomycetia::AI Verified: Correctly identified as bacterial genus|severity:low]]
 * - [[significant legal risk::AI Analysis: Based on 47 similar cases|severity:medium]]
 * - [[formal non-compliance::AI Legal Assessment: High confidence determination|severity:high]]
 */

// Component to render text with AI evaluation markers
interface EvaluationMarker {
  text: string
  tooltip: string
  severity?: 'low' | 'medium' | 'high'
}

function parseEvaluationMarkers(text: string): (string | EvaluationMarker)[] {
  const markerRegex = /\[\[([^\]]+?)::([^\]]+?)(?:\|severity:(low|medium|high))?\]\]/g
  const parts: (string | EvaluationMarker)[] = []
  let lastIndex = 0
  let match

  while ((match = markerRegex.exec(text)) !== null) {
    // Add text before the marker
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Add the marker
    parts.push({
      text: match[1],
      tooltip: match[2],
      severity: (match[3] as 'low' | 'medium' | 'high') || undefined
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

function renderTextWithMarkers(text: string) {
  const parts = parseEvaluationMarkers(text)

  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return <span key={index}>{part}</span>
        }

        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <span
                className="ai-evaluation-marker"
                data-severity={part.severity}
              >
                {part.text}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs leading-relaxed">{part.tooltip}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </>
  )
}

// Helper to extract text from React children recursively
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const childWithProps = children as { props?: { children?: React.ReactNode } }
    return extractTextFromChildren(childWithProps.props?.children)
  }
  return ''
}

// Custom markdown components to support evaluation markers
const markdownComponents = {
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => {
    // Extract text content from children
    const childText = extractTextFromChildren(children)

    if (childText.includes('[[')) {
      console.log('Found marker in paragraph:', childText.substring(childText.indexOf('[['), childText.indexOf(']]') + 2))
      return <p {...props}>{renderTextWithMarkers(childText)}</p>
    }
    return <p {...props}>{children}</p>
  },
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement> & { children?: React.ReactNode }) => {
    // Extract text content from children
    const childText = extractTextFromChildren(children)

    if (childText.includes('[[')) {
      console.log('Found marker in list item:', childText.substring(childText.indexOf('[['), childText.indexOf(']]') + 2))
      return <li {...props}>{renderTextWithMarkers(childText)}</li>
    }
    return <li {...props}>{children}</li>
  }
}

// Evaluation data
const evaluationData = {
  overallScore: 4.5,
  percentile: 89,
  criteriaCount: 5,
  areasForImprovement: 2,
  // Trust indicators
  trustIndicators: {
    hallucinationRisk: 2.1, // percentage
    hallucinationRiskLevel: "Low" as "Low" | "Medium" | "High",
    citationVerification: 100, // % of citations verified
    primarySourcesUsed: 5,
    totalCitations: 5,
    lastUpdatedLaw: "2025",
    confidenceThreshold: 80,
    passesThreshold: true,
  },
  // Actionable insights
  recommendations: [
    {
      priority: "medium" as "critical" | "medium" | "low",
      criterionName: "Practical Utility and Client Readiness",
      action: "Add specific timelines and cost estimates for compliance procedures",
      estimatedImpact: "+5-8% score improvement"
    },
    {
      priority: "low" as "critical" | "medium" | "low",
      criterionName: "User-Oriented Language and Communication",
      action: "Restructure executive summary for improved clarity",
      estimatedImpact: "+3-5% score improvement"
    }
  ],
  readyForReview: true,
  estimatedReviewTime: "15-20 min",
  // Comparative analytics
  comparative: {
    averageForType: 81, // average score for this memorandum type
    performanceDelta: 8, // % above/below average
    similarDocsAnalyzed: 47
  },
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
      feedback: "Comprehensive analysis of Indian Biodiversity Act 2002 and EU Regulation 511/2014. Excellent coverage of territorial, functional, and temporal scope. Analysis incorporates latest Indian Biodiversity Regulations 2025.04.29."
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

export default function MemorandumDetailPage() {
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
        console.log('Loaded memo content, checking for markers:', text.includes('[['))
        console.log('First marker position:', text.indexOf('[['))
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
          <div className="px-6 h-12 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-muted cursor-pointer"
                onClick={() => router.push('/memorandums')}
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </Button>
              <h1 className="text-sm text-foreground">Back to overview</h1>
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
        <div className="flex-1 ml-16">
          <div className="flex h-full">
            {/* Main Content - Document */}
            <div className="flex-1 overflow-y-auto bg-muted/30">
              <div className="px-8 py-8">
                <Card className="p-8">
                  {/* Document Header */}
                  <div className="border-b border-border pb-6 mb-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
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
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {memoContent}
                    </ReactMarkdown>
                  </div>
                </Card>
              </div>
            </div>

            {/* Sidebar - Evaluation */}
            <div className="w-[420px] flex-shrink-0 bg-muted/15 overflow-y-auto scrollbar-thin">
                <div className="px-8 py-8 pb-12">
                  <div className="space-y-5">
                    {/* Overall Score Card */}
                    <Card className="">
                      <div className="p-5">
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

                    <p className="text-xs text-muted-foreground text-center mb-3">
                      High-quality legal analysis
                    </p>

                    {/* Comparative Analytics */}
                    <div className="pt-3 border-t border-border/40">
                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-600 font-semibold">+{evaluationData.comparative.performanceDelta}%</span>
                        <span>vs average</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        Based on {evaluationData.comparative.similarDocsAnalyzed} similar documents
                      </p>
                    </div>
                      </div>
                  </Card>

                  {/* Trust Indicators Card */}
                  <Card className="">
                    <div className="p-5">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">Trust & Verification</h3>
                        <p className="text-xs text-muted-foreground mt-1">Source quality and accuracy metrics</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Hallucination Risk */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-foreground">Hallucination Risk</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="inline-flex items-center justify-center">
                                  <Info className="w-3 h-3 text-muted-foreground/40 hover:text-muted-foreground cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p className="text-xs">Likelihood of factual errors or unsupported claims. Industry benchmark: &lt;5% excellent, 5-15% acceptable.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {evaluationData.trustIndicators.hallucinationRiskLevel} ({evaluationData.trustIndicators.hallucinationRisk}%)
                          </Badge>
                        </div>
                      </div>

                      {/* Citation Verification */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-foreground">Citations Verified</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="inline-flex items-center justify-center">
                                  <Info className="w-3 h-3 text-muted-foreground/40 hover:text-muted-foreground cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p className="text-xs">Percentage of citations verified against primary sources.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-xs font-semibold text-foreground">
                              {evaluationData.trustIndicators.citationVerification}%
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({evaluationData.trustIndicators.primarySourcesUsed}/{evaluationData.trustIndicators.totalCitations})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Source Currency */}
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-foreground">Latest Source</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="inline-flex items-center justify-center">
                                  <Info className="w-3 h-3 text-muted-foreground/40 hover:text-muted-foreground cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p className="text-xs">Most recent year of legal authorities cited.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <span className="text-xs font-semibold text-foreground">{evaluationData.trustIndicators.lastUpdatedLaw}</span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </Card>

                  {/* Evaluation Criteria */}
                  <Card className="overflow-hidden">
                    <div className="p-5 pb-4">
                      <h3 className="text-base font-semibold text-foreground">
                        Quality Assessment
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Professional evaluation across {evaluationData.criteriaCount} criteria
                      </p>
                    </div>

                    <div className="space-y-0">
                      {evaluationData.criteria.map((criterion, index) => (
                        <div key={index} className="px-5 py-4 hover:bg-muted/20 transition-colors">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button className="inline-flex items-center justify-center">
                                    <Info className="w-3 h-3 text-muted-foreground/40 hover:text-muted-foreground cursor-help transition-colors" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-sm">
                                  <p className="text-xs leading-relaxed">{criterion.description}</p>
                                </TooltipContent>
                              </Tooltip>
                              <h4 className="text-sm font-semibold text-foreground truncate">
                                {criterion.name}
                              </h4>
                            </div>
                            <span className={`text-sm font-bold ${getScoreTextColor(criterion.percentage)} tabular-nums`}>
                              {criterion.percentage}%
                            </span>
                          </div>

                          <div className="mb-3">
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden relative">
                              {/* Threshold marker - subtle line at 80% */}
                              <div
                                className="absolute top-0 bottom-0 w-px bg-foreground/20 z-10"
                                style={{ left: `${evaluationData.trustIndicators.confidenceThreshold}%` }}
                              />
                              <div
                                className={`h-full ${getScoreColor(criterion.percentage)} transition-all duration-300`}
                                style={{ width: `${criterion.percentage}%` }}
                              />
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed">
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
      </main>
      </div>
    </TooltipProvider>
  )
}
