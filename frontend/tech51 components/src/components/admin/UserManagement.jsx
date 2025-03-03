import { useState, useEffect } from "react"
import { Plus, Edit, Trash } from "lucide-react"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Aquí iría la llamada a tu API
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
      setIsLoading(false)
    } catch (err) {
      setError("Error al cargar usuarios")
      setIsLoading(false)
    }
  }

  const handleAddUser = () => {
    // Implementar lógica para agregar usuario
  }

  const handleEditUser = (userId) => {
    // Implementar lógica para editar usuario
  }

  const handleDeleteUser = (userId) => {
    // Implementar lógica para eliminar usuario
  }

  if (isLoading) return <div>Cargando usuarios...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2" /> Agregar Usuario
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Rol</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEditUser(user.id)} className="text-blue-500 mr-2">
                  <Edit />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-500">
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement