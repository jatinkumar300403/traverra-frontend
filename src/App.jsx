import React, { useState } from 'react'

function App() {
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [activities, setActivities] = useState('')
  const [itinerary, setItinerary] = useState('')
  const [loading, setLoading] = useState(false)

  const generateItinerary = async () => {
    if (adults < 0 || children < 0) {
      alert("Number of adults and children cannot be less than 0.")
      return
    }
    const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
    setLoading(true)
    const res = await fetch(`${backendBaseUrl}/api/itinerary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination, days, adults, children, activities }),
    })
    const data = await res.json()
    setItinerary(data.itinerary)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          🧳 Traverra
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Number of Days"
            className="border border-gray-300 p-3 rounded-lg"
          />
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            placeholder="Number of Adults"
            className="border border-gray-300 p-3 rounded-lg"
            min="0"
          />
          <input
            type="number"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            placeholder="Number of Children"
            className="border border-gray-300 p-3 rounded-lg"
            min="0"
          />
          <input
            type="text"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            placeholder="Preferred Activities (e.g., hiking, museums)"
            className="md:col-span-2 border border-gray-300 p-3 rounded-lg"
          />
        </div>

        <button
          onClick={generateItinerary}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Generate Itinerary
        </button>

        {loading && (
          <p className="mt-4 text-center text-indigo-600 animate-pulse">
            Generating your itinerary...
          </p>
        )}

        {itinerary && (
          <div
            className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
            dangerouslySetInnerHTML={{ __html: itinerary }}
          />
        )}
      </div>
    </div>
  )
}

export default App
