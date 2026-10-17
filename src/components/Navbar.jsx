import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice.js'

export default function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/events">Events</Link>

      {currentUser ? (
        <>
          <span>{currentUser.name}</span>
          <Link to="/my-events">My Events</Link>
          <button type="button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}
