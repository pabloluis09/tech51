import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import LandingPage from "./components/pages/LandingPage"
import Shop from "./components/pages/Shop"
import ProductDetail from "./components/pages/ProductDetail"
import Cart from "./components/pages/Cart"
// import Checkout from "./components/pages/Checkout"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Profile from "./components/pages/Profile"
import Giveaways from "./components/pages/Giveaways"
// import Subscriptions from "./components/pages/Subscriptions"
import Dashboard from "./components/pages/Dashboard"
import NotFound from "./components/pages/NotFound"
import { AuthProvider } from "./components/context/AuthContext"
import { CartProvider } from "./components/context/CartContext"
import ProtectedRoute from "./components/ProtectedRoute"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulación de carga inicial
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-500 mb-4">Tech51</h1>
          <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <NavBar />
            <ScrollToTop />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      {/* <Checkout /> */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/giveaways"
                  element={
                    <ProtectedRoute>
                      <Giveaways />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscriptions"
                  element={
                    <ProtectedRoute>
                      {/* <Subscriptions /> */}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

