import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Calendar, Clock, User, FileText, Plus, Phone, Search, Star, MapPin, Filter, Heart, Brain, Eye, Stethoscope, Settings, Bell, Home } from 'lucide-react'
import DoctorModal from '../components/DoctorModal'
import AppointmentModal from '../components/AppointmentModal'

const specialtyIcons = {
  'Médecin généraliste': Stethoscope,
  'Cardiologue': Heart,
  'Neurologue': Brain,
  'Ophtalmologue': Eye,
  'Dermatologue': User,
  'Pédiatre': User
}

export default function PatientDashboard() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [appointmentModal, setAppointmentModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('all')

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Marie Dubois',
      specialty: 'Cardiologue',
      rating: 4.9,
      reviews: 127,
      experience: '15 ans',
      location: 'Paris 8ème',
      price: 80,
      avatar: '/placeholder.svg?height=100&width=100&text=MD',
      description: 'Spécialiste en cardiologie interventionnelle avec une expertise reconnue dans le traitement des maladies cardiovasculaires.',
      education: 'Université Paris Descartes, Harvard Medical School',
      languages: ['Français', 'Anglais', 'Espagnol'],
      availableSlots: ['09:00', '10:30', '14:00', '15:30'],
      nextAvailable: '2024-01-16'
    },
    {
      id: 2,
      name: 'Dr. Jean Martin',
      specialty: 'Médecin généraliste',
      rating: 4.8,
      reviews: 89,
      experience: '12 ans',
      location: 'Paris 15ème',
      price: 25,
      avatar: '/placeholder.svg?height=100&width=100&text=JM',
      description: 'Médecin généraliste expérimenté, spécialisé dans le suivi médical global et la médecine préventive.',
      education: 'Université Pierre et Marie Curie',
      languages: ['Français', 'Anglais'],
      availableSlots: ['08:30', '09:00', '11:00', '16:00'],
      nextAvailable: '2024-01-15'
    }
  ])

  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Martin Dubois',
      specialty: 'Médecin généraliste',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmed',
      motif: 'Consultation de routine'
    },
    {
      id: 2,
      doctor: 'Dr. Sophie Laurent',
      specialty: 'Cardiologue',
      date: '2024-01-20',
      time: '10:00',
      status: 'pending',
      motif: 'Contrôle cardiaque'
    }
  ])

  const [history] = useState([
    {
      id: 1,
      doctor: 'Dr. Jean Martin',
      date: '2023-12-10',
      motif: 'Consultation générale',
      prescription: 'Paracétamol 1g x3/jour'
    }
  ])

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialtyFilter === 'all' || doctor.specialty === specialtyFilter
    return matchesSearch && matchesSpecialty
  })

  const specialties = [...new Set(doctors.map(d => d.specialty))]

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor)
  }

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor)
    setAppointmentModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé'
      case 'pending': return 'En attente'
      case 'cancelled': return 'Annulé'
      default: return status
    }
  }

  const renderHomePage = () => (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Bienvenue sur MediCare ! 👋</h1>
        <p className="text-blue-100 mb-6">Gérez facilement vos rendez-vous médicaux</p>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => setCurrentPage('doctors')}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Prendre un RDV
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage('appointments')}
            className="border-white text-white hover:bg-white/10"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Mes rendez-vous
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">RDV à venir</p>
                  <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
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
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Consultations</p>
                  <p className="text-2xl font-bold text-green-600">{history.length}</p>
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
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Médecins consultés</p>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Prochains rendez-vous
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage('appointments')}
              >
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.slice(0, 2).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun rendez-vous programmé</p>
                <Button 
                  onClick={() => setCurrentPage('doctors')}
                  className="mt-4"
                >
                  Prendre un rendez-vous
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderDoctorsPage = () => (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher un médecin ou une spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full border-0 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-full sm:w-[200px] rounded-full border-0 bg-gray-100 dark:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Spécialité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les spécialités</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => {
          const SpecialtyIcon = specialtyIcons[doctor.specialty as keyof typeof specialtyIcons] || Stethoscope
          return (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={doctor.avatar || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                        <SpecialtyIcon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.reviews} avis</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Disponible le {doctor.nextAvailable}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">{doctor.price}€</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {doctor.experience} d'expérience
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDoctorSelect(doctor)}
                      className="flex-1 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Voir profil
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBookAppointment(doctor)}
                      className="flex-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      Prendre RDV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  const renderAppointmentsPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-blue-600" />
            Mes rendez-vous à venir
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.specialty}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.motif}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun rendez-vous pour l'instant</h3>
              <p className="text-gray-500 mb-6">Vous n'avez pas encore de rendez-vous programmé</p>
              <Button 
                onClick={() => setCurrentPage('doctors')}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Prendre un rendez-vous
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderHistoryPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-6 w-6 text-green-600" />
            Historique des consultations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((consultation) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{consultation.doctor}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{consultation.motif}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Prescription: {consultation.prescription}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{consultation.date}</p>
                    <Button variant="outline" size="sm" className="mt-2 rounded-full">
                      Voir détails
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun historique pour l'instant</h3>
              <p className="text-gray-500">Vos consultations passées apparaîtront ici</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderProfilePage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-6 w-6 text-purple-600" />
            Mon Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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
      case 'doctors':
        return renderDoctorsPage()
      case 'appointments':
        return renderAppointmentsPage()
      case 'history':
        return renderHistoryPage()
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

      {/* Modals */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookAppointment={() => {
          setAppointmentModal(true)
        }}
      />

      <AppointmentModal
        isOpen={appointmentModal}
        onClose={() => setAppointmentModal(false)}
      />
    </DashboardLayout>
  )
}
