import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../src/components/ui/dialog'
import { Button } from '../src/components/ui/button'
import { Label } from '../src/components/ui/label'
import { Textarea } from '../src/components/ui/textarea'
import { Calendar } from '../src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../src/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card'
import { Badge } from '../src/components/ui/badge'
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

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Mode de paiement</Label>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('card')}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
              paymentMethod === 'card'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <CreditCard className="h-8 w-8 mx-auto mb-2" />
            <span className="font-semibold">Carte bancaire</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPaymentMethod('paypal')}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
              paymentMethod === 'paypal'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="h-8 w-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
              PP
            </div>
            <span className="font-semibold">PayPal</span>
          </motion.button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)} 
          className="flex-1 h-12 rounded-xl border-2"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg font-semibold"
          disabled={!paymentMethod || loading}
        >
          {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Confirmer et payer
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
        <h3 className="text-2xl font-bold text-green-600 mb-2">Rendez-vous confirmé !</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Votre rendez-vous a été pris avec succès. Vous recevrez une confirmation par email.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <h4 className="font-semibold mb-3">Détails du rendez-vous :</h4>
        <div className="space-y-2 text-sm">
          {selectedDoctor && <p><strong>Médecin:</strong> {selectedDoctor.name}</p>}
          <p><strong>Date:</strong> {selectedDate && format(selectedDate, 'PPP', { locale: fr })}</p>
          <p><strong>Heure:</strong> {selectedTime}</p>
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
      <DialogContent className="sm:max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prendre un rendez-vous
            </span>
            {step < 3 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Étape {step}/2
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
