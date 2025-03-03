"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, ShoppingCart, User, Search } from "lucide-react"
import { useAuth } from "./context/AuthContext"
import { useCart } from "./context/CartContext"

const NavBar = () => {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth()
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-purple-500">Tech51</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            <Link to="/shop" className="hover:text-purple-500 transition-colors">
              Shop
            </Link>
            <Link to="/subscriptions" className="hover:text-purple-500 transition-colors">
              Subscriptions
            </Link>
            <Link to="/giveaways" className="hover:text-purple-500 transition-colors">
              Giveaways
            </Link>
            {isAdmin() && (
              <Link to="/dashboard" className="hover:text-purple-500 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hover:text-purple-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="hover:text-purple-500 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="hover:text-purple-500 transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-700">
                    Profile
                  </Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-purple-500 transition-colors">
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-purple-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="px-2 pt-2 pb-4 space-y-1">
            <Link to="/shop" className="block px-3 py-2 hover:bg-gray-700 rounded-md">
              Shop
            </Link>
            <Link to="/subscriptions" className="block px-3 py-2 hover:bg-gray-700 rounded-md">
              Subscriptions
            </Link>
            <Link to="/giveaways" className="block px-3 py-2 hover:bg-gray-700 rounded-md">
              Giveaways
            </Link>
            {isAdmin() && (
              <Link to="/dashboard" className="block px-3 py-2 hover:bg-gray-700 rounded-md">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default NavBar