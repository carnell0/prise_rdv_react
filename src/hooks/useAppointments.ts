// import { useState, useEffect } from 'react'
// import { apiService } from '../services/api'
// import { Appointment } from '../types/api'
// import { useAuth } from '../contexts/AuthContext'

// export function useAppointments() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const { user } = useAuth()

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       let response
//       if (user?.role === 'patient') {
//         response = await apiService.getPatientAppointments()
//       } else if (user?.role === 'doctor') {
//         response = await apiService.getDoctorAppointments()
//       } else if (user?.role === 'admin') {
//         response = await apiService.getAllAppointments()
//       } else {
//         response = await apiService.getAppointments()
//       }
      
//       if (response.success && response.data) {
//         setAppointments(response.data)
//       } else {
//         throw new Error(response.message || 'Erreur lors du chargement des rendez-vous')
//       }
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchPendingAppointments = async () => {
//     if (user?.role !== 'doctor') return
    
//     try {
//       const response = await apiService.getDoctorPendingAppointments()
      
//       if (response.success && response.data) {
//         setPendingAppointments(response.data)
//       }
//     } catch (error: any) {
//       console.error('Erreur lors du chargement des demandes:', error)
//     }
//   }

//   const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
//     try {
//       setLoading(true)
//       const response = await apiService.createAppointment(appointmentData)
      
//       if (response.success && response.data) {
//         setAppointments(prev => [...prev, response.data!])
//         return response.data
//       } else {
//         throw new Error(response.message || 'Erreur lors de la création du rendez-vous')
//       }
//     } catch (error: any) {
//       setError(error.message)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const confirmAppointment = async (id: string) => {
//     try {
//       setLoading(true)
//       const response = await apiService.confirmAppointment(id)
      
//       if (response.success && response.data) {
//         setAppointments(prev => prev.map(apt => apt.id === id ? response.data! : apt))
//         setPendingAppointments(prev => prev.filter(apt => apt.id !== id))
//         return response.data
//       } else {
//         throw new Error(response.message || 'Erreur lors de la confirmation')
//       }
//     } catch (error: any) {
//       setError(error.message)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const cancelAppointment = async (id: string) => {
//     try {
//       setLoading(true)
//       const response = await apiService.cancelAppointment(id)
      
//       if (response.success) {
//         setAppointments(prev => prev.map(apt => 
//           apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
//         ))
//         setPendingAppointments(prev => prev.filter(apt => apt.id !== id))
//       } else {
//         throw new Error(response.message || 'Erreur lors de l\'annulation')
//       }
//     } catch (error: any) {
//       setError(error.message)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (user) {
//       fetchAppointments()
//       if (user.role === 'doctor') {
//         fetchPendingAppointments()
//       }
//     }
//   }, [user])

//   return {
//     appointments,
//     pendingAppointments,
//     loading,
//     error,
//     fetchAppointments,
//     fetchPendingAppointments,
//     createAppointment,
//     confirmAppointment,
//     cancelAppointment,
//     clearError: () => setError(null)
//   }
// }
