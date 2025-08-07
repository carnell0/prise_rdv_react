import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star, MapPin, Clock, Calendar, Phone, Mail, Award, Languages, GraduationCap, Heart, Brain, Eye, Stethoscope, User } from 'lucide-react'

const specialtyIcons = {
  'Médecin généraliste': Stethoscope,
  'Cardiologue': Heart,
  'Neurologue': Brain,
  'Ophtalmologue': Eye,
  'Dermatologue': User,
  'Pédiatre': User
}

interface DoctorModalProps {
  doctor: any
  isOpen: boolean
  onClose: () => void
  onBookAppointment: () => void
}

export default function DoctorModal({ doctor, isOpen, onClose, onBookAppointment }: DoctorModalProps) {
  if (!doctor) return null

  const SpecialtyIcon = specialtyIcons[doctor.specialty as keyof typeof specialtyIcons] || Stethoscope

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <DialogHeader className="pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div className="relative">
              <img
                src={doctor.avatar || "/placeholder.svg"}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                <SpecialtyIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {doctor.name}
              </DialogTitle>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mt-1">{doctor.specialty}</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold ml-1">{doctor.rating}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">({doctor.reviews} avis)</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {doctor.experience} d'expérience
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{doctor.price}€</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">par consultation</p>
            </div>
          </motion.div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                À propos
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{doctor.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-green-600" />
                Formation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{doctor.education}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Languages className="h-6 w-6 mr-2 text-purple-600" />
                Langues parlées
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language: string) => (
                  <Badge key={language} variant="secondary" className="bg-purple-100 text-purple-800">
                    {language}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar avec informations pratiques */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                Localisation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{doctor.location}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Prochaine disponibilité
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{doctor.nextAvailable}</p>
              <div className="grid grid-cols-2 gap-2">
                {doctor.availableSlots.slice(0, 4).map((slot: string) => (
                  <Badge key={slot} variant="outline" className="justify-center py-2">
                    {slot}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Prendre rendez-vous
              </h3>
              <p className="text-blue-100 mb-4">Réservez votre consultation en quelques clics</p>
              <Button
                onClick={onBookAppointment}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-full"
                size="lg"
              >
                Réserver maintenant
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                Contact
              </h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer un message
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
