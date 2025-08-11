import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CalendarIcon, Clock, CreditCard, Loader2, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDoctor?: any
}

export default function AppointmentModal({ isOpen, onClose, selectedDoctor }: AppointmentModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [motif, setMotif] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStep(3) // Success step
    } catch (error) {
      console.error('Erreur lors de la prise de rendez-vous:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setSelectedDate(undefined)
    setSelectedTime('')
    setMotif('')
    setPaymentMethod('')
    onClose()
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  const renderStep1 = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {selectedDoctor && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={selectedDoctor.avatar || "/placeholder.svg"}
              alt={selectedDoctor.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{selectedDoctor.name}</h3>
              <p className="text-sm text-blue-600">{selectedDoctor.specialty}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-bold text-green-600">{selectedDoctor.price}€</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-lg font-semibold">Date du rendez-vous</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal h-12 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
            >
              <CalendarIcon className="mr-3 h-5 w-5 text-blue-500" />
              {selectedDate ? format(selectedDate, 'PPP', { locale: fr }) : 'Sélectionner une date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Label className="text-lg font-semibold">Créneau horaire</Label>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedTime === time
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <Clock className="h-4 w-4 mx-auto mb-1" />
                <span className="text-sm font-medium">{time}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        <Label htmlFor="motif" className="text-lg font-semibold">Motif de la consultation</Label>
        <Textarea
          id="motif"
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          placeholder="Décrivez brièvement le motif de votre consultation..."
          rows={4}
          className="rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
        />
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-semibold"
        disabled={!selectedDate || !selectedTime || !motif}
      >
        Continuer vers le paiement
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-0">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
            Récapitulatif du rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDoctor && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Médecin:</span>
              <span className="font-semibold">{selectedDoctor.name}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-semibold">{selectedDate && format(selectedDate, 'PPP', { locale: fr })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Heure:</span>
            <span className="font-semibold">{selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Motif:</span>
            <span className="text-right max-w-[200px] font-semibold">{motif}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-green-600">{selectedDoctor?.price || 25},00 €</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Label className="text-lg font-semibold">Méthode de paiement</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className="h-16 rounded-xl text-lg"
          >
            <CreditCard className="mr-3 h-6 w-6" />
            Carte
          </Button>
          <Button 
            variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('paypal')}
            className="h-16 rounded-xl text-lg"
          >
            PayPal
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button 
          variant="ghost"
          onClick={() => setStep(1)}
          className="text-gray-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button 
          onClick={handleSubmit}
          className="h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-lg font-semibold"
          disabled={!paymentMethod || loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            'Confirmer et Payer'
          )}
        </Button>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center py-10"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      </motion.div>
      <h2 className="text-2xl font-bold mb-3">Rendez-vous confirmé !</h2>
      <p className="text-gray-600 mb-6">
        Votre rendez-vous avec {selectedDoctor?.name} le {selectedDate && format(selectedDate, 'PPP', { locale: fr })} à {selectedTime} est confirmé.
      </p>
      <Button onClick={handleClose} className="w-full h-12 rounded-xl">
        Fermer
      </Button>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open onOpenChange={handleClose}>
          <DialogContent className="max-w-lg p-8 rounded-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                {step === 1 && 'Prendre un rendez-vous'}
                {step === 2 && 'Confirmation et paiement'}
                {step === 3 && 'Confirmation'}
              </DialogTitle>
            </DialogHeader>
            <AnimatePresence mode="wait">
              <div key={step}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </div>
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}