// Types de base
export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  username: string
  phone: string
  sexe: 'Masculin' | 'Féminin'
  adresse: string
  role: 'patient' | 'doctor' | 'admin'
  created_at: string
}

export interface Doctor {
  id: number
  firstname: string
  lastname: string
  email: string
  username: string
  phone: string
  speciality: string
  experience: number
  rating: number
  avatar?: string
  bio?: string
  adresse: string
  consultationFee: number
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
  created_at: string
}

export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  reason?: string
  notes?: string
  patient?: User
  doctor?: Doctor
  created_at: string
  updated_at?: string
}

// Types de requête - Format exact de l'API
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  sexe: 'Masculin' | 'Féminin'
  adresse: string
}

export interface CreateDoctorRequest {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
  sexe: 'Masculin' | 'Féminin'
  adresse: string
  speciality: string
  experience: number
  bio?: string
  consultationFee: number
}

export interface CreateAppointmentRequest {
  doctorId: number
  date: string
  time: string
  reason?: string
}

// Types de réponse - Format exact de l'API
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
  errors?: string[]
}

// Réponse de register - contient l'utilisateur
export interface RegisterResponse {
  success: true
  message: string
  user: User
}

// Réponse de login - contient seulement le token
export interface LoginResponse {
  success: true
  message: string
  token: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
