import { Search, ArrowUpDown, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import PromptCard from "@/components/PromptCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const prompts = [
    {
      title: "Help Me to Create a Better Prompt",
      description: "This prompt helps you create a clearer, more effective prompt based on your input. It guides you through refining your ideas into actionable instructions.",
    },
    {
      title: "Court Case Summary",
      description: "Use this prompt to summarize court cases, extracting key facts, legal issues, and outcomes in a clear format.",
    },
    {
      title: "Write Board Meeting Minutes",
      description: "No description",
    },
    {
      title: "Draft a Playbook Rule - BETA",
      description: "To get the best result, provide either the clause you want to convert into a rule, or a list that describes the process.",
    },
    {
      title: "DPA GDPR analysis",
      description: "No description",
    },
    {
      title: "Creating Timeline",
      description: "Please go ahead and upload the documents containing the event details you want me to extract and organize into a timeline.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-16 min-h-screen">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Assistant</h2>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">JD</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">+2</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="text-xs">
                Share project
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Feedback
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Chat history
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-2 tracking-tight">
              Morning, Jack.
            </h1>
            <p className="font-serif text-3xl md:text-4xl text-foreground/80">
              What can I do for you?
            </p>
          </div>

          <SearchBar />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium text-foreground">Workflows & Prompts</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  Featured
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
                  Create new
                </Button>
                <Button variant="default" size="sm" className="text-xs bg-foreground text-background hover:bg-foreground/90">
                  Browse all
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prompts.map((prompt, index) => (
                <PromptCard
                  key={index}
                  title={prompt.title}
                  description={prompt.description}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
