import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard.jsx'
import { fetchEvents } from '../features/events/eventsSlice.js'

export default function Events() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  const category = searchParams.get('category') || ''
  const [searchInput, setSearchInput] = useState(keyword)
  const { items, status, error } = useSelector((state) => state.events)

  useEffect(() => {
    setSearchInput(keyword)
  }, [keyword])

  useEffect(() => {
    const request = dispatch(fetchEvents({ keyword, category }))
    return () => request.abort()
  }, [dispatch, keyword, category])

  function handleSearch(e) {
    e.preventDefault()
    const nextParams = new URLSearchParams(searchParams)
    const trimmedKeyword = searchInput.trim()

    if (trimmedKeyword) {
      nextParams.set('keyword', trimmedKeyword)
    } else {
      nextParams.delete('keyword')
    }
    setSearchParams(nextParams)
  }

  function handleCategoryChange(e) {
    const nextParams = new URLSearchParams(searchParams)
    if (e.target.value) {
      nextParams.set('category', e.target.value)
    } else {
      nextParams.delete('category')
    }
    setSearchParams(nextParams)
  }

  return (
    <main>
      <h1>Events</h1>

      <form onSubmit={handleSearch}>
        <label htmlFor="keyword">Search events</label>
        <input
          id="keyword"
          name="keyword"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <label htmlFor="category">Category</label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option value="">All categories</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Arts & Theatre">Arts &amp; Theatre</option>
      </select>

      {status === 'loading' && <p>Loading events...</p>}
      {status === 'failed' && <p role="alert">{error}</p>}
      {status === 'succeeded' && (
        items.length === 0 ? (
          <p>No events found</p>
        ) : (
          <div className="event-grid">
            {items.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        )
      )}
    </main>
  )
}
