"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ReflectiveOverviewSectionProps {
  reflectiveInsights?: {
    category: string;
    description?: string;
    metadata?: {
      spheres?: string[];
      themes?: string[];
      sentiment?: "positive" | "neutral" | "negative";
      keywords?: string[];
    };
  }[];
}

export function ReflectiveOverviewSection({ reflectiveInsights }: ReflectiveOverviewSectionProps) {
  if (!reflectiveInsights || reflectiveInsights.length === 0) {
    return null;
  }

  // Group insights by category
  const sphereInsights = reflectiveInsights.find(i => i.category.includes("Bidang Pengaruh"));
  const themeInsights = reflectiveInsights.find(i => i.category.includes("Tema"));
  const keywordInsights = reflectiveInsights.find(i => i.category.includes("Kata Kunci"));

  if (!sphereInsights && !themeInsights && !keywordInsights) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reflective Insights</CardTitle>
        <CardDescription>Wawasan dari refleksi pribadi Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sphere Insights */}
          {sphereInsights && (
            <div>
              <h4 className="text-md font-semibold mb-2">Bidang Pengaruh</h4>
              <div className="p-3 border rounded-lg bg-blue-50">
                <p>{sphereInsights.description}</p>
                {sphereInsights.metadata?.spheres && sphereInsights.metadata.spheres.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
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
              <h4 className="text-md font-semibold mb-2">Tema Utama</h4>
              <div className="p-3 border rounded-lg bg-purple-50">
                <p>{themeInsights.description}</p>
                {themeInsights.metadata?.themes && themeInsights.metadata.themes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
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
        </div>
      </CardContent>
    </Card>
  )
}
