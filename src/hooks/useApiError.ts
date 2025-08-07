import { useState, useCallback } from 'react'

export interface ApiError {
  message: string
  status?: number
  endpoint?: string
  timestamp: Date
}

export function useApiError() {
  const [error, setError] = useState<ApiError | null>(null)

  const setApiError = useCallback((message: string, status?: number, endpoint?: string) => {
    setError({
      message,
      status,
      endpoint,
      timestamp: new Date()
    })
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const isNetworkError = error?.message.includes('connexion') || error?.message.includes('network')
  const isServerError = error?.status && error.status >= 500
  const isClientError = error?.status && error.status >= 400 && error.status < 500

  return {
    error,
    setApiError,
    clearError,
    isNetworkError,
    isServerError,
    isClientError
  }
}
