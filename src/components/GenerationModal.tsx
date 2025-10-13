'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, Loader2, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GenerationStage {
    id: string
    label: string
    status: 'pending' | 'active' | 'complete'
}

interface GenerationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onMinimize?: () => void
    documentTitle?: string
}

export function GenerationModal({
    open,
    onOpenChange,
    onMinimize,
    documentTitle = 'ABS Compliance Memorandum'
}: GenerationModalProps) {
    const [stages, setStages] = useState<GenerationStage[]>([
        { id: '1', label: 'Analyzing your responses', status: 'complete' },
        { id: '2', label: 'Researching legal requirements', status: 'active' },
        { id: '3', label: 'Drafting memorandum', status: 'pending' },
        { id: '4', label: 'Review and formatting', status: 'pending' }
    ])

    const [progress, setProgress] = useState(25)
    const [timeRemaining, setTimeRemaining] = useState('8-12')

    // Simulate progress for demo (in production, this would come from backend)
    useEffect(() => {
        if (!open) return

        // Stage 1 -> 2 transition
        const timer1 = setTimeout(() => {
            setStages([
                { id: '1', label: 'Analyzing your responses', status: 'complete' },
                { id: '2', label: 'Researching legal requirements', status: 'complete' },
                { id: '3', label: 'Drafting memorandum', status: 'active' },
                { id: '4', label: 'Review and formatting', status: 'pending' }
            ])
            setProgress(50)
            setTimeRemaining('6-8')
        }, 3000)

        // Stage 2 -> 3 transition
        const timer2 = setTimeout(() => {
            setStages([
                { id: '1', label: 'Analyzing your responses', status: 'complete' },
                { id: '2', label: 'Researching legal requirements', status: 'complete' },
                { id: '3', label: 'Drafting memorandum', status: 'complete' },
                { id: '4', label: 'Review and formatting', status: 'active' }
            ])
            setProgress(75)
            setTimeRemaining('3-5')
        }, 6000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <div className="space-y-6 py-4">
                    {/* Header */}
                    <div className="space-y-1">
                        <h2 className="text-base font-semibold text-foreground">
                            {documentTitle}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Generating memorandum...
                        </p>
                    </div>

                    {/* Stages */}
                    <div className="space-y-3">
                        {stages.map((stage) => (
                            <div
                                key={stage.id}
                                className={cn(
                                    'flex items-center gap-3 p-4 rounded-lg border transition-all duration-300',
                                    stage.status === 'active' && 'border-primary/50 bg-primary/5',
                                    stage.status === 'complete' && 'border-border bg-muted/30',
                                    stage.status === 'pending' && 'border-border bg-background'
                                )}
                            >
                                <div className="flex-shrink-0">
                                    {stage.status === 'complete' && (
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    )}
                                    {stage.status === 'active' && (
                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    )}
                                    {stage.status === 'pending' && (
                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className={cn(
                                        'text-sm font-medium transition-colors duration-300',
                                        stage.status === 'active' && 'text-foreground',
                                        stage.status === 'complete' && 'text-foreground',
                                        stage.status === 'pending' && 'text-muted-foreground'
                                    )}>
                                        {stage.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-2">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-700 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{progress}% complete</span>
                            <span>~{timeRemaining} min remaining</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center pt-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                onOpenChange(false)
                                onMinimize?.()
                            }}
                            className="gap-2"
                        >
                            <Minimize2 className="h-4 w-4" />
                            Continue Working
                        </Button>
                    </div>

                    {/* Small disclaimer */}
                    <p className="text-xs text-muted-foreground text-center">
                        You can close this window and we'll notify you when complete
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
