import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { Users, UserCheck, Calendar, TrendingUp, Search, MoreHorizontal, UserPlus, Stethoscope, Settings, FileText, Home, Plus, Save } from 'lucide-react'
import CreateDoctorModal from '../components/CreateDoctorModal'

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [createDoctorModal, setCreateDoctorModal] = useState(false)

  const [users] = useState([
    {
      id: 1,
      name: 'Dr. Martin Dubois',
      email: 'martin.dubois@email.com',
      role: 'doctor',
      status: 'active',
      joinDate: '2023-01-15',
      appointments: 156
    },
    {
      id: 2,
      name: 'Marie Laurent',
      email: 'marie.laurent@email.com',
      role: 'patient',
      status: 'active',
      joinDate: '2023-03-22',
      appointments: 8
    },
    {
      id: 3,
      name: 'Dr. Sophie Martin',
      email: 'sophie.martin@email.com',
      role: 'doctor',
      status: 'inactive',
      joinDate: '2023-02-10',
      appointments: 89
    },
    {
      id: 4,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      role: 'patient',
      status: 'active',
      joinDate: '2023-04-05',
      appointments: 12
    }
  ])

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Martin Dubois',
      specialty: 'Cardiologue',
      email: 'martin.dubois@email.com',
      phone: '01 23 45 67 89',
      status: 'active',
      patients: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Dr. Sophie Martin',
      specialty: 'Neurologue',
      email: 'sophie.martin@email.com',
      phone: '01 98 76 54 32',
      status: 'active',
      patients: 38,
      rating: 4.9
    }
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const totalDoctors = users.filter(u => u.role === 'doctor').length
  const totalPatients = users.filter(u => u.role === 'patient').length
  const totalAppointments = users.reduce((sum, user) => sum + user.appointments, 0)

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'bg-blue-100 text-blue-800'
      case 'patient': return 'bg-green-100 text-green-800'
      case 'admin': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'doctor': return 'Médecin'
      case 'patient': return 'Patient'
      case 'admin': return 'Administrateur'
      default: return role
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif'
      case 'inactive': return 'Inactif'
      case 'pending': return 'En attente'
      default: return status
    }
  }

  const renderHomePage = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Administration MediCare 🛡️</h1>
        <p className="text-purple-100 mb-6">Gérez les utilisateurs et supervisez la plateforme</p>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => setCurrentPage('users')}
            className="bg-white text-purple-600 hover:bg-purple-50"
          >
            <Users className="mr-2 h-4 w-4" />
            Gérer les utilisateurs
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCreateDoctorModal(true)}
            className="border-white text-white hover:bg-white/10"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Créer un médecin
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total utilisateurs</p>
                  <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                  <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total RDV</p>
                  <p className="text-2xl font-bold text-purple-600">{totalAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Croissance mensuelle</p>
                  <p className="text-2xl font-bold text-orange-600">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => setCurrentPage('users')}
                className="h-20 flex-col bg-gradient-to-r from-blue-500 to-cyan-500"
              >
                <Users className="h-6 w-6 mb-2" />
                Gérer les utilisateurs
              </Button>
              <Button 
                onClick={() => setCurrentPage('doctors')}
                className="h-20 flex-col bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Stethoscope className="h-6 w-6 mb-2" />
                Gérer les médecins
              </Button>
              <Button 
                onClick={() => setCreateDoctorModal(true)}
                className="h-20 flex-col bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <UserPlus className="h-6 w-6 mb-2" />
                Créer un médecin
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderUsersPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Gestion des utilisateurs</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="doctor">Médecins</SelectItem>
                <SelectItem value="patient">Patients</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="inactive">Inactifs</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">Inscrit le {user.joinDate}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{user.appointments} RDV</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleText(user.role)}
                  </Badge>
                  <Badge className={getStatusColor(user.status)}>
                    {getStatusText(user.status)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem>
                        {user.status === 'active' ? 'Désactiver' : 'Activer'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDoctorsPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Stethoscope className="mr-2 h-6 w-6 text-blue-600" />
              Gestion des médecins
            </span>
            <Button onClick={() => setCreateDoctorModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un médecin
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {doctors.length > 0 ? (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <p className="text-sm text-blue-600">{doctor.specialty}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">{doctor.email}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{doctor.patients} patients</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">⭐ {doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(doctor.status)}>
                      {getStatusText(doctor.status)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Voir les patients</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun médecin pour l'instant</h3>
              <p className="text-gray-500 mb-6">Commencez par créer le profil d'un médecin</p>
              <Button onClick={() => setCreateDoctorModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Créer un médecin
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderStatsPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-6 w-6 text-purple-600" />
            Statistiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Statistiques en construction</h3>
            <p className="text-gray-500">Les statistiques détaillées seront bientôt disponibles</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfilePage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6 text-purple-600" />
            Mon Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Profil en construction</h3>
            <p className="text-gray-500">Cette section sera bientôt disponible</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettingsPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-6 w-6 text-gray-600" />
            Paramètres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Paramètres en construction</h3>
            <p className="text-gray-500">Cette section sera bientôt disponible</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage()
      case 'users':
        return renderUsersPage()
      case 'doctors':
        return renderDoctorsPage()
      case 'create-doctor':
        setCreateDoctorModal(true)
        setCurrentPage('doctors')
        return renderDoctorsPage()
      case 'stats':
        return renderStatsPage()
      case 'profile':
        return renderProfilePage()
      case 'settings':
        return renderSettingsPage()
      default:
        return renderHomePage()
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>

      <CreateDoctorModal
        isOpen={createDoctorModal}
        onClose={() => setCreateDoctorModal(false)}
      />
    </DashboardLayout>
  )
}
