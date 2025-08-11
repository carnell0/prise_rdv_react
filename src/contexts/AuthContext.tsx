import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode' // Importer jwt-decode
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

// Interface pour le contenu du token décodé
interface DecodedToken {
  userId: number;
  role: 'patient' | 'doctor' | 'admin'; // Utiliser le même type que User.role
  email: string; // Assurez-vous que l'email est dans le token
  // Ajoutez d'autres champs si nécessaire (iat, exp, etc.)
  iat: number;
  exp: number;
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

  // Fonction pour mettre à jour l'utilisateur à partir du token
  const setUserFromToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token)
      // Vérifier si le token est expiré
      if (decodedToken.exp * 1000 < Date.now()) {
        apiService.clearAuthToken()
        setUser(null)
        return
      }
      // Créer un objet User partiel à partir du token
      const userFromToken: User = {
        id: decodedToken.userId,
        role: decodedToken.role,
        email: decodedToken.email,
        // Les autres champs ne sont pas dans le token, initialisez-les au besoin
        lastname: '', // ou une valeur par défaut
        firstname: '',
        username: '', // Ajout de username
        phone: '',
        adresse: '',
        sexe: 'Masculin', // Mettre une valeur par défaut valide
        created_at: new Date(decodedToken.iat * 1000).toISOString(),
      }
      setUser(userFromToken)
      apiService.setAuthToken(token) // Assurez-vous que le token est bien stocké
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error)
      apiService.clearAuthToken()
      setUser(null)
    }
  }

  // Vérifier si un utilisateur est connecté au chargement
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('auth_token');
    if (token) {
      setUserFromToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true)
      setError(null)
      
      const loginResponse = await apiService.login(credentials)
      
      if (loginResponse.success && loginResponse.token) {
        setUserFromToken(loginResponse.token)
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