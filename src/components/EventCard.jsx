import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  const imageUrl = event.images?.find((image) => image.ratio === '16_9')?.url
    ?? event.images?.[0]?.url
  const date = event.dates?.start?.localDate
  const venue = event._embedded?.venues?.[0]
  const location = [venue?.name, venue?.city?.name].filter(Boolean).join(', ')

  return (
    <article className="event-card">
      {imageUrl && <img src={imageUrl} alt="" loading="lazy" />}
      <div className="event-card-content">
        <h2>{event.name}</h2>
        <p>Date: {date || 'Not available'}</p>
        {location && <p>{location}</p>}
        <Link to={`/events/${event.id}`}>View Details</Link>
      </div>
    </article>
  )
}
