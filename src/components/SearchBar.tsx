"use client"

import { Globe, FileText, Paperclip, Upload } from "lucide-react"
import { Button } from "./ui/button"

const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-16">
      <div className="relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
        <input
          type="text"
          placeholder="Give me a task to work on..."
          className="w-full px-6 py-5 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />

        <div className="flex items-center gap-3 px-6 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full h-8 px-3 text-xs font-medium bg-accent/10 text-accent hover:bg-accent/20"
            >
              <Globe className="w-3 h-3 mr-1.5" />
              Legal research
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <span className="text-xs font-medium">EU</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <FileText className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1" />

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-4 h-4 mr-1.5" />
            Prompt library
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
