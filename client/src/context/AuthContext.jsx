import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  getCurrentUser,
  logoutUser,
} from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const data = await getCurrentUser()

      if (data.success && data.user) {
        setUser(data.user)
        return data.user
      }

      setUser(null)
      return null
    } catch {
      setUser(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } finally {
      setUser(null)
    }
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    refreshUser,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
