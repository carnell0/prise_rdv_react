import { useState } from 'react'
import Navbar from '../components/Navbar'
import LandingSection from '../components/LandingSection'
import Footer from '../components/Footer'
import AuthModal from '../components/AuthModal'
import AppointmentModal from '../components/AppointmentModal'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null)
  const [appointmentModal, setAppointmentModal] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

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

  const handleAuthSuccess = () => {
    setAuthModal(null)
    // Redirection vers le dashboard selon le rôle
    if (user?.role === 'patient') {
      navigate('/dashboard/patient')
    } else if (user?.role === 'doctor') {
      navigate('/dashboard/doctor')
    } else if (user?.role === 'admin') {
      navigate('/dashboard/admin')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLogin={() => handleAuthAction('login')}
        onRegister={() => handleAuthAction('register')}
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
  )
}
