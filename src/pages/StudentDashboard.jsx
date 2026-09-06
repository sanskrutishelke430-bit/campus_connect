import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bell, Calendar, MapPin, User } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { events } from '../data/events.js'

const notifications = [
  { id: 1, text: 'HackFest 2026 starts in 3 days — don\'t forget to bring your laptop!', time: '2h ago' },
  { id: 2, text: 'New event added by Rhythm Collective: Acoustic Nights', time: '1d ago' },
  { id: 3, text: 'Your registration for Frame in Focus is confirmed.', time: '2d ago' },
]

function StudentDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('overview')

  // Mock: pretend student registered for first 3 events
  const registeredEvents = events.slice(0, 3)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'registered', label: 'My Events' },
    { id: 'notifications', label: 'Notifications' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-8 pt-4 md:px-12 lg:px-16">
          <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Hi, {user?.name || 'Student'} 👋
          </h1>
          <p className="mt-1 text-white/60">Here's what's happening for you</p>
        </div>
      </div>

      <div className="px-6 py-8 md:px-12 lg:px-16">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-coral text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Calendar className="mb-2 text-coral" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">{registeredEvents.length}</div>
              <div className="text-sm text-gray-500">Registered Events</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Bell className="mb-2 text-gold" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">{notifications.length}</div>
              <div className="text-sm text-gray-500">New Notifications</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <User className="mb-2 text-brand" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">Student</div>
              <div className="text-sm text-gray-500">Account Type</div>
            </div>
          </motion.div>
        )}

        {/* Registered Events Tab */}
        {tab === 'registered' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
            {registeredEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 hover:shadow-md"
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                  style={{ backgroundColor: `${event.color}15`, color: event.color }}
                >
                  {new Date(event.date).getDate()}
                </div>
                <div>
                  <p className="font-heading font-bold text-brand">{event.title}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {event.venue}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Notifications Tab */}
        {tab === 'notifications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            {notifications.map((n) => (
              <div key={n.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <p className="text-sm text-brand">{n.text}</p>
                <p className="mt-1 text-xs text-gray-400">{n.time}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard