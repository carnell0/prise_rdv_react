import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../src/components/ui/dialog'
import { Button } from '../../src/components/ui/button'
import { Input } from '../../src/components/ui/input'
import { Label } from '../../src/components/ui/label'
import { Textarea } from '../../src/components/ui/textarea'
import { Calendar } from '../../src/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../src/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card'
import { Badge } from '../../src/components/ui/badge'
import { Alert, AlertDescription } from '../../src/components/ui/alert'
import { Calendar as CalendarIcon, Clock, CreditCard, Loader2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ImprovedAppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState('')
  const [motif, setMotif] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validation du paiement
      if (paymentMethod === 'card') {
        if (!paymentData.cardNumber.trim()) throw new Error('Le numéro de carte est requis')
        if (!paymentData.expiryDate.trim()) throw new Error('La date d\'expiration est requise')
        if (!paymentData.cvv.trim()) throw new Error('Le CVV est requis')
        if (!paymentData.cardName.trim()) throw new Error('Le nom sur la carte est requis')
        
        // Validation simple du numéro de carte
        const cardNumber = paymentData.cardNumber.replace(/\s/g, '')
        if (cardNumber.length < 16) throw new Error('Le numéro de carte doit contenir au moins 16 chiffres')
        if (!/^\d+$/.test(cardNumber)) throw new Error('Le numéro de carte ne doit contenir que des chiffres')
        
        // Validation date d'expiration
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
        if (!expiryRegex.test(paymentData.expiryDate)) {
          throw new Error('Format de date invalide (MM/AA)')
        }
        
        // Validation CVV
        if (!/^[0-9]{3,4}$/.test(paymentData.cvv)) {
          throw new Error('Le CVV doit contenir 3 ou 4 chiffres')
        }

        // Simulation d'erreur de paiement pour test
        if (cardNumber === '4000000000000002') {
          throw new Error('Carte refusée par votre banque')
        }
      }

      // Simulation d'appel API
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulation d'erreur réseau
          if (Math.random() < 0.1) { // 10% de chance d'erreur
            reject(new Error('Erreur réseau. Veuillez réessayer.'))
            return
          }
          resolve(true)
        }, 2500)
      })

      setSuccess('Rendez-vous confirmé ! Vous recevrez un email de confirmation.')
      
      // Fermer le modal après succès
      setTimeout(() => {
        handleClose()
      }, 2000)

    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite')
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
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    })
    setError(null)
    setSuccess(null)
    setLoading(false)
    onClose()
  }

  const handleNextStep = () => {
    setError(null)
    if (!selectedDate) {
      setError('Veuillez sélectionner une date')
      return
    }
    if (!selectedTime) {
      setError('Veuillez sélectionner un créneau horaire')
      return
    }
    if (!motif.trim()) {
      setError('Veuillez indiquer le motif de votre consultation')
      return
    }
    if (motif.trim().length < 10) {
      setError('Le motif doit contenir au moins 10 caractères')
      return
    }
    setStep(2)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    setPaymentData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (value: string) => {
    let formatted = value.replace(/\D/g, '')
    if (formatted.length >= 2) {
      formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4)
    }
    setPaymentData(prev => ({ ...prev, expiryDate: formatted }))
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Date du rendez-vous</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP', { locale: fr }) : 'Sélectionner une date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return date < today || date.getDay() === 0 // Pas dimanche, pas dans le passé
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {selectedDate && (
        <div className="space-y-2">
          <Label>Créneau horaire</Label>
          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className="text-sm"
              >
                <Clock className="mr-1 h-3 w-3" />
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="motif">Motif de la consultation</Label>
        <Textarea
          id="motif"
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          placeholder="Décrivez brièvement le motif de votre consultation... (minimum 10 caractères)"
          rows={4}
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">
          {motif.length}/500 caractères {motif.length < 10 && '(minimum 10)'}
        </p>
      </div>

      <Button 
        onClick={handleNextStep}
        className="w-full"
        disabled={!selectedDate || !selectedTime || !motif.trim() || motif.length < 10}
      >
        Continuer vers le paiement
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Récapitulatif du rendez-vous</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{selectedDate && format(selectedDate, 'PPP', { locale: fr })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Heure:</span>
            <span>{selectedTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Motif:</span>
            <span className="text-right max-w-[200px] text-sm">{motif}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total:</span>
            <span>25,00 €</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Label>Mode de paiement</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('card')}
            className="h-16 flex-col"
          >
            <CreditCard className="h-6 w-6 mb-1" />
            <span>Carte bancaire</span>
          </Button>
          <Button
            variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
            onClick={() => setPaymentMethod('paypal')}
            className="h-16 flex-col"
          >
            <div className="h-6 w-6 mb-1 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              PP
            </div>
            <span>PayPal</span>
          </Button>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numéro de carte</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  maxLength={19}
                />
                <p className="text-xs text-muted-foreground">
                  Testez avec 4000000000000002 pour voir une erreur
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Date d'expiration</Label>
                <Input 
                  id="expiryDate" 
                  placeholder="MM/AA"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  maxLength={5}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ 
                    ...prev, 
                    cvv: e.target.value.replace(/\D/g, '').substring(0, 4) 
                  }))}
                  maxLength={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Nom sur la carte</Label>
                <Input 
                  id="cardName" 
                  placeholder="John Doe"
                  value={paymentData.cardName}
                  onChange={(e) => setPaymentData(prev => ({ 
                    ...prev, 
                    cardName: e.target.value 
                  }))}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)} 
          className="flex-1"
          disabled={loading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1"
          disabled={!paymentMethod || loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirmer et payer
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            Prendre un rendez-vous
            <Badge variant="secondary" className="ml-2">
              Étape {step}/2
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Zone scrollable pour le contenu */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
          {step === 1 ? renderStep1() : renderStep2()}
        </div>
      </DialogContent>
    </Dialog>
  )
}