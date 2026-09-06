import Navbar from '../components/Navbar.jsx'
import ClubCard from '../components/ClubCard.jsx'
import { clubs } from '../data/clubs.js'

function Clubs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand">
        <Navbar />
        <div className="px-6 pb-10 pt-4 md:px-12 lg:px-16">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Club Universe
          </h1>
          <p className="mt-2 text-white/60">
            {clubs.length} communities shaping campus life at MITAOE
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-16">
        {clubs.map((club, index) => (
          <ClubCard key={club.id} club={club} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Clubs