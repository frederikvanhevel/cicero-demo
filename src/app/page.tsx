"use client"

import { Search, ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/SearchBar"
import PromptCard from "@/components/PromptCard"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const prompts = [
    {
      title: "Access & Benefit Sharing Memorandum",
      description: "Generate ABS agreements for biological resources, research partnerships, and regulatory compliance with 2025 standards.",
    },
    {
      title: "Memorandum of Understanding (MOU)",
      description: "Draft professional MOUs for partnerships, collaborations, and joint ventures with clear terms and expectations.",
    },
    {
      title: "Compliance Memorandum",
      description: "Create compliance memos for GDPR, HIPAA, AI regulations, and industry-specific requirements with expert guidance.",
    },
    {
      title: "Memorandum of Agreement (MOA)",
      description: "Prepare formal, legally-binding MOAs with detailed terms, responsibilities, and performance obligations.",
    },
    {
      title: "Internal Policy Memorandum",
      description: "Develop clear internal policy memos for company procedures, guidelines, and organizational announcements.",
    },
    {
      title: "Legal Briefing Memorandum",
      description: "Summarize legal matters, case law, regulatory changes, and provide strategic recommendations for decision-makers.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="min-h-screen">
        <Header logoType="image" />

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-2 tracking-tight">
              Welcome back.
            </h1>
            <p className="font-serif text-3xl md:text-4xl text-foreground/80">
              What would you like to draft today?
            </p>
          </div>

          <SearchBar />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium text-foreground">Memorandum Templates</h3>
                <span className="text-xs text-white bg-accent px-2 py-1 rounded font-medium">
                  Popular
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Create custom
                </Button>
                <Button variant="default" size="sm" className="text-xs bg-accent text-white hover:bg-accent/90">
                  View all templates
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prompts.map((prompt, index) => (
                <PromptCard
                  key={index}
                  title={prompt.title}
                  description={prompt.description}
                  onClick={() => router.push('/memorandums/new')}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
