import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      // Aquí iría la llamada a tu API
      const response = await fetch("/api/orders")
      const data = await response.json()
      setOrders(data)
      setIsLoading(false)
    } catch (err) {
      setError("Error al cargar órdenes")
      setIsLoading(false)
    }
  }

  const handleApproveOrder = (orderId) => {
    // Implementar lógica para aprobar orden
  }

  const handleDenyOrder = (orderId) => {
    // Implementar lógica para denegar orden
  }

  if (isLoading) return <div>Cargando órdenes...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Órdenes</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Usuario</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.user.name}</td>
              <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleApproveOrder(order.id)} className="text-green-500 mr-2">
                  <Check />
                </button>
                <button onClick={() => handleDenyOrder(order.id)} className="text-red-500">
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

export default OrderManagement