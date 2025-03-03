import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft, MessageCircle } from "lucide-react"
import { useCart } from "../context/CartContext"
import ChatAssistant from "../ChatAssistant"

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    // Simulación de carga de datos desde la API
    setTimeout(() => {
      // Datos de ejemplo para el producto
      const mockProduct = {
        id,
        name: `Smartphone Tech51 Pro ${id}`,
        description:
          "El smartphone más avanzado de nuestra línea, con características premium y rendimiento excepcional para los usuarios más exigentes.",
        price: 1299.99,
        discount: 10,
        rating: 4.5,
        reviewCount: 127,
        stock: 15,
        category: "Smartphones",
        images: [
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600",
          "/placeholder.svg?height=600&width=600",
        ],
        features: [
          "Pantalla AMOLED de 6.7 pulgadas",
          "Procesador octa-core de última generación",
          "Cámara principal de 108MP con estabilización óptica",
          "Batería de 5000mAh con carga rápida de 65W",
          "Resistencia al agua y polvo IP68",
          "256GB de almacenamiento interno expandible",
        ],
        specifications: {
          Procesador: "Octa-core 3.0GHz",
          RAM: "12GB LPDDR5",
          Almacenamiento: "256GB UFS 3.1",
          Pantalla: 'AMOLED 6.7" 120Hz',
          Resolución: "2400 x 1080 px",
          Batería: "5000mAh",
          "Sistema Operativo": "Android 13",
          Dimensiones: "162.3 x 74.6 x 8.2 mm",
          Peso: "198g",
        },
        relatedProducts: [
          {
            id: "5",
            name: "Auriculares Inalámbricos Tech51",
            price: 149.99,
            image: "/placeholder.svg?height=300&width=300",
          },
          {
            id: "6",
            name: "Cargador Rápido 65W",
            price: 39.99,
            image: "/placeholder.svg?height=300&width=300",
          },
          {
            id: "7",
            name: "Funda Protectora Premium",
            price: 29.99,
            image: "/placeholder.svg?height=300&width=300",
          },
        ],
      }

      setProduct(mockProduct)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
      })
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // Aquí iría la lógica para añadir/quitar de la lista de deseos
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= product.stock) {
      setQuantity(value)
    }
  }

  // Calcular precio con descuento si existe
  const finalPrice = product?.discount ? product.price * (1 - product.discount / 100) : product?.price

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a la tienda
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Galería de imágenes */}
        <div>
          <div className="mb-4 border rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`border rounded-md overflow-hidden cursor-pointer ${selectedImage === index ? "ring-2 ring-blue-600" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Vista ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                {product.rating % 1 > 0 && (
                  <Star
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    style={{ clipPath: `inset(0 ${100 - (product.rating % 1) * 100}% 0 0)` }}
                  />
                )}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {product.rating} ({product.reviewCount} reseñas)
              </span>
            </div>

            <div className="mb-4">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-blue-600">${finalPrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through ml-3">${product.price.toFixed(2)}</span>
                  <span className="ml-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Truck className="w-5 h-5 mr-2 text-green-600" />
                Envío gratis a todo el país
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Garantía de 12 meses
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 mr-4">Cantidad:</span>
                <div className="flex items-center">
                  <button
                    className="btn btn-outline p-1 rounded-l-md"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border-y py-1"
                  />
                  <button
                    className="btn btn-outline p-1 rounded-r-md"
                    onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500 ml-4">{product.stock} disponibles</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary py-3 px-6 flex-grow flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Añadir al carrito
              </button>
              <button onClick={toggleWishlist} className="btn btn-outline py-3 px-6">
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "Guardado" : "Guardar"}
              </button>
              <button
                className="btn btn-outline py-3 px-4"
                onClick={() => {
                  navigator
                    .share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href,
                    })
                    .catch((err) => console.error("Error al compartir:", err))
                }}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowChat(!showChat)}
              className="btn btn-secondary py-2 px-4 w-full flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {showChat ? "Cerrar asistente" : "¿Tienes dudas? Pregunta a nuestro asistente"}
            </button>

            {showChat && (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <ChatAssistant productName={product.name} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Características y especificaciones */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Características principales</h2>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Especificaciones técnicas</h2>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div key={index} className="grid grid-cols-2 py-2 border-b last:border-b-0">
                <span className="font-medium text-gray-700">{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="card overflow-hidden group">
              <Link to={`/product/${relatedProduct.id}`}>
                <img
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${relatedProduct.id}`}>
                  <h3 className="font-semibold hover:text-blue-600 transition-colors">{relatedProduct.name}</h3>
                </Link>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart({ ...relatedProduct, quantity: 1 })}
                    className="btn btn-outline p-2 rounded-full"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

