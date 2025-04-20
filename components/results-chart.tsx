"use client"
import type { CategoryScore } from "@/lib/results-analyzer"

interface ResultsChartProps {
  data: CategoryScore[]
  title: string
  colorClass: string
}

export function ResultsChart({ data, title, colorClass }: ResultsChartProps) {
  const topResults = data.slice(0, 5)

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="space-y-3">
        {topResults.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.category}</span>
              <span>{item.score} / 5</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full ${colorClass}`} style={{ width: `${item.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
