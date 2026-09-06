import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Award } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import EventCard from '../components/EventCard.jsx'
import { clubs } from '../data/clubs.js'
import { events } from '../data/events.js'

function ClubDetails() {
  const { id } = useParams()
  const club = clubs.find((c) => c.id === id)

  if (!club) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <p className="p-8 text-gray-500">Club not found.</p>
      </div>
    )
  }

  const clubEvents = events.filter((e) => e.clubId === club.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-10 pt-4 md:px-12 lg:px-16">
          <Link to="/clubs" className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white">
            <ArrowLeft size={16} /> Back to Clubs
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: `${club.color}30` }}
            >
              {club.logo}
            </div>
            <div>
              <span
                className="mb-1 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: `${club.color}30`, color: club.color }}
              >
                {club.category}
              </span>
              <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">{club.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-12 lg:px-16">
        {/* Main Content */}
        <div className="md:col-span-2">
          <h2 className="font-heading text-lg font-bold text-brand">About</h2>
          <p className="mt-2 leading-relaxed text-gray-600">{club.shortDescription}</p>

          <h2 className="mt-8 mb-4 font-heading text-lg font-bold text-brand">Upcoming Events</h2>
          {clubEvents.length > 0 ? (
            <div className="flex flex-col gap-4">
              {clubEvents.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No upcoming events right now.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex h-fit flex-col gap-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-500">
              <Users size={16} className="text-coral" /> {club.members} Members
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <Award size={16} className="text-gold" /> Achievements
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {club.achievements.map((a) => (
                <li key={a} className="rounded-lg bg-brand/5 px-3 py-2 text-xs text-brand">
                  🏆 {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubDetails