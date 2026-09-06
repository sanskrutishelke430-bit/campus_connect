import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import EventCard from '../components/EventCard.jsx'
import { events, categories } from '../data/events.js'

function Events() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-10 pt-4 md:px-12 lg:px-16">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Upcoming Events
          </h1>
          <p className="mt-2 text-white/60">
            {events.length} events happening across campus
          </p>
        </div>
      </div>

      <div className="px-6 py-8 md:px-12 lg:px-16">
        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-md rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-coral"
        />

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-coral text-white'
                  : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
          {filteredEvents.length === 0 && (
            <p className="text-gray-400">No events match your search.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events