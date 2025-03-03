import { useState, useEffect } from "react"
import { Plus, Edit, Trash } from "lucide-react"

const ProductManagement = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // Aquí iría la llamada a tu API
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
      setIsLoading(false)
    } catch (err) {
      setError("Error al cargar productos")
      setIsLoading(false)
    }
  }

  const handleAddProduct = () => {
    // Implementar lógica para agregar producto
  }

  const handleEditProduct = (productId) => {
    // Implementar lógica para editar producto
  }

  const handleDeleteProduct = (productId) => {
    // Implementar lógica para eliminar producto
  }

  if (isLoading) return <div>Cargando productos...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        <button onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="mr-2" /> Agregar Producto
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{product.stock}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEditProduct(product.id)} className="text-blue-500 mr-2">
                  <Edit />
                </button>
                <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500">
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

export default ProductManagement