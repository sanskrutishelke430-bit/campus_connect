import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'

function ClubCard({ club, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link
        to={`/clubs/${club.id}`}
        className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          className="flex h-24 items-center justify-center text-4xl"
          style={{ backgroundColor: `${club.color}20` }}
        >
          {club.logo}
        </div>
        <div className="p-5">
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${club.color}20`, color: club.color }}
          >
            {club.category}
          </span>
          <h3 className="font-heading text-lg font-bold text-brand">{club.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{club.shortDescription}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
            <Users size={14} />
            {club.members} members
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ClubCard