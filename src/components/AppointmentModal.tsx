import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CalendarIcon, Clock, CreditCard, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
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
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000))
      onClose()
      // Afficher une notification de succès
    } catch (error) {
      console.error('Erreur lors de la prise de rendez-vous:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
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
              disabled={(date) => date < new Date() || date.getDay() === 0}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {selectedDate && (
        <div className="space-y-2">
          <Label>Créneau horaire</Label>
          <div className="grid grid-cols-3 gap-2">
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
          placeholder="Décrivez brièvement le motif de votre consultation..."
          rows={4}
        />
      </div>

      <Button 
        onClick={() => setStep(2)} 
        className="w-full"
        disabled={!selectedDate || !selectedTime || !motif}
      >
        Continuer vers le paiement
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
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
            <span className="text-right max-w-[200px]">{motif}</span>
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
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Prendre un rendez-vous
            <Badge variant="secondary" className="ml-2">
              Étape {step}/2
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? renderStep1() : renderStep2()}
      </DialogContent>
    </Dialog>
  )
}
