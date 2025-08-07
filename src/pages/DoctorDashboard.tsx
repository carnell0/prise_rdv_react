import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Calendar, Clock, User, CheckCircle, XCircle, Phone, MessageSquare, Users, Bell, Settings, FileText, Home, TrendingUp } from 'lucide-react'

export default function DoctorDashboard() {
  const [currentPage, setCurrentPage] = useState('home')

  const [appointments] = useState([
    {
      id: 1,
      patient: 'Marie Dubois',
      date: '2024-01-15',
      time: '14:30',
      status: 'confirmed',
      motif: 'Consultation de routine',
      phone: '06 12 34 56 78'
    },
    {
      id: 2,
      patient: 'Jean Martin',
      date: '2024-01-15',
      time: '15:00',
      status: 'confirmed',
      motif: 'Contrôle tension',
      phone: '06 98 76 54 32'
    }
  ])

  const [requests] = useState([
    {
      id: 1,
      patient: 'Sophie Laurent',
      date: '2024-01-16',
      time: '10:00',
      status: 'pending',
      motif: 'Mal de dos persistant',
      phone: '06 11 22 33 44'
    },
    {
      id: 2,
      patient: 'Pierre Durand',
      date: '2024-01-17',
      time: '14:30',
      status: 'pending',
      motif: 'Consultation générale',
      phone: '06 55 44 33 22'
    },
    {
      id: 3,
      patient: 'Alice Martin',
      date: '2024-01-18',
      time: '09:00',
      status: 'pending',
      motif: 'Suivi médical',
      phone: '06 77 88 99 00'
    }
  ])

  const [patients] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      lastVisit: '2023-12-15',
      nextAppointment: '2024-01-15',
      condition: 'Hypertension'
    },
    {
      id: 2,
      name: 'Jean Martin',
      lastVisit: '2023-11-20',
      nextAppointment: '2024-01-15',
      condition: 'Diabète type 2'
    }
  ])

  const [history] = useState([
    {
      id: 1,
      patient: 'Marie Dubois',
      date: '2023-12-15',
      motif: 'Contrôle tension',
      prescription: 'Amlodipine 5mg'
    },
    {
      id: 2,
      patient: 'Jean Martin',
      date: '2023-11-20',
      motif: 'Suivi diabète',
      prescription: 'Metformine 850mg'
    }
  ])

  const handleAppointmentAction = (id: number, action: 'confirm' | 'cancel') => {
    console.log(`${action} appointment ${id}`)
    // Ici, vous feriez un appel API pour mettre à jour le statut
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
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Tableau de bord Médecin 👨‍⚕️</h1>
        <p className="text-green-100 mb-6">Gérez vos consultations et demandes de rendez-vous</p>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => setCurrentPage('requests')}
            className="bg-white text-green-600 hover:bg-green-50"
          >
            <Bell className="mr-2 h-4 w-4" />
            Demandes ({requests.length})
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage('schedule')}
            className="border-white text-white hover:bg-white/10"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Mon planning
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
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aujourd'hui</p>
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
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{requests.length}</p>
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
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Patients ce mois</p>
                  <p className="text-2xl font-bold text-green-600">47</p>
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
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-yellow-600" />
                Demandes récentes
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage('requests')}
              >
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.slice(0, 2).map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-yellow-500 rounded-lg">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{request.patient}</h3>
                        <p className="text-sm text-gray-600">{request.motif}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-1" />
                        Refuser
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accepter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune demande en attente</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )

  const renderRequestsPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-6 w-6 text-yellow-600" />
            Demandes de rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-500 rounded-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{request.patient}</h3>
                      <p className="text-sm text-gray-600">{request.motif}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{request.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{request.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{request.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAppointmentAction(request.id, 'cancel')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Refuser
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleAppointmentAction(request.id, 'confirm')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmer
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune demande pour l'instant</h3>
              <p className="text-gray-500">Les nouvelles demandes de rendez-vous apparaîtront ici</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderSchedulePage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-blue-600" />
            Mon planning
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
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-blue-50 to-purple-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.patient}</h3>
                      <p className="text-sm text-gray-600">{appointment.motif}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Appeler
                      </Button>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun rendez-vous pour l'instant</h3>
              <p className="text-gray-500">Votre planning est vide pour le moment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderPatientsPage = () => (
    <div className="p-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6 text-green-600" />
            Mes patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length > 0 ? (
            <div className="space-y-4">
              {patients.map((patient) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-green-50 to-blue-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.condition}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">Dernière visite: {patient.lastVisit}</span>
                        <span className="text-xs text-gray-500">Prochain RDV: {patient.nextAppointment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Dossier
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Contacter
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun patient pour l'instant</h3>
              <p className="text-gray-500">Vos patients apparaîtront ici après leurs consultations</p>
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
            <Clock className="mr-2 h-6 w-6 text-purple-600" />
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
                  className="flex items-center justify-between p-4 border rounded-xl bg-gradient-to-r from-purple-50 to-pink-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{consultation.patient}</h3>
                      <p className="text-sm text-gray-600">{consultation.motif}</p>
                      <p className="text-sm text-gray-600">Prescription: {consultation.prescription}</p>
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
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun historique pour l'instant</h3>
              <p className="text-gray-500">L'historique de vos consultations apparaîtra ici</p>
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
      case 'requests':
        return renderRequestsPage()
      case 'schedule':
        return renderSchedulePage()
      case 'patients':
        return renderPatientsPage()
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
    </DashboardLayout>
  )
}
