import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter } from "lucide-react"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  useEffect(() => {
    // Simulated API call to fetch products
    const fetchedProducts = [
      {
        id: "1",
        name: "Tech51 Pro Laptop",
        price: 1999.99,
        category: "Laptops",
        image:
          "https://img.freepik.com/free-photo/person-working-html-computer_23-2150038840.jpg?w=1380&t=st=1688486343~exp=1688486943~hmac=2a2f5c9e7c6f1b0f6f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f",
      },
      {
        id: "2",
        name: "4K Streaming Camera",
        price: 299.99,
        category: "Cameras",
        image:
          "https://img.freepik.com/free-photo/professional-camera-blurred-background_169016-10249.jpg?w=1380&t=st=1688486391~exp=1688486991~hmac=3a3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f",
      },
      {
        id: "3",
        name: "Wireless Gaming Headset",
        price: 149.99,
        category: "Audio",
        image:
          "https://img.freepik.com/free-photo/wireless-headphones-levitating-white-background_1419-2214.jpg?w=1380&t=st=1688486425~exp=1688487025~hmac=4a4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f",
      },
      {
        id: "4",
        name: "Ultra-Wide Monitor",
        price: 699.99,
        category: "Monitors",
        image:
          "https://img.freepik.com/free-photo/computer-screens-desk-office-room-night_158595-5205.jpg?w=1380&t=st=1688486631~exp=1688487231~hmac=6a6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f",
      },
      {
        id: "5",
        name: "Mechanical Keyboard",
        price: 129.99,
        category: "Accessories",
        image:
          "https://img.freepik.com/free-photo/high-angle-shot-black-keyboard-with-backlight_181624-24407.jpg?w=1380&t=st=1688486667~exp=1688487267~hmac=7a7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f",
      },
      {
        id: "6",
        name: "Ergonomic Mouse",
        price: 79.99,
        category: "Accessories",
        image:
          "https://img.freepik.com/free-photo/wireless-mouse-with-mousepad_23-2150695873.jpg?w=1380&t=st=1688486699~exp=1688487299~hmac=8a8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f",
      },
    ]
    setProducts(fetchedProducts)
    setFilteredProducts(fetchedProducts)
  }, [])

  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "all" || product.category === category),
    )
    setFilteredProducts(results)
  }, [searchTerm, category, products])

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tech51 Shop</h1>

        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-purple-500 px-4 py-2 rounded-r-md">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Laptops">Laptops</option>
              <option value="Cameras">Cameras</option>
              <option value="Audio">Audio</option>
              <option value="Monitors">Monitors</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-purple-500 font-bold mb-4">${product.price.toFixed(2)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full font-bold hover:bg-purple-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop

