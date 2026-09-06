import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return {
    day: date.toLocaleDateString('en-US', { day: '2-digit' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
  }
}

function EventCard({ event, index }) {
  const { day, month } = formatDate(event.date)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link
        to={`/events/${event.id}`}
        className="group flex gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-md sm:gap-8 sm:p-6"
      >
        {/* Date Block */}
        <div
          className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl sm:h-20 sm:w-20"
          style={{ backgroundColor: `${event.color}15` }}
        >
          <span className="font-heading text-xl font-bold sm:text-2xl" style={{ color: event.color }}>
            {day}
          </span>
          <span className="text-xs font-medium uppercase" style={{ color: event.color }}>
            {month}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <span
            className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: `${event.color}15`, color: event.color }}
          >
            {event.category}
          </span>
          <h3 className="font-heading text-lg font-bold text-brand group-hover:text-coral sm:text-xl">
            {event.title}
          </h3>
          <p className="text-sm text-gray-500">by {event.club}</p>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 sm:text-sm">
            <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default EventCard