"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Questionnaire",
    href: "/questionnaire",
  },
  {
    title: "Results",
    href: "/results",
  },
  {
    title: "Profile",
    href: "/profile",
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [loadingPath, setLoadingPath] = useState<string | null>(null)

  // Add this useEffect to handle dynamic class changes
  useEffect(() => {
    document.body.className = document.body.className.replace('gbx-installed', '')
  }, [])

  const handleNavigation = (href: string) => {
    // Only add loading state for results page
    if (href === '/results') {
      setLoadingPath(href)
    }
    router.push(href)
  }

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn(
            "w-full justify-start",
            pathname === item.href ? "bg-accent text-accent-foreground font-medium" : "font-normal",
          )}
          onClick={() => handleNavigation(item.href)}
          disabled={loadingPath === item.href}
        >
          {loadingPath === item.href ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            item.title
          )}
        </Button>
      ))}
    </nav>
  )
}
