import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Calendar, Clock, Users, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface LandingSectionProps {
  onBookAppointment: () => void
}

export function LandingSection({ onBookAppointment }: LandingSectionProps) {
  const stats = [
    { icon: Users, label: 'Patients satisfaits', value: '10,000+' },
    { icon: Calendar, label: 'Rendez-vous pris', value: '50,000+' },
    { icon: Clock, label: 'Temps moyen d\'attente', value: '< 15 min' },
    { icon: Star, label: 'Note moyenne', value: '4.9/5' }
  ]

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Patiente',
      content: 'Interface très intuitive, j\'ai pu prendre mon rendez-vous en quelques clics !',
      rating: 5
    },
    {
      name: 'Dr. Jean Martin',
      role: 'Médecin généraliste',
      content: 'Excellent outil pour gérer mes consultations et optimiser mon planning.',
      rating: 5
    },
    {
      name: 'Sophie Laurent',
      role: 'Patiente',
      content: 'Service rapide et efficace. Je recommande vivement cette plateforme.',
      rating: 5
    }
  ]

  const features = [
    'Prise de rendez-vous en ligne 24h/24',
    'Rappels automatiques par SMS/Email',
    'Consultation de l\'historique médical',
    'Paiement sécurisé en ligne',
    'Interface adaptée à tous les appareils'
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              Plateforme de santé digitale
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Prenez rendez-vous avec votre médecin en{' '}
              <span className="text-primary">quelques clics</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Simplifiez vos démarches de santé avec notre plateforme moderne et sécurisée. 
              Trouvez le bon médecin, réservez votre créneau et gérez vos consultations en toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onBookAppointment}
                className="text-lg px-8 py-6"
              >
                Prendre un rendez-vous
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Découvrir nos services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pourquoi choisir MediCare ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète conçue pour simplifier vos démarches de santé
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
            <div className="relative">
              <img 
                src="/placeholder-c8fp5.png"
                alt="Interface MediCare"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-lg text-muted-foreground">
              Des milliers de patients et médecins nous font confiance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à simplifier vos rendez-vous médicaux ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont déjà adopté notre solution
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={onBookAppointment}
              className="text-lg px-8 py-6"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}