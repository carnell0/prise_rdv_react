import { useState } from 'react'
import { Navbar } from '../components/Navbar';
import { LandingSection } from '../components/LandingSection';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import AppointmentModal from '../components/AppointmentModal';

export default function HomePage() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [isAppointmentModalOpen, setAppointmentModalOpen] = useState(false)

  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        onLogin={() => handleOpenAuthModal('login')}
        onRegister={() => handleOpenAuthModal('register')}
      />
      <main className="flex-grow">
        <LandingSection 
          onBookAppointment={() => setAppointmentModalOpen(true)} 
        />
      </main>
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        selectedDoctor={{ 
          name: 'Dr. Alan Turing', 
          specialty: 'Cardiologue',
          price: 75,
          avatar: '/avatars/doctor1.png'
        }}
      />
    </div>
  )
}