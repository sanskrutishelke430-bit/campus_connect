import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const { loginWithToken } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Signup failed')
        return
      }
      loginWithToken(data.token, data.user)
      navigate(data.user.role === 'student' ? '/dashboard' : '/admin')
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
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
          <h1 className="font-heading text-2xl font-bold text-brand">Create account</h1>
          <p className="mt-1 mb-6 text-sm text-gray-500">Join ClubConnect MITAOE</p>

          {error && <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

          <label className="mb-1 block text-xs font-semibold text-gray-500">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mb-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-coral" />

          <label className="mb-1 block text-xs font-semibold text-gray-500">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-coral" />

          <label className="mb-1 block text-xs font-semibold text-gray-500">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-coral" />

          <label className="mb-1 block text-xs font-semibold text-gray-500">I am a</label>
          <div className="mb-6 flex gap-3">
            <button type="button" onClick={() => setRole('student')} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${role === 'student' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'}`}>Student</button>
            <button type="button" onClick={() => setRole('admin')} className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors ${role === 'admin' ? 'bg-coral text-white' : 'bg-gray-100 text-gray-500'}`}>Club Admin</button>
          </div>

          <button type="submit" className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
            Sign Up
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Already have an account? <Link to="/login" className="font-semibold text-coral">Login</Link>
          </p>
        </motion.form>
      </div>
    </div>
  )
}

export default Signup