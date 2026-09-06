import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Clubs', to: '/clubs' },
    { name: 'Events', to: '/events' },
    { name: 'Calendar', to: '/calendar' },
  ]

  return (
    <>
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left: Logo + Desktop Links */}
        <div className="flex items-center gap-10">
          <span className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
            ClubConnect <span className="text-gold">MITAOE</span>
          </span>

          <div className="hidden md:flex md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="rounded-lg bg-coral px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Login
          </Link>
        </div>

        {/* Right: Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center active:scale-90 md:hidden"
        >
          <Menu
            className={`absolute text-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute text-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-brand/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'h-screen opacity-100' : 'pointer-events-none h-0 opacity-0'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-3xl font-medium text-white/90 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 w-fit rounded-full bg-coral px-8 py-3.5 text-base font-medium text-white hover:scale-105"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar