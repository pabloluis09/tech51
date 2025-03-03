import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Giveaways() {
  const [giveaways, setGiveaways] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { user, isSubscriber } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchGiveaways()
  }, [])

  const fetchGiveaways = async () => {
    try {
      const response = await fetch("/api/lottery/active")
      const data = await response.json()
      setGiveaways(data)
    } catch (err) {
      setError("Failed to load giveaways")
    } finally {
      setIsLoading(false)
    }
  }

  const handleParticipate = async (giveawayId) => {
    try {
      const response = await fetch(`/api/lottery/${giveawayId}/participate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to participate")
      }

      // Refresh giveaways list
      fetchGiveaways()
    } catch (err) {
      setError(err.message || "Failed to participate in giveaway")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isSubscriber) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Participate</h2>
          <p className="text-lg text-gray-600 mb-8">
            Become a subscriber to participate in exclusive giveaways and win amazing prizes!
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Active Giveaways</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">{error}</div>
      )}

      {giveaways.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No active giveaways at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {giveaways.map((giveaway) => (
            <div key={giveaway._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {giveaway.image && (
                <img
                  src={giveaway.image || "/placeholder.svg"}
                  alt={giveaway.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{giveaway.name}</h3>
                <p className="text-gray-600 mb-4">{giveaway.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Ends on: {new Date(giveaway.endDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">Participants: {giveaway.participantsCount}</p>
                  </div>
                  <button
                    onClick={() => handleParticipate(giveaway._id)}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                  >
                    Participate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

