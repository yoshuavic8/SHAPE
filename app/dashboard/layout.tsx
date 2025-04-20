"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/lib/hooks/use-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth()
  const [userName, setUserName] = useState("User")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/auth/login")
    }

    if (user) {
      setUserName(user.user_metadata?.full_name || "User")
      setUserEmail(user.email || "")
    }
  }, [user, isLoading])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">SHAPE Questionnaire</h1>
          <UserNav userName={userName} userEmail={userEmail} />
        </div>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pl-8 pr-6 lg:py-8">
            <DashboardNav />
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
