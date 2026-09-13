import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Megaphone, Plus, Trash2, BarChart3 } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function AdminDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('overview')
  const [myEvents, setMyEvents] = useState([])
  const [allRegistrations, setAllRegistrations] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [newEvent, setNewEvent] = useState({ title: '', date: '', venue: '', time: '', category: 'Technical' })
  const [loading, setLoading] = useState(true)

  const API = import.meta.env.VITE_API_URL

  function loadData() {
    Promise.all([
      fetch(`${API}/events`).then((r) => r.json()),
      fetch(`${API}/registrations`).then((r) => r.json()),
      fetch(`${API}/announcements`).then((r) => r.json()),
    ]).then(([events, regs, anns]) => {
      setMyEvents(events)
      setAllRegistrations(regs)
      setAnnouncements(anns)
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'events', label: 'Manage Events' },
    { id: 'registrations', label: 'Registrations' },
    { id: 'announcements', label: 'Announcements' },
  ]

  async function addEvent(e) {
    e.preventDefault()
    if (!newEvent.title.trim() || !newEvent.date) return
    try {
      await fetch(`${API}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newEvent.title,
          club: user?.name || 'Your Club',
          category: newEvent.category,
          color: '#3B82F6',
          date: newEvent.date,
          time: newEvent.time || 'TBA',
          venue: newEvent.venue || 'TBA',
          description: 'Details coming soon.',
          organizer: user?.name || 'Your Club',
        }),
      })
      setNewEvent({ title: '', date: '', venue: '', time: '', category: 'Technical' })
      loadData()
    } catch (err) {
      console.error('Failed to add event:', err)
    }
  }

  async function deleteEvent(id) {
    try {
      await fetch(`${API}/events/${id}`, { method: 'DELETE' })
      loadData()
    } catch (err) {
      console.error('Failed to delete event:', err)
    }
  }

  async function addAnnouncement(e) {
    e.preventDefault()
    if (!newAnnouncement.trim()) return
    try {
      await fetch(`${API}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newAnnouncement, clubName: user?.name || 'Your Club' }),
      })
      setNewAnnouncement('')
      loadData()
    } catch (err) {
      console.error('Failed to post announcement:', err)
    }
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

        {loading && <p className="text-gray-400">Loading dashboard...</p>}

        {!loading && tab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Calendar className="mb-2 text-coral" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">{myEvents.length}</div>
              <div className="text-sm text-gray-500">Total Events</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Users className="mb-2 text-gold" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">{allRegistrations.length}</div>
              <div className="text-sm text-gray-500">Total Registrations</div>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <BarChart3 className="mb-2 text-brand" size={20} />
              <div className="font-heading text-2xl font-bold text-brand">{announcements.length}</div>
              <div className="text-sm text-gray-500">Announcements Posted</div>
            </div>
          </motion.div>
        )}

        {!loading && tab === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={addEvent} className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title..."
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-coral"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-coral"
              />
              <input
                type="text"
                value={newEvent.venue}
                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                placeholder="Venue"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-coral"
              />
              <button type="submit" className="flex items-center justify-center gap-1 rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white">
                <Plus size={16} /> Add Event
              </button>
            </form>

            <div className="flex flex-col gap-3">
              {myEvents.map((event) => (
                <div key={event._id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <div>
                    <p className="font-heading font-bold text-brand">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} • {event.venue}</p>
                  </div>
                  <button onClick={() => deleteEvent(event._id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {!loading && tab === 'registrations' && (
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
                {allRegistrations.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-gray-400">No registrations yet.</td></tr>
                )}
                {allRegistrations.map((r) => (
                  <tr key={r._id} className="border-t border-gray-100">
                    <td className="px-4 py-3">{r.userName}</td>
                    <td className="px-4 py-3">{r.eventTitle}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {!loading && tab === 'announcements' && (
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
                <div key={a._id} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <p className="text-sm text-brand">{a.text}</p>
                  <p className="mt-1 text-xs text-gray-400">by {a.clubName}</p>
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