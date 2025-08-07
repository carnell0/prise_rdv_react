import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function AppRoutes() {
  const { user } = useAuth()

  // Redirection automatique si connecté
  if (user) {
    return (
      <Routes>
        <Route path="/" element={
          <Navigate to={
            user.role === 'patient' ? '/dashboard/patient' :
            user.role === 'doctor' ? '/dashboard/doctor' :
            user.role === 'admin' ? '/dashboard/admin' : '/'
          } replace />
        } />
        <Route 
          path="/dashboard/patient" 
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/doctor" 
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  // Routes pour utilisateurs non connectés
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <AppRoutes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
