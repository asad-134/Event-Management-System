import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cancelRegistration } from '../features/registrations/registrationsSlice.js'

function todayLocalISO() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function RegistrationCard({ registration, onCancel }) {
  return (
    <article className="event-card">
      {registration.image && <img src={registration.image} alt="" loading="lazy" />}
      <div className="event-card-content">
        <h3>{registration.name}</h3>
        <p>Date: {registration.date || 'Not available'}</p>
        {registration.time && <p>Time: {registration.time}</p>}
        <p>Venue: {registration.venue || 'Not available'}</p>
        <Link to={`/events/${registration.eventId}`}>View Details</Link>
        {onCancel && (
          <button type="button" onClick={() => onCancel(registration.eventId)}>
            Cancel Registration
          </button>
        )}
      </div>
    </article>
  )
}

function RegistrationSection({ title, registrations, onCancel }) {
  return (
    <section>
      <h2>{title} ({registrations.length})</h2>
      {registrations.length === 0 ? (
        <p>No {title.toLowerCase()} events.</p>
      ) : (
        <div className="event-grid">
          {registrations.map((registration) => (
            <RegistrationCard
              key={registration.eventId}
              registration={registration}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default function MyEvents() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currentUser)
  const registrations = useSelector((state) => state.registrations.items)
  const [message, setMessage] = useState('')

  const myEvents = registrations.filter(
    (registration) => registration.userId === currentUser?.id
  )
  const today = todayLocalISO()
  const upcoming = myEvents.filter((event) => event.date && event.date >= today)
  const completed = myEvents.filter((event) => event.date && event.date < today)
  const unknownDate = myEvents.filter((event) => !event.date)

  function handleCancel(eventId) {
    dispatch(cancelRegistration({ userId: currentUser.id, eventId }))
    setMessage('Registration cancelled')
  }

  return (
    <main className="my-events">
      <h1>My Events</h1>
      {message && <p role="status">{message}</p>}
      <RegistrationSection title="Upcoming" registrations={upcoming} onCancel={handleCancel} />
      <RegistrationSection title="Completed" registrations={completed} />
      {unknownDate.length > 0 && (
        <RegistrationSection
          title="Unknown date"
          registrations={unknownDate}
          onCancel={handleCancel}
        />
      )}
    </main>
  )
}
