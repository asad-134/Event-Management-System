import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchEventById } from '../features/events/eventsSlice.js'
import { addRegistration } from '../features/registrations/registrationsSlice.js'

export default function EventDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedEvent, detailStatus, error } = useSelector((state) => state.events)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const registrations = useSelector((state) => state.registrations.items)
  const [message, setMessage] = useState('')
  const alreadyRegistered = !!currentUser && registrations.some(
    (item) => item.userId === currentUser.id && item.eventId === id
  )

  useEffect(() => {
    if (!id) return
    const request = dispatch(fetchEventById(id))
    return () => request.abort()
  }, [dispatch, id])

  useEffect(() => {
    setMessage('')
  }, [id, currentUser?.id])

  if (
    detailStatus === 'idle'
    || detailStatus === 'loading'
    || (detailStatus === 'succeeded' && selectedEvent?.id !== id)
  ) {
    return <p>Loading event details...</p>
  }
  if (detailStatus === 'failed') {
    return <p role="alert">{error || 'Could not load event'}</p>
  }
  if (!selectedEvent) {
    return <p>Event not found</p>
  }

  const imageUrl = selectedEvent.images?.find((image) => image.ratio === '16_9')?.url
    ?? selectedEvent.images?.[0]?.url
  const start = selectedEvent.dates?.start
  const venue = selectedEvent._embedded?.venues?.[0]
  const category = selectedEvent.classifications?.[0]?.segment?.name
    ?? selectedEvent.classifications?.[0]?.genre?.name

  function handleRegister() {
    if (!currentUser) {
      navigate('/login', { state: { message: 'Please log in' } })
      return
    }
    if (alreadyRegistered) {
      setMessage('Already registered')
      return
    }

    dispatch(addRegistration({
      userId: currentUser.id,
      eventId: selectedEvent.id,
      name: selectedEvent.name,
      date: start?.localDate ?? '',
      time: start?.localTime ?? '',
      venue: venue?.name ?? '',
      image: imageUrl ?? '',
    }))
    setMessage('Registration successful')
  }

  return (
    <main className="event-details">
      <h1>{selectedEvent.name}</h1>
      {imageUrl && <img src={imageUrl} alt="" />}
      <p>Date: {start?.localDate || 'Not available'}</p>
      <p>Time: {start?.localTime || 'Not available'}</p>
      <p>Venue: {venue?.name || 'Not available'}</p>
      <p>City: {venue?.city?.name || 'Not available'}</p>
      <p>Category: {category || 'Not available'}</p>
      {selectedEvent.info && <p>{selectedEvent.info}</p>}
      <button type="button" onClick={handleRegister} disabled={alreadyRegistered}>
        {alreadyRegistered ? 'Already Registered' : 'Register for Event'}
      </button>
      {message && <p role="status">{message}</p>}
    </main>
  )
}
