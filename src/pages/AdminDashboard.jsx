import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Megaphone, Plus, Trash2, BarChart3 } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { events as initialEvents } from '../data/events.js'

function AdminDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('overview')
  const [myEvents, setMyEvents] = useState(initialEvents.slice(0, 3))
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: 'Registrations for HackFest 2026 are now open!' },
  ])
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [newEventTitle, setNewEventTitle] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'events', label: 'Manage Events' },
    { id: 'registrations', label: 'Registrations' },
    { id: 'announcements', label: 'Announcements' },
  ]

  function addEvent(e) {
    e.preventDefault()
    if (!newEventTitle.trim()) return
    setMyEvents([
      ...myEvents,
      {
        id: `new-${Date.now()}`,
        title: newEventTitle,
        club: user?.name || 'Your Club',
        category: 'Technical',
        color: '#3B82F6',
        date: '2026-10-10',
        time: 'TBA',
        venue: 'TBA',
        description: 'Details coming soon.',
      },
    ])
    setNewEventTitle('')
  }

  function deleteEvent(id) {
    setMyEvents(myEvents.filter((ev) => ev.id !== id))
  }

  function addAnnouncement(e) {
    e.preventDefault()
    if (!newAnnouncement.trim()) return
    setAnnouncements([{ id: Date.now(), text: newAnnouncement }, ...announcements])
    setNewAnnouncement('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-8 pt-4 md:px-12 lg:px-16">
          <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Welcome, {user?.name || 'Admin'} 👋
          </h1>
          <p className="mt-1 text-white/60">Manage your club and events</p>
        </div>
      </div>

      <div className="px-6 py-8 md:px-12 lg:px-16">
        <div className="mb-6 flex flex-wrap gap-2">
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

        {/* Overview */}
        {tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Calendar className="mb-2 text-coral" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">{myEvents.length}</div>
              <div className="text-sm text-gray-500">Your Events</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Users className="mb-2 text-gold" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">142</div>
              <div className="text-sm text-gray-500">Total Registrations</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <BarChart3 className="mb-2 text-brand" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">+18%</div>
              <div className="text-sm text-gray-500">Engagement This Month</div>
            </div>
          </motion.div>
        )}

        {/* Manage Events */}
        {tab === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={addEvent} className="mb-6 flex gap-2">
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="New event title..."
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-coral"
              />
              <button type="submit" className="flex items-center gap-1 rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">
                <Plus size={16} /> Add
              </button>
            </form>

            <div className="flex flex-col gap-3">
              {myEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <div>
                    <p className="font-heading font-bold text-brand">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} • {event.venue}</p>
                  </div>
                  <button onClick={() => deleteEvent(event.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {myEvents.length === 0 && <p className="text-sm text-gray-400">No events yet. Add one above.</p>}
            </div>
          </motion.div>
        )}

        {/* Registrations */}
        {tab === 'registrations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand/5 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Aditya Sharma', event: myEvents[0]?.title || 'HackFest 2026', status: 'Confirmed' },
                  { name: 'Priya Patil', event: myEvents[0]?.title || 'HackFest 2026', status: 'Confirmed' },
                  { name: 'Rohan Deshmukh', event: myEvents[1]?.title || 'Event', status: 'Pending' },
                ].map((r, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3">{r.event}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        r.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Announcements */}
        {tab === 'announcements' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={addAnnouncement} className="mb-6 flex gap-2">
              <input
                type="text"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Write an announcement..."
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-coral"
              />
              <button type="submit" className="flex items-center gap-1 rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">
                <Megaphone size={16} /> Post
              </button>
            </form>
            <div className="flex flex-col gap-3">
              {announcements.map((a) => (
                <div key={a.id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <p className="text-sm text-brand">{a.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard