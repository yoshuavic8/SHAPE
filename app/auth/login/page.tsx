"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/hooks/use-auth"

// Component to handle search params with Suspense
function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{email?: string; password?: string}>({})
  const { toast } = useToast()
  const { signIn } = useAuth()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectedFrom') || '/dashboard'
  const justRegistered = searchParams.get('registered') === 'true'

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {}
    let isValid = true

    // Reset errors
    setErrors({})

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    // Tambahkan toast loading untuk memberikan feedback visual
    const loadingToast = toast({
      title: "Signing in...",
      description: "Please wait while we verify your credentials",
      duration: 10000, // Durasi panjang, akan ditutup manual jika berhasil
    })

    try {
      const { error } = await signIn(email, password, redirectTo)

      if (error) {
        // Provide more user-friendly error messages
        if (error.includes("Invalid login credentials")) {
          setErrors({
            email: "Email or password is incorrect. Please try again.",
            password: "Email or password is incorrect. Please try again."
          })
          throw new Error("Email or password is incorrect. Please try again.")
        } else if (error.includes("Email not confirmed")) {
          throw new Error("Your email has not been verified. Please check your inbox.")
        } else {
          throw new Error(error)
        }
      }

      // Show success message - the redirect will be handled by signIn in useAuth
      toast({
        title: "Login successful",
        description: "You have been signed in. Redirecting...",
        duration: 3000,
      })
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to sign in. Please check your credentials.",
        variant: "destructive",
        duration: 5000, // Longer duration for error messages
      })
      // Highlight the form fields with errors
      if (error.message.includes("Email or password is incorrect")) {
        // Already set in the if block above
      } else {
        // For other errors, show a general form error
        setErrors({
          email: "There was a problem with your login. Please try again.",
          password: "There was a problem with your login. Please try again."
        })
      }
    } finally {
      setLoading(false)
    }
  }

  // Show toast notification if user just registered
  useEffect(() => {
    if (justRegistered) {
      // Tambahkan delay kecil untuk memastikan toast muncul setelah halaman sepenuhnya dimuat
      const timer = setTimeout(() => {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please sign in with your credentials.",
          duration: 8000, // Durasi lebih lama agar user punya waktu membaca
          variant: "default",
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [justRegistered, toast])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  // Clear error when user types
                  if (errors.email) {
                    setErrors({...errors, email: undefined})
                  }
                }}
                className={errors.email ? "border-red-500" : ""}
                required
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  tabIndex={loading ? -1 : 0}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  // Clear error when user types
                  if (errors.password) {
                    setErrors({...errors, password: undefined})
                  }
                }}
                className={errors.password ? "border-red-500" : ""}
                required
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : "Sign In"}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/auth/register" className="font-medium underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// Main component with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">Loading...</Button>
          </CardFooter>
        </Card>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
