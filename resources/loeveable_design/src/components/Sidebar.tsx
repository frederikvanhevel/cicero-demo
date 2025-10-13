import { Home, Briefcase, Calendar, ListChecks, Database, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: Briefcase, label: "Projects" },
    { icon: Calendar, label: "Calendar" },
    { icon: ListChecks, label: "Tasks" },
    { icon: Database, label: "Library" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
        <span className="text-accent font-bold text-xl">L</span>
      </div>
      
      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label={item.label}
          >
            <item.icon size={20} />
          </button>
        ))}
      </nav>

      <button
        className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>
    </aside>
  );
};

export default Sidebar;
