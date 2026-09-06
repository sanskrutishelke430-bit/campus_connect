import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('student')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    login(name, role)
    navigate(role === 'student' ? '/dashboard' : '/admin')
  }

  return (
    <div className="min-h-screen bg-brand">
      <Navbar />
      <div className="flex justify-center px-6 py-16">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg"
        >
          <h1 className="font-heading text-2xl font-bold text-brand">Welcome back</h1>
          <p className="mt-1 mb-6 text-sm text-gray-500">Login to ClubConnect MITAOE</p>

          <label className="mb-1 block text-xs font-semibold text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="mb-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-coral"
          />

          <label className="mb-1 block text-xs font-semibold text-gray-500">Login as</label>
          <div className="mb-6 flex gap-3">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                role === 'student' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                role === 'admin' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              Club Admin
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Login
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default Login