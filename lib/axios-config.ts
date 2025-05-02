import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: "/api", // This would be your real API base URL in production
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // You would typically get this from localStorage or a cookie in a real app
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like 401, 403, 500, etc.
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("auth_token")
        // Redirect to login page or show a notification
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error:", error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message)
    }
    return Promise.reject(error)
  },
)

export default api
