import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("tech51_user")
    const savedDarkMode = localStorage.getItem("tech51_darkMode")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setCurrentUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error al cargar el usuario:", error)
      }
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("tech51_darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const login = async (email, password) => {
    try {
      // Simulación de login
      if (email === "usuario@ejemplo.com" && password === "password123") {
        const user = {
          id: "1",
          name: "Usuario Demo",
          email: email,
          role: "user",
          isSubscriber: false,
        }
        setCurrentUser(user)
        setIsAuthenticated(true)
        localStorage.setItem("tech51_user", JSON.stringify(user))
        return { success: true }
      } else if (email === "admin@tech51.com" && password === "admin123") {
        const user = {
          id: "2",
          name: "Administrador",
          email: email,
          role: "admin",
          isSubscriber: true,
        }
        setCurrentUser(user)
        setIsAuthenticated(true)
        localStorage.setItem("tech51_user", JSON.stringify(user))
        return { success: true }
      } else {
        return {
          success: false,
          error: "Credenciales incorrectas. Intenta con usuario@ejemplo.com / password123",
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password) => {
    try {
      // Simulación de registro
      const user = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
        isSubscriber: false,
      }
      setCurrentUser(user)
      setIsAuthenticated(true)
      localStorage.setItem("tech51_user", JSON.stringify(user))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("tech51_user")
  }

  const isAdmin = () => {
    return currentUser?.role === "admin"
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        isAdmin,
        login,
        register,
        logout,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

