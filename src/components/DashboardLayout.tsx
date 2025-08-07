import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, User, Settings, LogOut, Calendar, Clock, Users, UserPlus, Stethoscope, Shield, Bell, FileText } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from './ui/sidebar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useAuth } from '../contexts/AuthContext'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

export default function DashboardLayout({ children, currentPage, onPageChange }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Accueil",
        icon: Home,
        id: "home",
        badge: null
      },
      {
        title: "Profil",
        icon: User,
        id: "profile",
        badge: null
      }
    ]

    const roleSpecificItems = {
      patient: [
        {
          title: "Médecins",
          icon: Stethoscope,
          id: "doctors",
          badge: null
        },
        {
          title: "Mes RDV",
          icon: Calendar,
          id: "appointments",
          badge: "2"
        },
        {
          title: "Historique",
          icon: Clock,
          id: "history",
          badge: null
        }
      ],
      doctor: [
        {
          title: "Mes Patients",
          icon: Users,
          id: "patients",
          badge: null
        },
        {
          title: "Demandes RDV",
          icon: Bell,
          id: "requests",
          badge: "3"
        },
        {
          title: "Planning",
          icon: Calendar,
          id: "schedule",
          badge: null
        },
        {
          title: "Historique",
          icon: Clock,
          id: "history",
          badge: null
        }
      ],
      admin: [
        {
          title: "Utilisateurs",
          icon: Users,
          id: "users",
          badge: null
        },
        {
          title: "Médecins",
          icon: Stethoscope,
          id: "doctors",
          badge: null
        },
        {
          title: "Créer Médecin",
          icon: UserPlus,
          id: "create-doctor",
          badge: null
        },
        {
          title: "Statistiques",
          icon: FileText,
          id: "stats",
          badge: null
        }
      ]
    }

    const settingsItems = [
      {
        title: "Paramètres",
        icon: Settings,
        id: "settings",
        badge: null
      }
    ]

    return [
      ...baseItems,
      ...roleSpecificItems[user?.role as keyof typeof roleSpecificItems] || [],
      ...settingsItems
    ]
  }

  const navigationItems = getNavigationItems()

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'patient': return 'from-blue-500 to-cyan-500'
      case 'doctor': return 'from-green-500 to-emerald-500'
      case 'admin': return 'from-purple-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'patient': return User
      case 'doctor': return Stethoscope
      case 'admin': return Shield
      default: return User
    }
  }

  const RoleIcon = getRoleIcon(user?.role || 'patient')

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Sidebar className="border-r-0 shadow-xl">
          <SidebarHeader className="border-b border-sidebar-border/50">
            <div className="flex items-center space-x-3 px-2 py-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getRoleColor(user?.role || 'patient')} shadow-lg`}>
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-sidebar-foreground">MediCare</h2>
                <p className="text-xs text-sidebar-foreground/70 capitalize">
                  {user?.role === 'admin' ? 'Administrateur' : 
                   user?.role === 'doctor' ? 'Médecin' : 'Patient'}
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onPageChange(item.id)}
                        isActive={currentPage === item.id}
                        className="group relative overflow-hidden rounded-lg transition-all duration-200 hover:shadow-md"
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {currentPage === item.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center space-x-3 px-2 py-3 rounded-lg bg-sidebar-accent/50">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getRoleColor(user?.role || 'patient')}`}>
                    <RoleIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user?.firstname} {user?.lastname}
                    </p>
                    <p className="text-xs text-sidebar-foreground/70 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground capitalize">
                {navigationItems.find(item => item.id === currentPage)?.title || 'Dashboard'}
              </h1>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
