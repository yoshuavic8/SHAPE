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
import type { CategoryScore, ShapeRecommendations } from "@/lib/shape-analyzer-adapter"
import jsPDF from "jspdf"
import { useToast } from "@/components/ui/use-toast"
import { Download, Mail, Share } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ResultsPDFSinglePageProps {
  userName: string
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  shapeCode: string
  recommendations: ShapeRecommendations
  completedDate: string
}

export function ResultsPDFSinglePage({
  userName,
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  shapeCode,
  recommendations,
  completedDate,
}: ResultsPDFSinglePageProps) {
  const [generating, setGenerating] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const { toast } = useToast()

  const exportToPDF = async (forEmail = false) => {
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

      // Create PDF document - use landscape for more width
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      // Page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 10
      const contentWidth = pageWidth - (margin * 2)

      // Add header with title
      pdf.setFillColor(41, 98, 255)
      pdf.rect(0, 0, pageWidth, 20, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(16)
      pdf.text("SHAPE Discovery Results", margin, 13)

      // Add user info
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.text(`Nama: ${userName}`, margin, 25)
      pdf.text(`SHAPE Code: ${shapeCode}`, margin, 30)
      pdf.text(`Tanggal: ${completedDate}`, margin, 35)

      // Create a 2-column layout
      const colWidth = (contentWidth - 5) / 2 // 5mm gap between columns
      const leftColX = margin
      const rightColX = margin + colWidth + 5

      // Left column - Purpose and Profile
      let leftY = 45

      // Purpose Statement
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text("Tujuan Hidup:", leftColX, leftY)
      leftY += 5
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      const purposeLines = pdf.splitTextToSize(recommendations.purposeStatement || "", colWidth)
      pdf.text(purposeLines, leftColX, leftY)
      leftY += purposeLines.length * 4 + 5

      // SHAPE Profile
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text("SHAPE Profile:", leftColX, leftY)
      leftY += 5
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)

      // Spiritual Gifts
      pdf.setFont("helvetica", "bold")
      pdf.text("Spiritual Gifts:", leftColX, leftY)
      pdf.setFont("helvetica", "normal")
      leftY += 4
      spiritualGifts.slice(0, 3).forEach((gift, index) => {
        pdf.text(`• ${gift.category} (${gift.score}/5)`, leftColX + 3, leftY)
        leftY += 4
      })
      leftY += 2

      // Heart Desire
      pdf.setFont("helvetica", "bold")
      pdf.text("Heart Desire:", leftColX, leftY)
      pdf.setFont("helvetica", "normal")
      leftY += 4
      heartDesire.slice(0, 3).forEach((heart, index) => {
        pdf.text(`• ${heart.category} (${heart.score}/5)`, leftColX + 3, leftY)
        leftY += 4
      })
      leftY += 2

      // Personality
      pdf.setFont("helvetica", "bold")
      pdf.text("Personality:", leftColX, leftY)
      pdf.setFont("helvetica", "normal")
      leftY += 4
      const personalityType = personalityTypes.find(p => p.category.includes("Tipe Kepribadian"))
      if (personalityType) {
        pdf.text(`• ${personalityType.category.split(": ")[1]}`, leftColX + 3, leftY)
        leftY += 4
      }
      leftY += 2

      // Abilities
      pdf.setFont("helvetica", "bold")
      pdf.text("Abilities:", leftColX, leftY)
      pdf.setFont("helvetica", "normal")
      leftY += 4
      abilities.slice(0, 3).forEach((ability, index) => {
        pdf.text(`• ${ability.category.replace("Kemampuan: ", "")} (${ability.score}/5)`, leftColX + 3, leftY)
        leftY += 4
      })
      leftY += 2

      // Experiences
      pdf.setFont("helvetica", "bold")
      pdf.text("Experiences:", leftColX, leftY)
      pdf.setFont("helvetica", "normal")
      leftY += 4
      experiences.slice(0, 3).forEach((exp, index) => {
        pdf.text(`• ${exp.category} (${exp.score}/5)`, leftColX + 3, leftY)
        leftY += 4
      })

      // Right column - Recommendations and Synergies
      let rightY = 45

      // SHAPE Synergy
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text("SHAPE Synergy:", rightColX, rightY)
      rightY += 5
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)

      if (recommendations.shapeSynergy && recommendations.shapeSynergy.length > 0) {
        recommendations.shapeSynergy.slice(0, 3).forEach((synergy, index) => {
          const synergyLines = pdf.splitTextToSize(`• ${synergy}`, colWidth)
          pdf.text(synergyLines, rightColX, rightY)
          rightY += synergyLines.length * 4 + 2
        })
      }
      rightY += 3

      // Recommendations
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text("Rekomendasi:", rightColX, rightY)
      rightY += 5
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)

      // Ministry Recommendations
      pdf.setFont("helvetica", "bold")
      pdf.text("Pelayanan:", rightColX, rightY)
      pdf.setFont("helvetica", "normal")
      rightY += 4
      recommendations.ministryRecommendations.slice(0, 3).forEach((rec, index) => {
        const recLines = pdf.splitTextToSize(`• ${rec}`, colWidth)
        pdf.text(recLines, rightColX + 3, rightY)
        rightY += recLines.length * 4 + 1
      })
      rightY += 2

      // Career Recommendations
      pdf.setFont("helvetica", "bold")
      pdf.text("Karir:", rightColX, rightY)
      pdf.setFont("helvetica", "normal")
      rightY += 4
      recommendations.careerRecommendations.slice(0, 3).forEach((rec, index) => {
        const recLines = pdf.splitTextToSize(`• ${rec}`, colWidth)
        pdf.text(recLines, rightColX + 3, rightY)
        rightY += recLines.length * 4 + 1
      })
      rightY += 2

      // Strengths & Weaknesses
      pdf.setFont("helvetica", "bold")
      pdf.text("Kekuatan & Area Pengembangan:", rightColX, rightY)
      pdf.setFont("helvetica", "normal")
      rightY += 4

      // Strengths
      if (recommendations.strengthsWeaknesses.strengths.length > 0) {
        pdf.text("Kekuatan:", rightColX + 3, rightY)
        rightY += 4
        recommendations.strengthsWeaknesses.strengths.slice(0, 2).forEach((strength, index) => {
          const strengthLines = pdf.splitTextToSize(`• ${strength}`, colWidth - 3)
          pdf.text(strengthLines, rightColX + 6, rightY)
          rightY += strengthLines.length * 4 + 1
        })
      }
      rightY += 1

      // Weaknesses
      if (recommendations.strengthsWeaknesses.weaknesses.length > 0) {
        pdf.text("Area Pengembangan:", rightColX + 3, rightY)
        rightY += 4
        recommendations.strengthsWeaknesses.weaknesses.slice(0, 2).forEach((weakness, index) => {
          const weaknessLines = pdf.splitTextToSize(`• ${weakness}`, colWidth - 3)
          pdf.text(weaknessLines, rightColX + 6, rightY)
          rightY += weaknessLines.length * 4 + 1
        })
      }

      // Add Bible verse at the bottom
      if (recommendations.bibleVerse) {
        const verseY = pageHeight - 20
        pdf.setDrawColor(200, 200, 200)
        pdf.line(margin, verseY - 5, pageWidth - margin, verseY - 5)
        pdf.setFontSize(9)
        pdf.setFont("helvetica", "italic")
        const verseLines = pdf.splitTextToSize(recommendations.bibleVerse, pageWidth - (margin * 2))
        pdf.text(verseLines, margin, verseY)
      }

      // Add footer
      pdf.setFontSize(8)
      pdf.setTextColor(150, 150, 150)
      pdf.text(
        `SHAPE Discovery Results - ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      )

      // Save or return the PDF
      if (forEmail) {
        return pdf;
      } else {
        pdf.save(`SHAPE_Results_${userName.replace(/\s+/g, "_")}.pdf`)

        toast({
          title: "PDF Dibuat",
          description: "Hasil Anda telah diekspor sebagai file PDF satu halaman.",
        })
      }
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Error",
        description: "Gagal membuat PDF. Silakan coba lagi.",
        variant: "destructive",
      })
      return null;
    } finally {
      if (!forEmail) {
        setGenerating(false)
      }
    }
  }

  const sendEmailWithPDF = async () => {
    try {
      // Generate PDF
      const pdf = await exportToPDF(true);
      if (!pdf) return;

      // Convert PDF to base64
      const pdfData = pdf.output('datauristring');

      // Send PDF data to backend API
      const response = await fetch('/api/send-pdf-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          pdfData: pdfData,
          userName: userName,
        }),
      });

      if (response.ok) {
        toast({
          title: "Email Sent",
          description: `PDF results have been sent to ${emailAddress}`,
        })
        setEmailDialogOpen(false)
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
    } catch (error) {
      console.error("Email sending error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="flex space-x-2">
      <Button onClick={() => exportToPDF(false)} disabled={generating}>
        <Download className="mr-2 h-4 w-4" />
        {generating ? "Generating..." : "Single Page PDF"}
      </Button>

      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Results
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Results via Email</DialogTitle>
            <DialogDescription>
              Enter an email address to send your SHAPE results as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="example@email.com"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={sendEmailWithPDF} disabled={generating || !emailAddress}>
              {generating ? "Sending..." : "Send Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
