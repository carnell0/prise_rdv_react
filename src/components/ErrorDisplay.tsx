import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Wifi, Server, AlertTriangle, X, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'

interface ErrorDisplayProps {
  error: string | null
  onClose?: () => void
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({ error, onClose, onRetry, className = '' }: ErrorDisplayProps) {
  if (!error) return null

  // Déterminer le type d'erreur et l'icône appropriée
  const getErrorIcon = () => {
    if (error.includes('connexion') || error.includes('network')) {
      return <Wifi className="h-4 w-4" />
    }
    if (error.includes('serveur') || error.includes('500')) {
      return <Server className="h-4 w-4" />
    }
    if (error.includes('incorrect') || error.includes('401')) {
      return <AlertTriangle className="h-4 w-4" />
    }
    return <AlertCircle className="h-4 w-4" />
  }

  // Déterminer la couleur selon le type d'erreur
  const getErrorVariant = () => {
    if (error.includes('connexion') || error.includes('network')) {
      return 'default' // Bleu pour les erreurs réseau
    }
    return 'destructive' // Rouge pour les autres erreurs
  }

  const showRetryButton = error.includes('connexion') || error.includes('serveur') || error.includes('500')

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={className}
      >
        <Alert variant={getErrorVariant()} className="relative">
          {getErrorIcon()}
          <AlertDescription className="pr-8">
            {error}
          </AlertDescription>
          
          <div className="absolute right-2 top-2 flex gap-1">
            {showRetryButton && onRetry && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="h-6 w-6 p-0 hover:bg-white/20"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            )}
            
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0 hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </Alert>
      </motion.div>
    </AnimatePresence>
  )
}
