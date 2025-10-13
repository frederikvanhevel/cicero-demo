"use client"

import { Home, FileText, Briefcase, Calendar, ListChecks, Database, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: FileText, label: "Memorandums", path: "/memorandums" },
    { icon: Briefcase, label: "Projects", path: "#" },
    { icon: Calendar, label: "Calendar", path: "#" },
    { icon: ListChecks, label: "Tasks", path: "#" },
    { icon: Database, label: "Library", path: "#" },
  ]

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <aside className="fixed left-0 top-[57px] h-[calc(100vh-57px)] w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-4">
      <nav className="flex flex-col gap-1 flex-1 w-full px-2">
        {navItems.map((item, index) => {
          const active = isActive(item.path)
          return (
            <button
              key={index}
              onClick={() => item.path !== "#" && router.push(item.path)}
              className={`relative w-full h-10 rounded-lg flex items-center justify-center transition-all duration-100 cursor-pointer ${
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-label={item.label}
            >
              <item.icon size={18} strokeWidth={active ? 2.5 : 2} />
            </button>
          )
        })}
      </nav>

      <button
        className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-100 cursor-pointer"
        aria-label="Settings"
      >
        <Settings size={18} strokeWidth={2} />
      </button>
    </aside>
  )
}

export default Sidebar
