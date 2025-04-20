"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  // Add this useEffect to handle dynamic class changes
  useEffect(() => {
    document.body.className = document.body.className.replace('gbx-installed', '')
  }, [])

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href ? "bg-accent text-accent-foreground font-medium" : "font-normal",
            )}
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
