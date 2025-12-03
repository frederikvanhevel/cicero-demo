"use client"

import { FileText } from "lucide-react"

interface PromptCardProps {
  title: string
  description: string
  category?: string
  author?: string
  onClick?: () => void
}

const PromptCard = ({ title, description, category = "Template", onClick }: PromptCardProps) => {
  return (
    <div
      className="group relative bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer p-6 flex flex-col overflow-hidden"
      onClick={onClick}
    >
      {/* SVG Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 560">
          <g fill="none">
            <path d="M1440 0L1068.65 0L1440 245.89z" fill="rgba(59, 130, 246, .12)"></path>
            <path d="M1068.65 0L1440 245.89L1440 307.96L933.3500000000001 0z" fill="rgba(59, 130, 246, .09)"></path>
            <path d="M933.3499999999999 0L1440 307.96L1440 312.4L883.3599999999999 0z" fill="rgba(59, 130, 246, .06)"></path>
            <path d="M883.36 0L1440 312.4L1440 327.19L603.52 0z" fill="rgba(59, 130, 246, .03)"></path>
            <path d="M0 560L169.53 560L0 392.59000000000003z" fill="rgba(14, 42, 71, .12)"></path>
            <path d="M0 392.59000000000003L169.53 560L779.05 560L0 327.29z" fill="rgba(14, 42, 71, .09)"></path>
            <path d="M0 327.29L779.05 560L1047.47 560L0 180.82000000000002z" fill="rgba(14, 42, 71, .06)"></path>
            <path d="M0 180.82000000000005L1047.47 560L1142.22 560L0 89.60000000000005z" fill="rgba(14, 42, 71, .03)"></path>
          </g>
        </svg>
      </div>

      {/* Subtle left accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/0 group-hover:bg-primary/100 transition-all duration-200 z-10" />

      {/* Content wrapper - relative positioning to sit above SVG */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Icon */}
        <div className="mb-4 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors duration-200">
          <FileText className="w-5 h-5" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-card-foreground text-base leading-tight mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-grow">
          {description}
        </p>

        {/* Meta info - always at bottom */}
        <div className="flex items-center gap-2 text-muted-foreground text-xs pt-4 border-t border-border/50">
          <span className="font-medium">{category}</span>
        </div>
      </div>
    </div>
  )
}

export default PromptCard
