import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")

  // Calcular subtotal
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
    return total + itemPrice * item.quantity
  }, 0)

  // Calcular impuestos (ejemplo: 21% IVA)
  const taxRate = 0.21
  const taxes = subtotal * taxRate

  // Calcular envío (gratis por encima de cierto monto)
  const shippingThreshold = 5000
  const baseShipping = 499
  const shipping = subtotal > shippingThreshold ? 0 : baseShipping

  // Calcular total
  const total = subtotal + taxes + shipping - discount

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id) => {
    removeFromCart(id)
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault()

    // Reiniciar mensajes
    setCouponError("")
    setCouponSuccess("")

    // Validar cupón (simulación)
    if (couponCode.toLowerCase() === "tech51") {
      // Aplicar descuento del 10%
      const discountAmount = subtotal * 0.1
      setDiscount(discountAmount)
      setCouponSuccess("¡Cupón aplicado correctamente! 10% de descuento.")
    } else if (couponCode.toLowerCase() === "enviogratis") {
      // Aplicar envío gratis si no lo es ya
      if (shipping > 0) {
        setDiscount(shipping)
        setCouponSuccess("¡Cupón aplicado correctamente! Envío gratis.")
      } else {
        setCouponError("El envío ya es gratis para tu pedido.")
      }
    } else {
      setCouponError("El cupón ingresado no es válido o ha expirado.")
    }

    setCouponCode("")
  }

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout")
    } else {
      navigate("/login", { state: { from: "/checkout" } })
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Parece que aún no has añadido productos a tu carrito.</p>
          <Link to="/shop" className="btn btn-primary py-3 px-6">
            Explorar productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold">Productos ({cart.length})</h2>
            </div>

            <div className="divide-y">
              {cart.map((item) => {
                const itemPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price

                return (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row">
                    <div className="sm:w-24 mb-4 sm:mb-0">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-full h-24 object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow sm:ml-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                        </div>
                        <div className="flex items-start">
                          <div className="text-right">
                            <div className="font-semibold">${(itemPrice * item.quantity).toFixed(2)}</div>
                            {item.discount > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <button
                            className="btn btn-outline p-1 rounded-l-md"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                            className="w-12 text-center border-y py-1"
                          />
                          <button
                            className="btn btn-outline p-1 rounded-r-md"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-4 border-t flex justify-between">
              <button onClick={() => clearCart()} className="text-red-500 hover:text-red-700 text-sm font-medium">
                Vaciar carrito
              </button>
              <Link to="/shop" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-24">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold">Resumen del pedido</h2>
            </div>

            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (21%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "Gratis"}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">Impuestos incluidos</div>
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="mb-4">
                <label htmlFor="coupon" className="block text-sm font-medium mb-2">
                  Cupón de descuento
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    placeholder="Ingresa tu código"
                    className="input rounded-r-none flex-grow"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline rounded-l-none border-l-0">
                    Aplicar
                  </button>
                </div>
                {couponError && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {couponError}
                  </div>
                )}
                {couponSuccess && <div className="text-green-600 text-sm mt-1">{couponSuccess}</div>}
              </form>

              <button onClick={handleCheckout} className="btn btn-primary w-full py-3 flex items-center justify-center">
                Proceder al pago
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <div className="mt-4 text-xs text-gray-500">
                <p>
                  Al realizar tu compra, aceptas nuestros{" "}
                  <a href="#" className="text-blue-600">
                    Términos y condiciones
                  </a>{" "}
                  y{" "}
                  <a href="#" className="text-blue-600">
                    Política de privacidad
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart