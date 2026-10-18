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
  const [searchDraft, setSearchDraft] = useState({ keyword, value: keyword })
  const searchInput = searchDraft.keyword === keyword ? searchDraft.value : keyword
  const { items, status, error } = useSelector((state) => state.events)

  useEffect(() => {
    const request = dispatch(fetchEvents({ keyword, category }))
    return () => request.abort()
  }, [dispatch, keyword, category])

  function handleSearch(e) {
    e.preventDefault()
    const trimmedKeyword = searchInput.trim()
    const nextParams = new URLSearchParams(window.location.search)
    if (trimmedKeyword) {
      nextParams.set('keyword', trimmedKeyword)
    } else {
      nextParams.delete('keyword')
    }
    setSearchParams(nextParams)
  }

  function handleCategoryChange(e) {
    const selectedCategory = e.target.value
    const nextParams = new URLSearchParams(window.location.search)
    if (selectedCategory) {
      nextParams.set('category', selectedCategory)
    } else {
      nextParams.delete('category')
    }
    setSearchParams(nextParams)
  }

  return (
    <main className="events-page">
      <h1>Events</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="keyword">Search events</label>
        <input
          id="keyword"
          name="keyword"
          value={searchInput}
          onChange={(e) => setSearchDraft({ keyword, value: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>

      <div className="category-filter">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Arts & Theatre">Arts &amp; Theatre</option>
        </select>
      </div>

      {status === 'loading' && <p role="status">Loading events...</p>}
      {status === 'failed' && <p role="alert">{error || 'Could not load events'}</p>}
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
