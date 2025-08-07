import { Button } from './ui/button'
import { Moon, Sun, Stethoscope } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  onLogin: () => void
  onRegister: () => void
}

export default function Navbar({ onLogin, onRegister }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleDashboard = () => {
    if (user?.role === 'patient') {
      navigate('/dashboard/patient')
    } else if (user?.role === 'doctor') {
      navigate('/dashboard/doctor')
    } else if (user?.role === 'admin') {
      navigate('/dashboard/admin')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Stethoscope className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">MediCare</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          {!user ? (
            <>
              <Button variant="ghost" onClick={onLogin}>
                Se connecter
              </Button>
              <Button onClick={onRegister}>
                S'inscrire
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Bonjour, {user.firstname}
              </span>
              <Button variant="outline" size="sm" onClick={handleDashboard}>
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
