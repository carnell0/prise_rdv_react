import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../src/components/ui/dialog'
import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../src/components/ui/select'
import { Textarea } from '../../src/components/ui/textarea'
import { Alert, AlertDescription } from '../../src/components/ui/alert'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onSuccess: (user: any) => void
  onSwitchMode: (mode: 'login' | 'register') => void
}

export default function ImprovedAuthModal({ isOpen, mode, onClose, onSuccess, onSwitchMode }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    sexe: '',
    adresse: ''
  })

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validation basique
      if (mode === 'register') {
        if (!formData.firstname.trim()) throw new Error('Le prénom est requis')
        if (!formData.lastname.trim()) throw new Error('Le nom est requis')
        if (!formData.phone.trim()) throw new Error('Le téléphone est requis')
        if (!formData.sexe) throw new Error('Le sexe est requis')
        if (!formData.adresse.trim()) throw new Error('L\'adresse est requise')
      }
      
      if (!formData.email.trim()) throw new Error('L\'email est requis')
      if (!formData.password.trim()) throw new Error('Le mot de passe est requis')
      
      if (formData.password.length < 6) {
        throw new Error('Le mot de passe doit contenir au moins 6 caractères')
      }

      // Validation email simple
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Veuillez entrer une adresse email valide')
      }

      // Simulation d'appel API avec erreurs possibles
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulation d'erreurs pour tester
          if (mode === 'login' && formData.email === 'error@test.com') {
            reject(new Error('Email ou mot de passe incorrect'))
            return
          }
          if (mode === 'register' && formData.email === 'existing@test.com') {
            reject(new Error('Cette adresse email est déjà utilisée'))
            return
          }
          
          resolve(true)
        }, 2000)
      })
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        role: 'patient' // Par défaut
      }
      
      setSuccess(mode === 'login' ? 'Connexion réussie !' : 'Compte créé avec succès !')
      
      // Attendre un peu pour montrer le message de succès
      setTimeout(() => {
        onSuccess(userData)
        resetForm()
      }, 1000)
      
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      sexe: '',
      adresse: ''
    })
    setError(null)
    setSuccess(null)
    setShowPassword(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Effacer les erreurs lors de la saisie
    if (error) setError(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    resetForm()
    onSwitchMode(newMode)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Se connecter' : 'Créer un compte'}
          </DialogTitle>
        </DialogHeader>

        {/* Zone scrollable pour le contenu du formulaire */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4" onKeyPress={handleKeyPress}>
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Prénom <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="firstname"
                      value={formData.firstname}
                      onChange={(e) => handleInputChange('firstname', e.target.value)}
                      disabled={loading}
                      className={error && !formData.firstname.trim() ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Nom <span className="text-red-500">*</span>
                    </div>
                    <Input
                      id="lastname"
                      value={formData.lastname}
                      onChange={(e) => handleInputChange('lastname', e.target.value)}
                      disabled={loading}
                      className={error && !formData.lastname.trim() ? 'border-red-500' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Téléphone <span className="text-red-500">*</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={loading}
                    className={error && !formData.phone.trim() ? 'border-red-500' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Sexe <span className="text-red-500">*</span>
                  </div>
                  <Select 
                    value={formData.sexe} 
                    onValueChange={(value) => handleInputChange('sexe', value)}
                    disabled={loading}
                  >
                    <SelectTrigger className={error && !formData.sexe ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homme">Homme</SelectItem>
                      <SelectItem value="femme">Femme</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Adresse <span className="text-red-500">*</span>
                  </div>
                  <Textarea
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => handleInputChange('adresse', e.target.value)}
                    placeholder="123 Rue de la Paix, 75001 Paris"
                    rows={3}
                    disabled={loading}
                    className={error && !formData.adresse.trim() ? 'border-red-500' : ''}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email <span className="text-red-500">*</span>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={loading}
                className={error && !formData.email.trim() ? 'border-red-500' : ''}
              />
              {mode === 'login' && (
                <p className="text-xs text-muted-foreground">
                  Testez avec "error@test.com" pour voir une erreur
                </p>
              )}
              {mode === 'register' && (
                <p className="text-xs text-muted-foreground">
                  Testez avec "existing@test.com" pour voir une erreur
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Mot de passe <span className="text-red-500">*</span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={loading}
                  className={error && formData.password.length < 6 ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {mode === 'register' && (
                <p className="text-xs text-muted-foreground">
                  Minimum 6 caractères
                </p>
              )}
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'login' ? 'Se connecter' : 'Créer le compte'}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => handleSwitchMode(mode === 'login' ? 'register' : 'login')}
                disabled={loading}
              >
                {mode === 'login' 
                  ? "Pas encore de compte ? S'inscrire" 
                  : 'Déjà un compte ? Se connecter'
                }
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}