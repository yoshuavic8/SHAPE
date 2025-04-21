"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoryScore } from "@/lib/shape-analyzer-adapter"

interface ReflectiveInsightsSectionProps {
  heartDesire: CategoryScore[]
}

export function ReflectiveInsightsSection({ heartDesire }: ReflectiveInsightsSectionProps) {
  // Filter reflective insights
  const reflections = heartDesire.filter(h => h.type === "open")
  const insights = heartDesire.filter(h => h.type === "reflection")

  if (reflections.length === 0 && insights.length === 0) {
    return null
  }

  // Group insights by category
  const sphereInsights = insights.find(i => i.category.includes("Bidang Pengaruh"))
  const themeInsights = insights.find(i => i.category.includes("Tema"))
  const keywordInsights = insights.find(i => i.category.includes("Kata Kunci"))
  const recommendations = insights.filter(i => i.category.includes("Rekomendasi"))

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Reflective Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Raw Reflections */}
          {reflections.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Your Reflections</h4>
              <div className="space-y-4">
                {reflections.map((reflection, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-slate-50">
                    <h5 className="font-medium">{reflection.category}</h5>
                    <p className="mt-2 italic text-gray-700">"{reflection.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sphere Insights */}
          {sphereInsights && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Bidang Pengaruh</h4>
              <div className="p-4 border rounded-lg bg-blue-50">
                <p>{sphereInsights.description}</p>
                {sphereInsights.metadata?.spheres && sphereInsights.metadata.spheres.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sphereInsights.metadata.spheres.map((sphere, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {sphere === "religion" ? "Agama/Spiritualitas" :
                         sphere === "family" ? "Keluarga" :
                         sphere === "education" ? "Pendidikan" :
                         sphere === "government" ? "Pemerintahan" :
                         sphere === "media" ? "Media" :
                         sphere === "arts" ? "Seni & Hiburan" :
                         sphere === "business" ? "Bisnis/Ekonomi" : sphere}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Theme Insights */}
          {themeInsights && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Tema Utama</h4>
              <div className="p-4 border rounded-lg bg-purple-50">
                <p>{themeInsights.description}</p>
                {themeInsights.metadata?.themes && themeInsights.metadata.themes.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {themeInsights.metadata.themes.map((theme, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {theme === "leadership" ? "Kepemimpinan" :
                         theme === "service" ? "Pelayanan" :
                         theme === "teaching" ? "Pengajaran" :
                         theme === "compassion" ? "Kasih & Empati" :
                         theme === "innovation" ? "Inovasi" :
                         theme === "justice" ? "Keadilan" :
                         theme === "community" ? "Komunitas" :
                         theme === "growth" ? "Pertumbuhan" : theme}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Keyword Insights */}
          {keywordInsights && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Kata Kunci</h4>
              <div className="p-4 border rounded-lg bg-green-50">
                <p>{keywordInsights.description}</p>
                {keywordInsights.metadata?.keywords && keywordInsights.metadata.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordInsights.metadata.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Rekomendasi Berdasarkan Refleksi</h4>
              <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-amber-50">
                    <p>{recommendation.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
