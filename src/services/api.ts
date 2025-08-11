import { 
  ApiResponse, 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse,
  RegisterResponse,
  User, 
  Doctor, 
  Appointment 
} from '../types/api'

class ApiService {
  private baseURL: string = import.meta.env.VITE_API_URL || 'https://backend-rdv-tlh8.onrender.com'
  private token: string | null = null

  constructor() {
    // Récupérer le token depuis le localStorage au démarrage
    this.token = localStorage.getItem('auth_token')
  }

  // Configuration des headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  // Table de correspondance des codes d'erreur HTTP vers messages utilisateur
  private getErrorMessage(status: number, serverMessage?: string, endpoint?: string): string {
    // Messages spécifiques par code d'erreur
    const statusMessages: Record<number, string> = {
      400: "Les données envoyées sont invalides",
      401: "Email ou mot de passe incorrect",
      403: "Accès non autorisé à cette ressource",
      404: "Service ou ressource non trouvé",
      409: "Cette ressource existe déjà",
      422: "Les informations fournies sont incorrectes",
      429: "Trop de tentatives, veuillez patienter",
      500: "Erreur serveur interne, veuillez réessayer",
      502: "Service temporairement indisponible",
      503: "Service en maintenance, veuillez réessayer plus tard",
      504: "Délai d'attente dépassé, veuillez réessayer"
    }

    // Messages contextuels selon l'endpoint
    if (endpoint?.includes('/auth/login')) {
      if (status === 401) return "Email ou mot de passe incorrect"
      if (status === 404) return "Service d'authentification indisponible"
      if (status === 429) return "Trop de tentatives de connexion, veuillez patienter"
    }

    if (endpoint?.includes('/auth/register')) {
      if (status === 409) return "Un compte existe déjà avec cet email"
      if (status === 422) return "Veuillez vérifier les informations saisies"
    }

    if (endpoint?.includes('/appointments')) {
      if (status === 404) return "Rendez-vous non trouvé"
      if (status === 409) return "Ce créneau n'est plus disponible"
    }

    if (endpoint?.includes('/doctors')) {
      if (status === 404) return "Médecin non trouvé"
    }

    // Priorité : message du serveur > message contextuel > message générique
    return serverMessage || statusMessages[status] || `Erreur ${status}: Une erreur inattendue s'est produite`
  }

  // Méthode générique pour les requêtes
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    try {
      const config: RequestInit = {
        headers: this.getHeaders(),
        ...options,
      }

      const response = await fetch(url, config)
      
      // Essayer de parser la réponse JSON
      let data: any
      try {
        data = await response.json()
      } catch (parseError) {
        // Si le parsing JSON échoue, créer une réponse d'erreur
        throw new Error(this.getErrorMessage(response.status, undefined, endpoint))
      }

      if (!response.ok) {
        // Extraire le message d'erreur de différentes structures possibles
        const serverMessage = 
          data.message || 
          data.error || 
          data.details || 
          (data.errors && Array.isArray(data.errors) ? data.errors.join(', ') : '') ||
          (data.errors && typeof data.errors === 'object' ? Object.values(data.errors).join(', ') : '')

        const errorMessage = this.getErrorMessage(response.status, serverMessage, endpoint)
        
        // Log pour le débogage
        console.error(`API Error [${response.status}] ${endpoint}:`, {
          status: response.status,
          serverMessage,
          finalMessage: errorMessage,
          data
        })

        throw new Error(errorMessage)
      }

      return data
    } catch (error) {
      // Gestion des erreurs réseau
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.')
      }
      
      if (error instanceof Error) {
        throw error
      }
      
      // Erreur inconnue
      throw new Error('Une erreur inattendue s\'est produite')
    }
  }

  // Gestion du token
  setAuthToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  clearAuthToken() {
    this.token = null
    localStorage.removeItem('auth_token')
  }

  // === ENDPOINTS D'AUTHENTIFICATION ===
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.success && response.token) {
      this.setAuthToken(response.token)
    }
    
    return response
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.request<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    
    return response
  }

  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<ApiResponse<void>>('/api/auth/logout', {
      method: 'POST',
    })
    this.clearAuthToken()
    return response
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/api/auth/me')
  }

  // === ENDPOINTS MÉDECINS ===
  async getDoctors(): Promise<ApiResponse<Doctor[]>> {
    return this.request<ApiResponse<Doctor[]>>('/api/doctors')
  }

  async getDoctorById(id: number): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>(`/api/doctors/${id}`)
  }

  async createDoctor(doctorData: Omit<Doctor, 'id' | 'created_at'>): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>('/api/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    })
  }

  // === ENDPOINTS RENDEZ-VOUS ===
  async getAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<ApiResponse<Appointment[]>>('/api/appointments')
  }

  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Appointment>> {
    return this.request<ApiResponse<Appointment>>('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    })
  }

  async confirmAppointment(id: number): Promise<ApiResponse<Appointment>> {
    return this.request<ApiResponse<Appointment>>(`/api/appointments/${id}/confirm`, {
      method: 'PUT',
    })
  }

  async cancelAppointment(id: number): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/api/appointments/${id}/cancel`, {
      method: 'PUT',
    })
  }

  // === ENDPOINTS SPÉCIFIQUES PAR RÔLE ===
  async getPatientAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<ApiResponse<Appointment[]>>('/api/patients/appointments')
  }

  async getDoctorAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<ApiResponse<Appointment[]>>('/api/doctors/appointments')
  }

  async getDoctorPendingAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<ApiResponse<Appointment[]>>('/api/doctors/appointments/pending')
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.request<ApiResponse<User[]>>('/api/admin/users')
  }

  async getAllAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<ApiResponse<Appointment[]>>('/api/admin/appointments')
  }
}

export const apiService = new ApiService()
export default apiService