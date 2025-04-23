"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function ResultsButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleViewResults = () => {
    setLoading(true)
    router.push("/results")
  }

  return (
    <Button onClick={handleViewResults} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading Results...
        </>
      ) : (
        "View Your Results"
      )}
    </Button>
  )
}
