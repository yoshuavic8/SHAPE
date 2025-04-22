"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { CategoryScore, ShapeRecommendations } from "@/lib/shape-analyzer-adapter"
import { useToast } from "@/components/ui/use-toast"
import { Download } from "lucide-react"
import { generateShapePDF } from "./shape-pdf-generator"

interface PDFExportButtonProps {
  userName: string
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  shapeCode: string
  recommendations: ShapeRecommendations
  completedDate: string
}

export function PDFExportButton({
  userName,
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  shapeCode,
  recommendations,
  completedDate,
}: PDFExportButtonProps) {
  const [generating, setGenerating] = useState(false)
  const { toast } = useToast()

  const handleExportToPDF = async () => {
    try {
      setGenerating(true)
      toast({
        title: "Membuat PDF",
        description: "Mohon tunggu sementara hasil Anda sedang disiapkan...",
      })

      await generateShapePDF({
        userName,
        spiritualGifts,
        heartDesire,
        personality,
        experiences,
        shapeCode,
        recommendations,
        completedDate,
      })

      toast({
        title: "PDF Dibuat",
        description: "Hasil Anda telah diekspor sebagai file PDF.",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Error",
        description: "Gagal membuat PDF. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Button onClick={handleExportToPDF} disabled={generating}>
      <Download className="mr-2 h-4 w-4" />
      {generating ? "Membuat PDF..." : "Ekspor ke PDF"}
    </Button>
  )
}
