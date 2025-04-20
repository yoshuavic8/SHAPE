"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import type { CategoryScore } from "@/lib/results-analyzer"

interface ShapeRadarChartProps {
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
}

export function ShapeRadarChart({ 
  spiritualGifts, 
  heartDesire, 
  personality, 
  experiences 
}: ShapeRadarChartProps) {
  // Calculate average scores for each category (top 3 items)
  const getAverageScore = (scores: CategoryScore[]): number => {
    if (scores.length === 0) return 0
    return scores.slice(0, 3).reduce((sum, item) => sum + item.score, 0) / Math.min(scores.length, 3)
  }
  
  // Get abilities scores from personality results
  const abilities = personality.filter(item => item.category.includes("Kemampuan:"))
  
  // Get personality type scores
  const personalityType = personality.filter(item => !item.category.includes("Kemampuan:"))
  
  const spiritualScore = getAverageScore(spiritualGifts)
  const heartScore = getAverageScore(heartDesire)
  const personalityScore = getAverageScore(personalityType)
  const abilitiesScore = getAverageScore(abilities)
  const experiencesScore = getAverageScore(experiences)
  
  const data = [
    { subject: 'Spiritual Gifts', value: spiritualScore, fullMark: 5 },
    { subject: 'Heart Desire', value: heartScore, fullMark: 5 },
    { subject: 'Personality', value: personalityScore, fullMark: 5 },
    { subject: 'Abilities', value: abilitiesScore, fullMark: 5 },
    { subject: 'Experiences', value: experiencesScore, fullMark: 5 },
  ]

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar 
            name="SHAPE Profile" 
            dataKey="value" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={0.6} 
          />
          <Tooltip formatter={(value) => [`${value} / 5`, 'Score']} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
