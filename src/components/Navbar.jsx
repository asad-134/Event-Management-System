import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/events">Events</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/my-events">My Events</Link>
    </nav>
  )
}