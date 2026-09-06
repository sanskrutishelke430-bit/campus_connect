import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, User, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import EventCard from '../components/EventCard.jsx'
import { events } from '../data/events.js'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

function EventDetails() {
  const { id } = useParams()
  const event = events.find((e) => e.id === id)
  const [registered, setRegistered] = useState(false)
  const countdown = useCountdown(event ? `${event.date}T00:00:00` : null)

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="p-8 text-gray-500">Event not found.</p>
      </div>
    )
  }

  const relatedEvents = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-10 pt-4 md:px-12 lg:px-16">
          <Link to="/events" className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${event.color}30`, color: event.color }}
          >
            {event.category}
          </span>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{event.title}</h1>
          <p className="mt-1 text-white/60">by {event.club}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-12 lg:px-16">
        {/* Main Content */}
        <div className="md:col-span-2">
          <h2 className="font-heading text-lg font-bold text-brand">About this event</h2>
          <p className="mt-2 leading-relaxed text-gray-600">{event.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-coral" /> {event.time}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-coral" /> {event.venue}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User size={16} className="text-coral" /> {event.organizer}
            </div>
          </div>

          {relatedEvents.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 font-heading text-lg font-bold text-brand">Related Events</h2>
              <div className="flex flex-col gap-4">
                {relatedEvents.map((e, i) => (
                  <EventCard key={e.id} event={e} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Countdown + Register */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <p className="mb-3 text-sm font-semibold text-gray-500">Event starts in</p>
          <div className="mb-6 flex gap-3">
            {['days', 'hours', 'minutes'].map((unit) => (
              <div key={unit} className="flex-1 rounded-xl bg-brand/5 py-3 text-center">
                <div className="font-heading text-2xl font-bold text-brand">{countdown[unit] ?? '--'}</div>
                <div className="text-xs capitalize text-gray-400">{unit}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setRegistered(!registered)}
            className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
              registered
                ? 'bg-green-100 text-green-700'
                : 'bg-coral text-white hover:scale-[1.02]'
            }`}
          >
            {registered ? '✓ Registered' : 'Register Now'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default EventDetails