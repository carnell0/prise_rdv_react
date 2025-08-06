import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  sexe: string
  adresse: string
  role: 'patient' | 'doctor' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

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

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté au chargement
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Utilisateur de test
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstname: 'John',
        lastname: 'Doe',
        email,
        phone: '06 12 34 56 78',
        sexe: 'homme',
        adresse: '123 Rue de la Santé, Paris',
        role: email.includes('doctor') ? 'doctor' : email.includes('admin') ? 'admin' : 'patient'
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      throw new Error('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    setLoading(true)
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        phone: userData.phone,
        sexe: userData.sexe,
        adresse: userData.adresse,
        role: 'patient' // Par défaut
      }
      
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    } catch (error) {
      throw new Error('Erreur d\'inscription')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
