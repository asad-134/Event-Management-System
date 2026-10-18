import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { loginUser, clearAuthError } from '../features/auth/authSlice.js'

export default function Login() {
  const dispatch = useDispatch()
  const location = useLocation()
  const error = useSelector((state) => state.auth.error)
  const currentUser = useSelector((state) => state.auth.currentUser)

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((previous) => ({ ...previous, [name]: value }))
    if (error) dispatch(clearAuthError())
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.email.trim() || !form.password) {
      alert('Please fill in all fields')
      return
    }

    dispatch(loginUser(form))
  }

  if (currentUser) {
    return <Navigate to="/events" replace />
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        {location.state?.message && <p role="status">{location.state.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p role="alert">{error}</p>}
        <button type="submit">Sign In</button>
      </form>

      <Link to="/register">Create an account</Link>
    </>
  )
}
