"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { CategoryScore } from "@/lib/shape-analyzer-adapter"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useToast } from "@/components/ui/use-toast"

interface ResultsPDFProps {
  userName: string
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  abilities: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  shapeCode: string
  recommendations: any
}

export function ResultsPDF({
  userName,
  spiritualGifts,
  heartDesire,
  abilities,
  personality,
  experiences,
  shapeCode,
  recommendations,
}: ResultsPDFProps) {
  const [generating, setGenerating] = useState(false)
  const { toast } = useToast()

  const exportToPDF = async () => {
    try {
      setGenerating(true)
      toast({
        title: "Membuat PDF",
        description: "Mohon tunggu sementara hasil Anda sedang disiapkan...",
      })

      const resultsElement = document.getElementById("results-container")
      if (!resultsElement) {
        throw new Error("Kontainer hasil tidak ditemukan")
      }

      const canvas = await html2canvas(resultsElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30

      // Add title
      pdf.setFontSize(18)
      pdf.text(`Hasil Penilaian SHAPE-E untuk ${userName}`, 20, 15)

      // Add SHAPE code
      pdf.setFontSize(14)
      pdf.text(`SHAPE Code: ${shapeCode}`, 20, 25)

      // Add image of results
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      pdf.save(`SHAPE_Results_${userName.replace(/\s+/g, "_")}.pdf`)

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
    <Button onClick={exportToPDF} disabled={generating}>
      {generating ? "Membuat PDF..." : "Ekspor ke PDF"}
    </Button>
  )
}
