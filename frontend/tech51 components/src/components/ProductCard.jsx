import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Heart, Star } from "lucide-react"
import { useCart } from "./context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // Aquí iría la lógica para añadir/quitar de la lista de deseos
  }

  // Calcular precio con descuento si existe
  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <div className="card overflow-hidden group h-full flex flex-col">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NUEVO</span>}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{product.discount}% OFF</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({Math.floor(Math.random() * 100) + 5})</span>
        </div>

        <Link to={`/product/${product.id}`} className="block flex-grow">
          <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        </Link>

        <div className="mt-auto">
          <div className="flex items-center justify-between mt-2">
            <div>
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold">${finalPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary p-2 rounded-full"
              aria-label="Añadir al carrito"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard