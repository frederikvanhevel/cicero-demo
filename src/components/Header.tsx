import Image from "next/image"
import Link from "next/link"
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
      <div className={`pr-6 ${height} flex items-center justify-between`}>
        {showLogo && (
          <Link href="/" className="flex items-center gap-3 pl-4 hover:opacity-80 transition-opacity">
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
          </Link>
        )}

        <div className="flex items-center gap-2">
          <Image
            src="/avatar.jpg"
            alt="User Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-90 transition-all duration-200"
          />
        </div>
      </div>
    </header>
  )
}
