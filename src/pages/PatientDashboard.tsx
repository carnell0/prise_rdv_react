import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Calendar, Clock, User, FileText, Plus, Phone } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function PatientDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
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
    },
    {
      id: 2,
      doctor: 'Dr. Marie Durand',
      date: '2023-11-15',
      motif: 'Vaccination grippe',
      prescription: 'Vaccin antigrippal'
    }
  ])

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

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bonjour {user?.firstname} {user?.lastname}
            </h1>
            <p className="text-muted-foreground">Gérez vos rendez-vous et consultez votre historique</p>
          </div>
          <div className="flex space-x-4">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Nouveau rendez-vous
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rendez-vous à venir</p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consultations passées</p>
                  <p className="text-2xl font-bold">{history.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Médecins consultés</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Rendez-vous à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <p className="text-sm text-muted-foreground">{appointment.motif}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{consultation.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.motif}</p>
                      <p className="text-sm text-muted-foreground">Prescription: {consultation.prescription}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{consultation.date}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Voir détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
