import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import CampusPulse from '../components/CampusPulse.jsx'

function Home() {
  return (
    <div className="min-h-screen bg-brand">
      <Navbar />

      <div className="flex flex-col justify-between px-6 pb-10 pt-8 sm:pb-12 md:px-12 md:pb-16 lg:px-16" style={{ minHeight: 'calc(100vh - 88px)' }}>
        {/* Top: Badge + Heading */}
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/90 sm:mb-6 sm:text-sm"
          >
            🎓 MIT Academy of Engineering
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            What's happening<br />
            at <span className="text-coral">MITAOE</span>,<br />
            right now.
          </motion.h1>
        </div>

        {/* Bottom: Description + CTA + Campus Pulse */}
        <div className="mt-10">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            className="mb-5 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg"
          >
            One platform for every club, every event, every moment happening across campus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            className="mb-10"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              Explore Events <ArrowRight size={16} />
            </Link>
          </motion.div>

          <CampusPulse />
        </div>
      </div>
    </div>
  )
}

export default Home