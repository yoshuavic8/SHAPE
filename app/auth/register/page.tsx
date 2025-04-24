"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/hooks/use-auth"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{email?: string; password?: string; fullName?: string}>({})
  const { toast } = useToast()
  const { signUp } = useAuth()

  const validateForm = () => {
    const newErrors: {email?: string; password?: string; fullName?: string} = {}
    let isValid = true

    // Reset errors
    setErrors({})

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    }

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Hanya gunakan satu toast untuk loading
    toast({
      title: "Creating account...",
      description: "Please wait while we set up your account.",
      duration: 10000,
    })

    try {
      console.log("Attempting to sign up with:", { email, fullName })
      const signUpResult = await signUp(email, password, fullName)
      console.log("Sign up result:", signUpResult)

      if (signUpResult.error) {
        const error = signUpResult.error
        console.error("Sign up error:", error)

        // Handle error messages
        if (error.includes("already registered")) {
          setErrors({
            email: "This email is already registered. Please use a different email or try to login."
          })
          throw new Error("This email is already registered")
        } else if (error.includes("password")) {
          setErrors({
            password: error
          })
          throw new Error(error)
        } else {
          setErrors({
            email: error,
            password: error
          })
          throw new Error(error)
        }
      }

      // Jika berhasil, tampilkan toast sukses
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. You will be redirected to the login page.",
        variant: "default",
        duration: 5000,
      })

      // Set loading to false
      setLoading(false)
    } catch (error: any) {
      // Show error message
      toast({
        title: "Registration Failed",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
        duration: 5000,
      })

      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Sign up to take the SHAPE questionnaire</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                  // Clear error when user types
                  if (errors.fullName) {
                    setErrors({...errors, fullName: undefined})
                  }
                }}
                className={errors.fullName ? "border-red-500" : ""}
                required
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>
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
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
