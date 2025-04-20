"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

type SupabaseContextType = {
  session: Session | null
  isLoading: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  isLoading: true,
})

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ session, isLoading }}>
      {!isLoading && children}
    </SupabaseContext.Provider>
  )
}