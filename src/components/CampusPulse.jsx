import { motion } from 'framer-motion'
import { Calendar, Users, Zap, TrendingUp } from 'lucide-react'

const stats = [
  { icon: Calendar, label: 'Events This Week', value: 12 },
  { icon: Users, label: 'Active Clubs', value: 8 },
  { icon: Zap, label: 'Happening Today', value: 3 },
  { icon: TrendingUp, label: 'Student Registrations', value: 247 },
]

function CampusPulse() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
        >
          <stat.icon className="mb-2 h-5 w-5 text-gold" />
          <div className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {stat.value}
          </div>
          <div className="text-xs text-white/60 sm:text-sm">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}

export default CampusPulse