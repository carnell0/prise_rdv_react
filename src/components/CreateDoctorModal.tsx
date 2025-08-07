import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent } from './ui/card'
import { Loader2, UserPlus, CheckCircle } from 'lucide-react'

interface CreateDoctorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateDoctorModal({ isOpen, onClose }: CreateDoctorModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    education: '',
    description: '',
    languages: '',
    price: '',
    location: ''
  })

  const specialties = [
    'Médecin généraliste',
    'Cardiologue',
    'Neurologue',
    'Ophtalmologue',
    'Dermatologue',
    'Pédiatre',
    'Gynécologue',
    'Psychiatre',
    'Radiologue',
    'Anesthésiste'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStep(2) // Success step
    } catch (error) {
      console.error('Erreur lors de la création du médecin:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      specialty: '',
      experience: '',
      education: '',
      description: '',
      languages: '',
      price: '',
      location: ''
    })
    onClose()
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Informations personnelles */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Informations personnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">Prénom *</Label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) => handleInputChange('firstname', e.target.value)}
                placeholder="Jean"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Nom *</Label>
              <Input
                id="lastname"
                value={formData.lastname}
                onChange={(e) => handleInputChange('lastname', e.target.value)}
                placeholder="Dupont"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="jean.dupont@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="01 23 45 67 89"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations professionnelles */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-800">Informations professionnelles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">Spécialité *</Label>
              <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une spécialité" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Années d'expérience *</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="15"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="price">Tarif consultation (€) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="80"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Paris 8ème"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations complémentaires */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">Informations complémentaires</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="education">Formation</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="Université Paris Descartes, Harvard Medical School"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Langues parlées</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                placeholder="Français, Anglais, Espagnol"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Décrivez l'expertise et l'approche du médecin..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-semibold"
        disabled={!formData.firstname || !formData.lastname || !formData.email || !formData.phone || !formData.specialty || !formData.experience || !formData.price || !formData.location || loading}
      >
        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        <UserPlus className="mr-2 h-5 w-5" />
        Créer le profil médecin
      </Button>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto"
      >
        <CheckCircle className="h-12 w-12 text-white" />
      </motion.div>
      
      <div>
        <h3 className="text-2xl font-bold text-green-600 mb-2">Médecin créé avec succès !</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Le profil du Dr. {formData.firstname} {formData.lastname} a été créé et ajouté à la plateforme.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <h4 className="font-semibold mb-3">Récapitulatif :</h4>
        <div className="space-y-2 text-sm text-left">
          <p><strong>Nom:</strong> Dr. {formData.firstname} {formData.lastname}</p>
          <p><strong>Spécialité:</strong> {formData.specialty}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Localisation:</strong> {formData.location}</p>
          <p><strong>Tarif:</strong> {formData.price}€</p>
        </div>
      </div>

      <Button 
        onClick={handleClose}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-semibold"
      >
        Retour au dashboard
      </Button>
    </motion.div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {step === 1 ? 'Créer un nouveau médecin' : 'Médecin créé !'}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? renderStep1() : renderStep2()}
      </DialogContent>
    </Dialog>
  )
}
