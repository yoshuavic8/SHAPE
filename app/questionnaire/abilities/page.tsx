"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AbilitiesPage() {
  const router = useRouter()

  // Redirect to personality page since abilities are now integrated with personality