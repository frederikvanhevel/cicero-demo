import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeaderProps {
  variant?: "default" | "compact"
  showLogo?: boolean
  logoType?: "image" | "icon"
  className?: string
}

export function Header({
  variant = "default",
  showLogo = true,
  logoType = "icon",
  className
}: HeaderProps) {
  const height = variant === "compact" ? "py-2" : "py-3"

  return (
    <header className={cn("border-b border-border bg-background sticky top-0 z-10", className)}>
      <div className={`px-6 ${height} flex items-center justify-between`}>
        {showLogo && (
          <div className="flex items-center gap-3">
            {logoType === "image" ? (
              <>
                <Image
                  src="/logo.png"
                  alt="Cicero Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-serif font-bold text-foreground">Cicero</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-sm font-semibold text-foreground">Cicero</span>
              </>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center cursor-pointer hover:opacity-90 transition-all duration-200">
            <span className="text-xs font-medium text-white">FV</span>
          </div>
        </div>
      </div>
    </header>
  )
}
