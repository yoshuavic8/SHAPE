"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/auth/login")
          return
        }

        setEmail(session.user.email || "")
        setUserId(session.user.id)

        // Load user profile data
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single()

        if (profile) {
          setFullName(profile.full_name || "")
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }

    loadUserProfile()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    try {
      setLoading(true)

      // Update profile
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
        })
        .eq("id", userId)

      if (error) throw error

      // Also update the user metadata
      await supabase.auth.updateUser({
        data: { full_name: fullName },
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetQuestionnaire = async () => {
    if (!userId) return

    try {
      setLoading(true)

      const { error } = await supabase
        .from("questionnaire_results")
        .update({
          spiritual_gifts: {},
          heart_desire: {},
          abilities: {},
          personality: {},
          is_completed: false,
          completed_at: null,
        })
        .eq("user_id", userId)

      if (error) throw error

      toast({
        title: "Questionnaire reset",
        description: "Your questionnaire answers have been reset",
      })

      router.push("/questionnaire")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset questionnaire",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 py-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleResetQuestionnaire} disabled={loading}>
              Reset Questionnaire
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
