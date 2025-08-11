import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '../services/api'
import { User, LoginRequest, RegisterRequest } from '../types/api'

interface AuthContextType {
  user: User | null
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Vérifier si un utilisateur est connecté au chargement
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          setLoading(true)
          const response = await apiService.getCurrentUser()
          if (response.success && response.data) {
            setUser(response.data)
          } else {
            // Token invalide ou expiré
            apiService.clearAuthToken()
          }
        } catch (error) {
          console.error('Token invalide lors de l\'initialisation:', error)
          apiService.clearAuthToken()
        } finally {
          setLoading(false)
        }
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true)
      setError(null)
      
      // La réponse de login ne contient que le token, pas l'utilisateur
      const loginResponse = await apiService.login(credentials)
      
      if (loginResponse.success && loginResponse.token) {
        // Après le login réussi, récupérer les infos utilisateur
        try {
          const userResponse = await apiService.getCurrentUser()
          if (userResponse.success && userResponse.data) {
            setUser(userResponse.data)
          } else {
            throw new Error('Impossible de récupérer les informations utilisateur')
          }
        } catch (userError) {
          // Si on ne peut pas récupérer l'utilisateur, on déconnecte
          apiService.clearAuthToken()
          throw new Error('Erreur lors de la récupération du profil utilisateur')
        }
      } else {
        throw new Error(loginResponse.message || 'Erreur de connexion inattendue')
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inattendue est survenue.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterRequest) => {
    try {
      setLoading(true)
      setError(null)
      
      // La réponse de register contient directement l'utilisateur
      const registerResponse = await apiService.register(userData)
      
      if (registerResponse.success && registerResponse.user) {
        setUser(registerResponse.user)
        // Pas de token dans la réponse register, il faut se connecter après
        // Ou alors faire un login automatique
        try {
          const loginResponse = await apiService.login({
            email: userData.email,
            password: userData.password
          })
          if (loginResponse.success && loginResponse.token) {
            // Token déjà sauvé par apiService.login
          }
        } catch (loginError) {
          console.warn('Inscription réussie mais connexion automatique échouée:', loginError)
          // L'utilisateur devra se connecter manuellement
        }
      } else {
        throw new Error(registerResponse.message || 'Erreur lors de l\'inscription')
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inattendue est survenue lors de l\'inscription.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await apiService.logout()
    } catch (error) {
      // On log l'erreur mais on ne bloque pas la déconnexion côté client
      console.error('Erreur lors de la déconnexion côté serveur:', error)
    } finally {
      setUser(null)
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading, 
      error,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  )
}