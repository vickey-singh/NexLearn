const API_BASE_URL = import.meta.env.PROD
  ? '/api'
  : `${import.meta.env.VITE_API_URL?.replace(/\/+$/, '')}/api`

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(
      data.message || 'Something went wrong. Please try again.'
    )

    error.status = response.status
    error.data = data

    throw error
  }

  return data
}

export const loginUser = async ({ email, password, role }) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  })
}

export const getCurrentUser = async () => {
  return apiRequest('/auth/me')
}

export const logoutUser = async () => {
  return apiRequest('/auth/logout', {
    method: 'POST',
  })
}