"use client"

import { Search, ArrowUpDown, Plus } from "lucide-react"
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
      title: "ABS Compliance Memorandum",
      description: "Draft comprehensive compliance memoranda covering access and benefit-sharing obligations under the Nagoya Protocol and related national legislation.",
    },
    {
      title: "Material Transfer Agreement",
      description: "Draft MTAs for genetic resource transfers, ensuring proper documentation and compliance with ABS regulations across jurisdictions.",
    },
    {
      title: "Nagoya Protocol Compliance",
      description: "Create compliance documentation for user country obligations under EU, UK, and other Nagoya Protocol implementing regulations.",
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
                <h3 className="text-sm font-medium text-foreground">Templates</h3>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Show templates
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs bg-accent text-white hover:bg-accent/90"
                  onClick={() => router.push('/memorandums/new')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New memorandum
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
