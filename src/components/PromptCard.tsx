"use client"

import { Settings2 } from "lucide-react"

interface PromptCardProps {
  title: string
  description: string
  category?: string
  author?: string
}

const PromptCard = ({ title, description, category = "Template", author = "By Cicero" }: PromptCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:border-foreground/20 hover:bg-muted/30 transition-all duration-100 cursor-pointer group">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-base">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{category}</span>
          </div>

          <button className="p-1.5 rounded-lg hover:bg-muted transition-all duration-100">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromptCard
