"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

interface QuestionnaireFlowProps {
  currentSection: number
}

export function QuestionnaireFlow({ currentSection }: QuestionnaireFlowProps) {
  const router = useRouter()
  
  const sections = [
    { id: 1, name: "Spiritual Gifts", path: "/questionnaire/spiritual" },
    { id: 2, name: "Heart Desire", path: "/questionnaire/heart" },
    { id: 3, name: "Personality & Abilities", path: "/questionnaire/personality" },
    { id: 4, name: "Experiences", path: "/questionnaire/experiences" }
  ]

  return (
    <div className="mb-8">
      <div className="flex justify-between relative">
        {sections.map((section, index) => (
          <div 
            key={section.id} 
            className="flex flex-col items-center relative z-10"
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                section.id === currentSection 
                  ? "bg-primary text-primary-foreground" 
                  : section.id < currentSection 
                    ? "bg-primary/80 text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
              )}
            >
              {section.id < currentSection ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                section.id
              )}
            </div>
            <span 
              className={cn(
                "text-xs font-medium",
                section.id === currentSection 
                  ? "text-primary" 
                  : section.id < currentSection 
                    ? "text-foreground" 
                    : "text-muted-foreground"
              )}
            >
              {section.name}
            </span>
            
            {/* Navigation button for completed sections */}
            {section.id < currentSection && (
              <Button 
                variant="link" 
                size="sm" 
                className="text-xs mt-1 h-auto p-0"
                onClick={() => router.push(section.path)}
              >
                Review
              </Button>
            )}
          </div>
        ))}
        
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
          <div 
            className="h-full bg-primary transition-all" 
            style={{ 
              width: `${((currentSection - 1) / (sections.length - 1)) * 100}%` 
            }} 
          />
        </div>
      </div>
    </div>
  )
}
