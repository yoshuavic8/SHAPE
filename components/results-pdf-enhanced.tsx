"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { CategoryScore, ShapeRecommendations } from "@/lib/results-analyzer"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useToast } from "@/components/ui/use-toast"
import { Download, Share } from "lucide-react"

interface ResultsPDFEnhancedProps {
  userName: string
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  shapeCode: string
  recommendations: ShapeRecommendations
  completedDate: string
}

export function ResultsPDFEnhanced({
  userName,
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  shapeCode,
  recommendations,
  completedDate,
}: ResultsPDFEnhancedProps) {
  const [generating, setGenerating] = useState(false)
  const [pdfOptions, setPdfOptions] = useState({
    includeCharts: true,
    includeRecommendations: true,
    includeBibleVerse: true,
    includeExplanations: true,
    includePersonalizedAdvice: true,
    includeStrengthsWeaknesses: true,
    includeLearningPathways: true,
  })
  const { toast } = useToast()

  const exportToPDF = async () => {
    try {
      setGenerating(true)
      toast({
        title: "Membuat PDF",
        description: "Mohon tunggu sementara hasil Anda sedang disiapkan...",
      })

      // Get abilities from personality results
      const abilities = personality.filter(item => item.category.includes("Kemampuan:"))

      // Get personality type results
      const personalityTypes = personality.filter(item => !item.category.includes("Kemampuan:"))

      // Create PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add header with title
      pdf.setFillColor(41, 98, 255)
      pdf.rect(0, 0, 210, 30, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.text("SHAPE Discovery", 20, 20)

      // Add user info
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(16)
      pdf.text(`Hasil Penilaian untuk: ${userName}`, 20, 40)
      pdf.setFontSize(12)
      pdf.text(`SHAPE Code: ${shapeCode}`, 20, 50)
      pdf.text(`Tanggal: ${completedDate}`, 20, 55)

      let yPosition = 65

      // Add purpose statement
      pdf.setFontSize(14)
      pdf.text("Tujuan Hidup yang Direkomendasikan:", 20, yPosition)
      yPosition += 10
      pdf.setFontSize(10)
      const purposeLines = pdf.splitTextToSize(recommendations.purposeStatement || "", 170)
      pdf.text(purposeLines, 20, yPosition)
      yPosition += purposeLines.length * 5 + 10

      // Add personalized advice if option is selected
      if (pdfOptions.includePersonalizedAdvice && recommendations.personalizedAdvice.length > 0) {
        // Check if we need to add a new page
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 20
        }

        // Add section divider
        pdf.setDrawColor(200, 200, 200)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 10

        pdf.setFontSize(14)
        pdf.text("Saran Personal:", 20, yPosition)
        yPosition += 10
        pdf.setFontSize(10)

        recommendations.personalizedAdvice.forEach((advice, index) => {
          const adviceLines = pdf.splitTextToSize(`• ${advice}`, 170)
          pdf.text(adviceLines, 20, yPosition)
          yPosition += adviceLines.length * 5 + 5
        })

        yPosition += 5
      }

      // Add strengths and weaknesses if option is selected
      if (pdfOptions.includeStrengthsWeaknesses &&
          (recommendations.strengthsWeaknesses.strengths.length > 0 ||
           recommendations.strengthsWeaknesses.weaknesses.length > 0)) {
        // Check if we need to add a new page
        if (yPosition > 220) {
          pdf.addPage()
          yPosition = 20
        }

        // Add section divider
        pdf.setDrawColor(200, 200, 200)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 10

        pdf.setFontSize(14)
        pdf.text("Kekuatan & Area Pengembangan:", 20, yPosition)
        yPosition += 10

        // Add strengths
        if (recommendations.strengthsWeaknesses.strengths.length > 0) {
          pdf.setFontSize(12)
          pdf.text("Kekuatan:", 25, yPosition)
          yPosition += 8
          pdf.setFontSize(10)

          recommendations.strengthsWeaknesses.strengths.slice(0, 3).forEach((strength, index) => {
            const strengthLines = pdf.splitTextToSize(`• ${strength}`, 160)
            pdf.text(strengthLines, 30, yPosition)
            yPosition += strengthLines.length * 5 + 2
          })

          yPosition += 5
        }

        // Add weaknesses
        if (recommendations.strengthsWeaknesses.weaknesses.length > 0) {
          pdf.setFontSize(12)
          pdf.text("Area Pengembangan:", 25, yPosition)
          yPosition += 8
          pdf.setFontSize(10)

          recommendations.strengthsWeaknesses.weaknesses.slice(0, 3).forEach((weakness, index) => {
            const weaknessLines = pdf.splitTextToSize(`• ${weakness}`, 160)
            pdf.text(weaknessLines, 30, yPosition)
            yPosition += weaknessLines.length * 5 + 2
          })

          yPosition += 5
        }
      }

      // Add learning pathways if option is selected
      if (pdfOptions.includeLearningPathways && recommendations.learningPathways.length > 0) {
        // Check if we need to add a new page
        if (yPosition > 220) {
          pdf.addPage()
          yPosition = 20
        }

        // Add section divider
        pdf.setDrawColor(200, 200, 200)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 10

        pdf.setFontSize(14)
        pdf.text("Jalur Pembelajaran yang Direkomendasikan:", 20, yPosition)
        yPosition += 10
        pdf.setFontSize(10)

        recommendations.learningPathways.forEach((pathway, index) => {
          const pathwayLines = pdf.splitTextToSize(`• ${pathway}`, 170)
          pdf.text(pathwayLines, 20, yPosition)
          yPosition += pathwayLines.length * 5 + 2
        })

        yPosition += 5
      }

      // Add SHAPE synergy
      if (recommendations.shapeSynergy && recommendations.shapeSynergy.length > 0) {
        pdf.setFontSize(14)
        pdf.text("SHAPE Synergy:", 20, yPosition)
        yPosition += 10
        pdf.setFontSize(10)

        for (const synergy of recommendations.shapeSynergy) {
          const synergyLines = pdf.splitTextToSize(`• ${synergy}`, 170)
          pdf.text(synergyLines, 20, yPosition)
          yPosition += synergyLines.length * 5 + 5
        }

        yPosition += 5
      }

      // Add community roles if option is selected
      if (recommendations.communityRoles && recommendations.communityRoles.length > 0) {
        // Check if we need to add a new page
        if (yPosition > 220) {
          pdf.addPage()
          yPosition = 20
        }

        // Add section divider
        pdf.setDrawColor(200, 200, 200)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 10

        pdf.setFontSize(14)
        pdf.text("Peran Komunitas yang Direkomendasikan:", 20, yPosition)
        yPosition += 10
        pdf.setFontSize(10)

        recommendations.communityRoles.forEach((role, index) => {
          const roleLines = pdf.splitTextToSize(`• ${role}`, 170)
          pdf.text(roleLines, 20, yPosition)
          yPosition += roleLines.length * 5 + 2
        })

        yPosition += 5
      }

      // Add section divider
      pdf.setDrawColor(200, 200, 200)
      pdf.line(20, yPosition, 190, yPosition)
      yPosition += 10

      // Add spiritual gifts section
      pdf.setFontSize(14)
      pdf.text("Spiritual Gifts (Karunia Rohani)", 20, yPosition)
      yPosition += 10
      pdf.setFontSize(10)

      // Add top spiritual gifts
      spiritualGifts.slice(0, 3).forEach((gift, index) => {
        pdf.text(`${index + 1}. ${gift.category} (${gift.score}/5)`, 25, yPosition)
        yPosition += 5
      })

      yPosition += 5

      // Add heart desire section
      pdf.setFontSize(14)
      pdf.text("Heart Desire (Keinginan Hati)", 20, yPosition)
      yPosition += 10
      pdf.setFontSize(10)

      // Add top heart desires
      heartDesire.slice(0, 3).forEach((heart, index) => {
        pdf.text(`${index + 1}. ${heart.category} (${heart.score}/5)`, 25, yPosition)
        yPosition += 5
      })

      yPosition += 5

      // Add personality section
      pdf.setFontSize(14)
      pdf.text("Personality & Abilities (Kepribadian & Kemampuan)", 20, yPosition)
      yPosition += 10
      pdf.setFontSize(10)

      // Add personality type
      const personalityType = personalityTypes.find(p => p.category.includes("Tipe Kepribadian"))
      if (personalityType) {
        pdf.text(`Tipe Kepribadian: ${personalityType.category.split(": ")[1]}`, 25, yPosition)
        yPosition += 5
      }

      // Add top abilities
      pdf.text("Kemampuan Utama:", 25, yPosition)
      yPosition += 5

      abilities.slice(0, 3).forEach((ability, index) => {
        pdf.text(`${index + 1}. ${ability.category.replace("Kemampuan: ", "")} (${ability.score}/5)`, 30, yPosition)
        yPosition += 5
      })

      yPosition += 5

      // Add experiences section
      pdf.setFontSize(14)
      pdf.text("Experiences (Pengalaman Hidup)", 20, yPosition)
      yPosition += 10
      pdf.setFontSize(10)

      // Add top experiences
      experiences.slice(0, 3).forEach((exp, index) => {
        pdf.text(`${index + 1}. ${exp.category} (${exp.score}/5)`, 25, yPosition)
        yPosition += 5
      })

      yPosition += 10

      // Check if we need to add a new page for recommendations
      if (yPosition > 250) {
        pdf.addPage()
        yPosition = 20
      }

      // Add recommendations if option is selected
      if (pdfOptions.includeRecommendations) {
        // Add section divider
        pdf.setDrawColor(200, 200, 200)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 10

        pdf.setFontSize(14)
        pdf.text("Rekomendasi", 20, yPosition)
        yPosition += 10

        // Add ministry recommendations
        pdf.setFontSize(12)
        pdf.text("Pelayanan:", 25, yPosition)
        yPosition += 8
        pdf.setFontSize(10)

        recommendations.ministryRecommendations.forEach((rec: string, index: number) => {
          const recLines = pdf.splitTextToSize(`• ${rec}`, 160)
          pdf.text(recLines, 30, yPosition)
          yPosition += recLines.length * 5 + 2
        })

        yPosition += 5

        // Add career recommendations
        pdf.setFontSize(12)
        pdf.text("Karir:", 25, yPosition)
        yPosition += 8
        pdf.setFontSize(10)

        recommendations.careerRecommendations.forEach((rec: string, index: number) => {
          const recLines = pdf.splitTextToSize(`• ${rec}`, 160)
          pdf.text(recLines, 30, yPosition)
          yPosition += recLines.length * 5 + 2
        })

        yPosition += 5

        // Add development recommendations
        pdf.setFontSize(12)
        pdf.text("Pengembangan Diri:", 25, yPosition)
        yPosition += 8
        pdf.setFontSize(10)

        recommendations.developmentRecommendations.forEach((rec: string, index: number) => {
          const recLines = pdf.splitTextToSize(`• ${rec}`, 160)
          pdf.text(recLines, 30, yPosition)
          yPosition += recLines.length * 5 + 2
        })

        yPosition += 5
      }

      // Add Bible verse if option is selected
      if (pdfOptions.includeBibleVerse && recommendations.bibleVerse) {
        // Check if we need to add a new page
        if (yPosition > 250) {
          pdf.addPage()
          yPosition = 20
        }

        // Add section divider
        pdf.setDrawColor(200, 200, 200)
        pdf.line(20, yPosition, 190, yPosition)
        yPosition += 10

        pdf.setFontSize(12)
        pdf.text("Ayat Alkitab yang Relevan:", 20, yPosition)
        yPosition += 8

        pdf.setFontSize(10)
        pdf.setFont("helvetica", "italic")
        const verseLines = pdf.splitTextToSize(recommendations.bibleVerse, 170)
        pdf.text(verseLines, 20, yPosition)
        pdf.setFont("helvetica", "normal")
      }

      // Add footer
      const pageCount = pdf.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text(
          `SHAPE Discovery Results - Page ${i} of ${pageCount}`,
          pdf.internal.pageSize.getWidth() / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "center" }
        )
      }

      // Save the PDF
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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includeCharts}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includeCharts: !!checked }))
            }
          >
            Include Charts
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includeRecommendations}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includeRecommendations: !!checked }))
            }
          >
            Include Recommendations
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includeBibleVerse}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includeBibleVerse: !!checked }))
            }
          >
            Include Bible Verse
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includeExplanations}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includeExplanations: !!checked }))
            }
          >
            Include Explanations
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includePersonalizedAdvice}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includePersonalizedAdvice: !!checked }))
            }
          >
            Include Personalized Advice
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includeStrengthsWeaknesses}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includeStrengthsWeaknesses: !!checked }))
            }
          >
            Include Strengths & Weaknesses
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={pdfOptions.includeLearningPathways}
            onCheckedChange={(checked) =>
              setPdfOptions(prev => ({ ...prev, includeLearningPathways: !!checked }))
            }
          >
            Include Learning Pathways
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={exportToPDF} disabled={generating}>
            {generating ? "Generating..." : "Export to PDF"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
