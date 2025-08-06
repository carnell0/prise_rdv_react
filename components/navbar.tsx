'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun, Stethoscope } from 'lucide-react'
import { useTheme } from './theme-provider'

interface NavbarProps {
  onLogin: () => void
  onRegister: () => void
  user?: any
}

export function Navbar({ onLogin, onRegister, user }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
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
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
