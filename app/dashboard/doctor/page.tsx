'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Badge } from '@/src/components/ui/badge'
import { Calendar, Clock, User, CheckCircle, XCircle, Phone, MessageSquare } from 'lucide-react'

export default function DoctorDashboard() {
  const [appointments] = useState([
    {
      id: 1,
      patient: 'Marie Dubois',
      date: '2024-01-15',
      time: '14:30',
      status: 'pending',
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
    },
    {
      id: 3,
      patient: 'Sophie Laurent',
      date: '2024-01-16',
      time: '10:00',
      status: 'pending',
      motif: 'Mal de dos persistant',
      phone: '06 11 22 33 44'
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

  const todayAppointments = appointments.filter(apt => apt.date === '2024-01-15')
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending')

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord Médecin</h1>
            <p className="text-muted-foreground">Gérez vos consultations et demandes de rendez-vous</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Planning
            </Button>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aujourd'hui</p>
                  <p className="text-2xl font-bold">{todayAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold">{pendingAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patients ce mois</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taux de satisfaction</p>
                  <p className="text-2xl font-bold">98%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-600" />
              Demandes en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <User className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.patient}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.motif}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAppointmentAction(appointment.id, 'cancel')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Refuser
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleAppointmentAction(appointment.id, 'confirm')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Tous les rendez-vous</CardTitle>
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
                      <h3 className="font-semibold">{appointment.patient}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.motif}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
