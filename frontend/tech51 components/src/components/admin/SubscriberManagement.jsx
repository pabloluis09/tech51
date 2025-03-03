import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"

const SubscriberManagement = () => {
  const [subscribers, setSubscribers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      // Aquí iría la llamada a tu API
      const response = await fetch("/api/subscribers")
      const data = await response.json()
      setSubscribers(data)
      setIsLoading(false)
    } catch (err) {
      setError("Error al cargar suscriptores")
      setIsLoading(false)
    }
  }

  const handleApproveSubscriber = (subscriberId) => {
    // Implementar lógica para aprobar suscriptor
  }

  const handleDenySubscriber = (subscriberId) => {
    // Implementar lógica para denegar suscriptor
  }

  if (isLoading) return <div>Cargando suscriptores...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Suscriptores</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td className="py-2 px-4 border-b">{subscriber.id}</td>
              <td className="py-2 px-4 border-b">{subscriber.name}</td>
              <td className="py-2 px-4 border-b">{subscriber.email}</td>
              <td className="py-2 px-4 border-b">{subscriber.status}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleApproveSubscriber(subscriber.id)} className="text-green-500 mr-2">
                  <Check />
                </button>
                <button onClick={() => handleDenySubscriber(subscriber.id)} className="text-red-500">
                  <X />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriberManagement