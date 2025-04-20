import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/hooks/use-auth"
import { BodyClassHandler } from "@/components/body-class-handler"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SHAPE-E Questionnaire",
  description: "Temukan Spiritual gifts, Heart desire, Abilities, Personality, dan Experiences Anda",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        <BodyClassHandler />
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="min-h-screen">{children}</div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
