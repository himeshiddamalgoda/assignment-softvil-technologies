// "use client"

// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"

// interface User {
//   id: string
//   name: string
//   email: string
//   avatarUrl?: string
//   hostedEvents?: string[]
//   attendingEvents?: string[]
// }

// interface UserContextType {
//   user: User | null
//   loading: boolean
//   error: Error | null
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
//   updateUser: (userData: Partial<User>) => Promise<void>
// }

// const UserContext = createContext<UserContextType | undefined>(undefined)

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error | null>(null)

//   useEffect(() => {
//     // Simulate fetching user data
//     const fetchUser = async () => {
//       try {
//         setLoading(true)
//         // In a real app, you would fetch from your API
//         // For now, we'll use mock data
//         setTimeout(() => {
//           setUser({
//             id: "user-1",
//             name: "John Doe",
//             email: "john@example.com",
//             avatarUrl: "/placeholder.svg?height=40&width=40",
//             hostedEvents: ["event-1", "event-2"],
//             attendingEvents: ["event-3", "event-4"],
//           })
//           setLoading(false)
//         }, 1000)
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error("Failed to fetch user"))
//         setLoading(false)
//       }
//     }

//     fetchUser()
//   }, [])

//   const login = async (email: string, ) => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Mock successful login
//       setUser({
//         id: "user-1",
//         name: "John Doe",
//         email,
//         avatarUrl: "/placeholder.svg?height=40&width=40",
//         hostedEvents: ["event-1", "event-2"],
//         attendingEvents: ["event-3", "event-4"],
//       })

//       setLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Login failed"))
//       setLoading(false)
//       throw err
//     }
//   }

//   const logout = () => {
//     setUser(null)
//   }

//   const updateUser = async (userData: Partial<User>) => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Update user data
//       setUser((prev) => (prev ? { ...prev, ...userData } : null))

//       setLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to update user"))
//       setLoading(false)
//       throw err
//     }
//   }

//   return (
//     <UserContext.Provider value={{ user, loading, error, login, logout, updateUser }}>{children}</UserContext.Provider>
//   )
// }

// export function useUser() {
//   const context = useContext(UserContext)
//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider")
//   }
//   return context
// }
