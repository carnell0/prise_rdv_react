'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { LandingSection } from '@/components/landing-section'
import { Footer } from '@/components/footer'
import { AuthModal } from '@/components/auth-modal'
import { AppointmentModal } from '@/components/appointment-modal'
import { ThemeProvider } from '@/components/theme-provider'

export default function HomePage() {
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null)
  const [appointmentModal, setAppointmentModal] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleAuthAction = (action: 'login' | 'register' | 'appointment') => {
    if (!user) {
      if (action === 'appointment') {
        setAuthModal('login')
      } else {
        setAuthModal(action)
      }
    } else {
      if (action === 'appointment') {
        setAppointmentModal(true)
      }
    }
  }

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    setAuthModal(null)
    // Redirection vers le dashboard selon le rôle
    if (userData.role === 'patient') {
      window.location.href = '/dashboard/patient'
    } else if (userData.role === 'doctor') {
      window.location.href = '/dashboard/doctor'
    } else if (userData.role === 'admin') {
      window.location.href = '/dashboard/admin'
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar 
          onLogin={() => handleAuthAction('login')}
          onRegister={() => handleAuthAction('register')}
          user={user}
        />
        <LandingSection 
          onBookAppointment={() => handleAuthAction('appointment')}
        />
        <Footer />
        
        <AuthModal
          isOpen={authModal !== null}
          mode={authModal || 'login'}
          onClose={() => setAuthModal(null)}
          onSuccess={handleAuthSuccess}
          onSwitchMode={(mode) => setAuthModal(mode)}
        />
        
        <AppointmentModal
          isOpen={appointmentModal}
          onClose={() => setAppointmentModal(false)}
        />
      </div>
    </ThemeProvider>
  )
}
