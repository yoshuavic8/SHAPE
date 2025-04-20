"use client"

import { useState, useEffect, useCallback } from "react"

export function useAutoSave<T>(
  data: T,
  saveFunction: (data: T) => Promise<void>,
  interval = 30000 // 30 seconds
) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  
  const save = useCallback(async () => {
    if (isSaving) return
    
    try {
      setIsSaving(true)
      await saveFunction(data)
      setLastSaved(new Date())
      setError(null)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsSaving(false)
    }
  }, [data, saveFunction, isSaving])
  
  // Auto-save on interval
  useEffect(() => {
    const timer = setInterval(save, interval)
    return () => clearInterval(timer)
  }, [save, interval])
  
  // Save on unmount
  useEffect(() => {
    return () => {
      save()
    }
  }, [save])
  
  return { lastSaved, isSaving, error, save }
}
