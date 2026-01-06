import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PreviewPanel() {
  return (
    <div className="flex flex-col h-full bg-muted/10 border-l">
      <div className="flex items-center justify-between p-4 border-b h-16">
        <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Preview</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-6">
        <div className="animate-in fade-in zoom-in-95 duration-500">
            {/* Mock Content for Preview */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
                        <div className="h-8 w-3/4 bg-muted/50 rounded animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-muted/30 rounded" />
                        <div className="h-3 w-full bg-muted/30 rounded" />
                        <div className="h-3 w-5/6 bg-muted/30 rounded" />
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-surface border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">
                    Select an item from the chat to preview details here.
                </p>
                <Button variant="outline" className="mt-4" size="sm">
                    View Documentation
                </Button>
            </div>
            
             <div className="mt-6 space-y-4">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Artifacts</h4>
                <div className="grid gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border">
                            <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <FileText className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Candidate_Report_{i}.pdf</p>
                                <p className="text-xs text-muted-foreground">Generated 2m ago</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </ScrollArea>
    </div>
  )
}
