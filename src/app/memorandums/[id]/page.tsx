"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, FileText, Bookmark } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react'

// Evaluation data
const evaluationData = {
  overallScore: 4.5,
  percentile: 89,
  criteriaCount: 6,
  areasForImprovement: 2,
  criteria: [
    {
      name: "User-Oriented Language and Communication",
      description: "Clarity, accessibility, and client-focused communication",
      score: 4.2,
      percentage: 84,
      color: "bg-green-500",
      feedback: "Excellent use of plain language with technical terms properly explained. Minor improvements needed in executive summary structure."
    },
    {
      name: "Analytical Depth and Legal Accuracy (Provider Country)",
      description: "Legal analysis accuracy for Indian biodiversity law",
      score: 4.8,
      percentage: 96,
      color: "bg-blue-500",
      feedback: "Comprehensive analysis of Indian Biodiversity Act 2002 (amended 2024). Excellent coverage of territorial, functional, and temporal scope."
    },
    {
      name: "Analytical Depth and Legal Accuracy (User Country)",
      description: "Legal analysis accuracy for EU/German law",
      score: 4.5,
      percentage: 90,
      color: "bg-blue-500",
      feedback: "Strong analysis of EU Regulation 511/2014. Good distinction between German and French implementation requirements."
    },
    {
      name: "Practical Utility and Client Readiness",
      description: "Actionable guidance and implementation steps",
      score: 4.0,
      percentage: 80,
      color: "bg-purple-500",
      feedback: "Clear procedural guidance provided. Could benefit from more specific timelines and cost estimates for compliance procedures."
    },
    {
      name: "Ethical Integrity",
      description: "Professional standards and ethical considerations",
      score: 4.7,
      percentage: 94,
      color: "bg-teal-500",
      feedback: "Excellent recognition of past non-compliance issues. Proactive approach to rectification demonstrates high ethical standards."
    },
    {
      name: "Trustworthiness and Verifiability",
      description: "Source reliability and citation quality",
      score: 4.6,
      percentage: 92,
      color: "bg-orange-500",
      feedback: "Comprehensive references to current legislation and regulations. Clear distinction between different jurisdictions maintained throughout."
    }
  ]
}

export default function MemorandumDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [memoContent, setMemoContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

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
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen flex flex-col">
        {/* Header */}
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
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
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
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
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
                <div className="sticky top-32 space-y-4">
                  {/* Overall Score Card */}
                  <Card className="p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-base font-semibold text-foreground">Overall Score</h3>
                      <Bookmark className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold text-foreground mb-2">
                        {evaluationData.overallScore}
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">out of 5.0</div>
                      <div className="text-xs font-medium text-primary">Very Good</div>
                    </div>

                    <div className="relative w-32 h-32 mx-auto mb-6">
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
                          stroke="hsl(var(--primary))"
                          strokeWidth="8"
                          strokeDasharray={`${evaluationData.percentile * 3.39} 339`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">
                          {evaluationData.percentile}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mb-4">
                      High-quality legal analysis
                    </p>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Criteria Met
                        </span>
                        <span className="font-medium text-foreground">
                          {evaluationData.criteriaCount}/6
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          Areas for Improvement
                        </span>
                        <span className="font-medium text-foreground">
                          {evaluationData.areasForImprovement}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Evaluation Criteria */}
                  <Card className="p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-foreground mb-4">
                      Evaluation Criteria
                    </h3>

                    <div className="space-y-4">
                      {evaluationData.criteria.map((criterion, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-foreground leading-tight mb-1">
                                {criterion.name}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {criterion.description}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs font-semibold shrink-0">
                              {criterion.score}/5
                            </Badge>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Score</span>
                              <span className="font-medium">{criterion.percentage}%</span>
                            </div>
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${criterion.color} transition-all duration-500`}
                                style={{ width: `${criterion.percentage}%` }}
                              />
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                            {criterion.feedback}
                          </p>

                          {index < evaluationData.criteria.length - 1 && (
                            <div className="pt-2">
                              <div className="border-t border-border" />
                            </div>
                          )}
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
  )
}
