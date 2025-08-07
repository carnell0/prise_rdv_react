import { useState, useEffect } from 'react'
import { apiService } from '../services/api'
import { Doctor } from '../types/api'

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getDoctors()
      
      if (response.success && response.data) {
        setDoctors(response.data)
      } else {
        throw new Error(response.message || 'Erreur lors du chargement des médecins')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createDoctor = async (doctorData: Omit<Doctor, 'id'>) => {
    try {
      setLoading(true)
      const response = await apiService.createDoctor(doctorData)
      
      if (response.success && response.data) {
        setDoctors(prev => [...prev, response.data!])
        return response.data
      } else {
        throw new Error(response.message || 'Erreur lors de la création du médecin')
      }
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    createDoctor,
    clearError: () => setError(null)
  }
}
