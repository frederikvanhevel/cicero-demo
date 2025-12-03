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

// Memo content
const MEMO_CONTENT = `**C. EXECUTIVE SUMMARY**

A German pharmaceutical company synthesized a class of [[Actinomycetia::AI Verified: Correctly identified as bacterial genus subject to biodiversity regulations|severity:low]] isolated from a soil sample from Dibang Valley, India, in November 2016. The Company conducts drug discovery work in Germany and France, intends to file for a patent, and plans to commercialize the medicinal product in the US, India, UK, and the EU.

We conclude that the company's activities pose a [[significant legal risk::AI Analysis: Risk assessment based on 47 similar cases with 89% confidence level|severity:medium]] of non-compliance with Access and Benefit-Sharing (ABS) requirements in India (the provider country) and, consequently, with user country due diligence obligations in the EU and UK. Given the factual pattern, immediate and proactive corrective action is strongly recommended to regularize the situation.

On the provider country side, it is clear that the [[Indian Biological Diversity Act, 2002::AI Citation Check: Primary source verified against National Biodiversity Authority database (2024)|severity:low]], and its implementing regulations apply to the Actinomycetia accessed in November 2016. The absence of Prior Informed Consent (PIC) from the National Biodiversity Authority (NBA) and Mutually Agreed Terms (MAT) for benefit-sharing at the time of access, and for subsequent utilization including patenting and commercialization, constitutes a [[formal non-compliance::AI Legal Assessment: High confidence determination based on Section 3(2) analysis|severity:high]]. India's law also asserts extraterritorial reach over intellectual property rights and commercialization of products derived from its genetic resources, regardless of where these activities occur.

On the user country-side, EU Regulation (EU) No 511/2014 on compliance measures for users of the Nagoya Protocol is applicable to the company's drug discovery and trial activities in Germany and France. Similarly, the UK's retained ABS regulations apply to planned commercialization in the UK. Both frameworks impose due diligence obligations, requiring users to demonstrate that the genetic resource was accessed in accordance with the provider country's ABS laws. The current non-compliance with Indian law means the company cannot fulfill these due diligence requirements, which will be revealed when submitting due diligence declarations prior to seeking marketing authorization.

**D. FACT PATTERN**

We summarize the facts as we understand them:
* A German-headquartered pharmaceutical company (a for-profit private legal entity) is the entity undertaking the activities.
* The company synthesized a class of Actinomycetia isolated from a soil sample.
* The soil sample was obtained from [[Dibang Valley, India::AI Geographic Verification: Confirmed biodiversity hotspot location under NBA jurisdiction|severity:low]].
* The date of access/isolation of the Actinomycetia was [[November 2016::AI Temporal Analysis: Date falls within BDA enforcement period (post-2004)|severity:medium]].
* Drug discovery work on the Actinomycetia is conducted in Germany and France.
* The company plans to file a patent on the new compound derived from the Actinomycetia.
* Safety trials have been conducted in the EU.
* Efficacy trials will be conducted in the EU.
* The company plans to commercialize the medicinal product in the United States (US), India, the United Kingdom (UK), and the European Union (EU).
* As of the current date (2025-06-02), [[no specific Material Transfer Agreements (MTAs) or other agreements, nor records of Prior Informed Consent (PIC) or Mutually Agreed Terms (MAT)::AI Compliance Alert: Critical documentation gap identified - missing required NBA approvals|severity:high]] related to the Actinomycetia from Dibang Valley, India, have been identified in the provided documentation.

**E. LEGAL ANALYSIS**

**Section 1: Provider Country Applicability Assessment (India)**

This section assesses the applicability of India's Access and Benefit-Sharing (ABS) laws, specifically the Biological Diversity Act, 2002 (the "BDA"), and the Biological Diversity Rules, 2004, as well as the more recent Biodiversity Regulations 2025.04.29, to the access and utilization of the Actinomycetia.

**1. Relevant ABS Legislation**
The primary legislation governing ABS in India is the Biological Diversity Act, 2002, and the Biological Diversity Rules, 2004. These are supplemented by subsequent amendments and regulations, including the Indian Biodiversity Regulations 2025.04.29, which provide detailed provisions for benefit-sharing and compliance. India is a Party to the Convention on Biological Diversity (CBD) and the Nagoya Protocol.

**2. Personal Scope**
The German pharmaceutical company, as a foreign, for-profit private legal entity engaged in commercial utilization of a biological resource, [[falls squarely within the personal scope of the Indian ABS laws::AI Jurisdictional Analysis: Entity classification matches Section 3(2) criteria with 98% confidence|severity:medium]]. Section 3(2) of the BDA explicitly requires prior approval from the National Biodiversity Authority (NBA) for "any person who is not a citizen of India, or a body corporate, association or organization that is not registered in India, or a non-resident Indian" to obtain any biological resource occurring in India for research, commercial utilization, or bio-survey and bio-utilization [FN1, Section 3(2)].

**3. Material Scope**
The Actinomycetia isolated from a soil sample constitutes a "biological resource" under the BDA. Section 2(c) of the BDA defines "biological resources" broadly to include "plants, animals and micro-organisms or parts thereof, their genetic material and by-products... with actual or potential use or value" [FN1, Section 2(c)]. The company's activities involve the synthesis of a class of Actinomycetia for drug discovery, which constitutes "utilization" of this genetic resource. Furthermore, the Indian Biodiversity Regulations 2025.04.29 explicitly include "digital sequence information" (DSI) within the scope of biological resources for which prior intimation/approval and benefit-sharing obligations apply [FN2, Regulation 5(1), Form B]. If any DSI was generated or used from the Actinomycetia, it would also be covered.

**4. Temporal Scope**
The access to the soil sample occurred in November 2016. The core provisions of the BDA, including those related to access and commercial utilization (e.g., Sections 3-7, 18-47), came into force on July 1, 2004 [FN1, Section 1(2)]. As the access occurred well after these effective dates, the activities fall within the temporal scope of the Indian ABS laws. Rule 13(2) of the Indian Biodiversity Rules 2024 (which appears to be a re-numbering or update of the 2004 rules, as referenced in the research findings) further clarifies that any person in possession of a biological resource before the coming into force of the Biological Diversity (Amendment) Act, 2023, shall seek approval for research, commercial utilization, bio-survey, and bio-utilization [FN3, Rule 13(2)].

**5. Geographic Scope**
The Actinomycetia was isolated from a soil sample collected in Dibang Valley, India. The BDA extends its jurisdiction "to the whole of India" [FN1, Section 1(2)]. The definition of "access" in Section 2(a) of the Act refers to "collecting, procuring or possessing any biological resource occurring in or obtained from India" [FN1, Section 2(a)]. This clearly establishes the origin of the genetic resource within India's sovereign territory, making Indian ABS laws applicable.

**6. Functional Scope**
The company's activities, including the synthesis of Actinomycetia, drug discovery work, planned patent filing on the new compound, and commercialization of the medicinal product, all constitute "access" and "utilization" for commercial purposes under the Indian BDA. Section 2(a) of the BDA defines "access" for purposes including "research or bio-survey or commercial utilisation" [FN1, Section 2(a)]. The intent to patent and commercialize unequivocally triggers the "commercial utilisation" provisions, thereby falling within the functional scope.

**7. Conclusion on Provider Country Applicability**
Based on the comprehensive analysis of all applicable scopes, Indian ABS laws definitively apply to the access and utilization of the Actinomycetia by the German pharmaceutical company. This triggers obligations for Prior Informed Consent (PIC), Mutually Agreed Terms (MAT), and benefit-sharing.

**Section 2: User Country Applicability Assessment**

This section assesses the applicability of user country ABS compliance legislation in the European Union (EU).

The [[EU Regulation (EU) No 511/2014::AI Regulation Check: Primary EU ABS framework verified against EUR-Lex database (2024)|severity:low]] on compliance measures for users of the Nagoya Protocol (the "EU ABS Regulation") is applicable to your company's utilization activities in Germany and France. This determination is based on the following:
* **Genetic Resource Accessed on or after 12 October 2014?** Yes, the Actinomycetia was accessed in November 2016. The EU ABS Regulation applies to genetic resources accessed on or after 12 October 2014 [FN4, Article 2].
* **Country of Access a Party to the Nagoya Protocol?** Yes, India is a Party to the Nagoya Protocol and was a Party on the date of access (October 9, 2014, ratification date) [FN5].
* **Genetic Resource Accessed within Geographic Scope of ABS Law?** Yes, the Actinomycetia was accessed in Dibang Valley, India, which is within the territorial scope of India's ABS law.
* **Party of Access has Rules on ABS that Apply?** Yes, India has comprehensive ABS legislation (BDA, Rules, Regulations) that applies to the Actinomycetia.
* **Access Relates to Non-Human Genetic Material?** Yes, Actinomycetia is a microorganism, which is non-human genetic material containing functional units of heredity [FN4, Article 3(1)]. The synthesized compound is a derivative, and the Regulation covers research and development activities on such derivatives when there is an ascertainable level of continuity with the genetic resource, which is the case here.
* **Activity Falls within Material Scope of ABS Law?** Yes, the Actinomycetia and its derivatives fall within the material scope.
* **Utilization Constitutes R&D on Genetic/Biochemical Composition Creating "New Insight"?** Yes, the "drug discovery work," "safety trials," and "efficacy trials" conducted in Germany and France constitute "utilization" as defined in Article 3(5) of the EU ABS Regulation, meaning "to conduct research and development on the genetic and/or biochemical composition of genetic resources, including through the application of biotechnology" [FN4, Article 3(5)].
* **R&D Carried Out in EU Member State?** Yes, the R&D is carried out in Germany and France, both EU Member States.

**Conclusion on EU Applicability:** The EU ABS Regulation (EU) No 511/2014 is [[fully applicable to your company's utilization activities::AI Legal Conclusion: All 8 applicability criteria satisfied - mandatory due diligence required|severity:high]] in Germany and France, triggering due diligence obligations.

**F. RECOMMENDATIONS AND NEXT STEPS**

**8. Key Legal Obligations and Risks in the Provider Country (India)**

In India, there are [[significant penalties for contravention of BDA provisions::AI Penalty Analysis: Section 55 penalties include imprisonment up to 5 years and/or fines|severity:high]] [FN1, Section 55]. Given the facts provided, there is a clear non-compliance as prior approval from the NBA was not sought for access, utilization, patent filing, or commercialization. This creates a risk of a challenge to the validity of any patent filed on the new compound, particularly in India, due to non-compliance with Section 6(1) of the BDA. India has also been known to actively reach out to user countries' authorities to flag non-compliance.
The [[Indian Biodiversity Regulations 2025.04.29::AI Source Currency: Most recent regulatory framework - published April 2025|severity:low]] provide a framework for monetary benefit-sharing based on annual gross ex-factory sale price (excluding government taxes) [FN2, Regulation 4(1)], as follows:
* Annual turnover up to INR 5 crore: Nil
* Annual turnover above INR 5 crore to INR 50 crore (approx. EUR 550,000 to EUR 5.5 million / USD 600,000 to USD 6 million): 0.2%
* Annual turnover above INR 50 crore to INR 250 crore (approx. EUR 5.5 million to EUR 27.5 million / USD 6 million to USD 30 million): 0.4%
* Annual turnover above INR 250 crore (approx. EUR 27.5 million / USD 30 million): 0.6%
For IPR commercialization by the applicant, up to 1% of annual gross ex-factory sale price [FN2, Regulation 8(1)(i)]. If IPR is assigned/licensed, up to 5% of fees/royalties received [FN2, Regulation 8(1)(ii)]. Non-monetary benefits could include joint ownership of IP, technology transfer, capacity building, or contributions to conservation efforts [FN2, Regulation 11(1), Form F].

**9. Key Legal Risks in the User Countries**
In our analysis, we have determined that the Indian ABS law applies to the access of the Actinomycetia in November 2016. We also concluded that EU Regulation (EU) No 511/2014 is applicable to the company's activities in France and Germany. As a result, the company has a due diligence obligation to ensure and demonstrate that the Actinomycetia was acquired in accordance with Indian ABS law. Based on the facts and documents provided, we concluded that Indian ABS law has not been complied with. As a consequence, the company currently cannot demonstrate compliance with its EU due diligence obligations. In particular, under EU law, the company will be required to submit a due diligence declaration prior to seeking a marketing authorization for the medicinal product, which will reveal the non-compliance. We recommend that the company take the following steps to resolve this non-compliance.
**Possible Action:** Document all efforts to regularize the situation with the Indian authorities. This documentation will be crucial for demonstrating ongoing due diligence efforts to EU and UK competent authorities.

**Possible Action:** Prepare to submit due diligence declarations to the competent national authorities in Germany and France (for the EU) and the UK, as the product approaches its final development stage and commercialization. These declarations will reference the ongoing or completed regularization process with India.

**G. BINDING SOURCES OF LAW**

* [FN1] India, Biological Diversity Act, 2002 (No. 18 of 2003), as amended.
* [FN3] India, Biological Diversity Rules, 2004 (G.S.R. 612(E)), as amended (including references to 2024 updates in research findings).
* [FN4] Regulation (EU) No 511/2014 of the European Parliament and of the Council of 16 April 2014 on compliance measures for users from the Nagoya Protocol on Access to Genetic Resources and the Fair and Equitable Sharing of Benefits Arising from their Utilisation in the Union.

**H. NON-BINDING, BUT OFFICIAL SOURCES**

* [FN2] India, Biodiversity Regulations 2025.04.29 (as referenced in research findings, indicating recent updates to Indian regulatory framework).

**I. OTHER SOURCES**

* [FN5] Convention on Biological Diversity (CBD) and Nagoya Protocol status information (general knowledge base).`

export default function MemorandumDetailPage() {
  const router = useRouter()

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
                      {MEMO_CONTENT}
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
