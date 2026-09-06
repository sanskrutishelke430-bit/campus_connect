import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { events } from '../data/events.js'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)) // Sept 2026
  const [selectedDate, setSelectedDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const eventDates = new Set(events.map((e) => e.date))

  function formatDateStr(day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const selectedEvents = selectedDate ? events.filter((e) => e.date === selectedDate) : []

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  function changeMonth(delta) {
    setCurrentDate(new Date(year, month + delta, 1))
    setSelectedDate(null)
  }

  const blanks = Array.from({ length: firstDay })
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-10 pt-4 md:px-12 lg:px-16">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">Campus Calendar</h1>
          <p className="mt-2 text-white/60">Explore events by date</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-12 lg:px-16">
        {/* Calendar Grid */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <button onClick={() => changeMonth(-1)} className="rounded-lg p-2 hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-heading text-lg font-bold text-brand">{monthName}</h2>
            <button onClick={() => changeMonth(1)} className="rounded-lg p-2 hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {blanks.map((_, i) => (
              <div key={`b-${i}`} />
            ))}
            {days.map((day) => {
              const dateStr = formatDateStr(day)
              const hasEvent = eventDates.has(dateStr)
              const isSelected = selectedDate === dateStr

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative aspect-square rounded-xl text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-coral text-white'
                      : hasEvent
                      ? 'bg-coral/10 text-coral hover:bg-coral/20'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {day}
                  {hasEvent && !isSelected && (
                    <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-coral" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Day Events */}
        <div className="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 font-heading text-lg font-bold text-brand">
            {selectedDate ? new Date(selectedDate).toDateString() : 'Select a date'}
          </h2>
          {selectedEvents.length > 0 ? (
            <div className="flex flex-col gap-3">
              {selectedEvents.map((e) => (
                <Link
                  key={e.id}
                  to={`/events/${e.id}`}
                  className="rounded-xl p-3 transition-colors hover:bg-gray-50"
                  style={{ backgroundColor: `${e.color}10` }}
                >
                  <p className="font-heading font-bold text-brand">{e.title}</p>
                  <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {e.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {e.venue}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              {selectedDate ? 'No events on this day.' : 'Click a highlighted date to see events.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Calendar