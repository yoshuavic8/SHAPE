"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoryScore } from "@/lib/shape-analyzer-adapter"

interface InsightAnalysisSectionProps {
  data: CategoryScore[]
  title: string
}

export function InsightAnalysisSection({ data, title }: InsightAnalysisSectionProps) {
  // Filter insights
  const insights = data.filter(item => item.type === "insight")

  if (insights.length === 0) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 border rounded-lg bg-amber-50">
              <h4 className="font-semibold text-lg">{insight.category}</h4>
              <div className="mt-3 text-gray-700">
                <p>{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
