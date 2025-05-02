// "use client"

// import { mockEvents } from "@/utils/mockEvents"
// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"

// interface Attendee {
//   userId: string
//   userName: string
//   avatarUrl?: string
//   status: "confirmed" | "pending" | "cancelled"
// }

// interface Event {
//   id: string
//   title: string
//   description: string
//   location: string
//   startDate: string
//   endDate: string
//   hostId: string
//   hostName: string
//   imageUrl?: string
//   capacity: number
//   attendees: Attendee[]
//   createdAt: string
//   updatedAt: string
// }

// interface EventContextType {
//   events: Event[]
//   loading: boolean
//   error: Error | null
//   getEvent: (id: string) => Event | undefined
//   createEvent: (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">) => Promise<Event>
//   updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>
//   deleteEvent: (id: string) => Promise<void>
//   attendEvent: (eventId: string, userId: string) => Promise<void>
//   cancelAttendance: (eventId: string, userId: string) => Promise<void>
//   filterEvents: (filters: { hostId?: string; startDate?: string; endDate?: string }) => Event[]
// }

// const EventContext = createContext<EventContextType | undefined>(undefined)

// // Mock data
// const mmockEvents: Event[] = [
//   {
//     id: "event-1",
//     title: "Tech Conference 2023",
//     description: "Annual technology conference featuring the latest innovations",
//     location: "San Francisco, CA",
//     startDate: "2023-11-15T09:00:00Z",
//     endDate: "2023-11-17T18:00:00Z",
//     hostId: "user-1",
//     hostName: "John Doe",
//     imageUrl: "/placeholder.svg?height=200&width=400",
//     capacity: 500,
//     attendees: [
//       { userId: "user-2", userName: "Jane Smith", status: "confirmed" },
//       { userId: "user-3", userName: "Bob Johnson", status: "confirmed" },
//     ],
//     createdAt: "2023-08-01T12:00:00Z",
//     updatedAt: "2023-08-15T14:30:00Z",
//   },
//   {
//     id: "event-2",
//     title: "Design Workshop",
//     description: "Hands-on workshop for UX/UI designers",
//     location: "New York, NY",
//     startDate: "2023-12-05T10:00:00Z",
//     endDate: "2023-12-05T16:00:00Z",
//     hostId: "user-1",
//     hostName: "John Doe",
//     imageUrl: "/placeholder.svg?height=200&width=400",
//     capacity: 50,
//     attendees: [{ userId: "user-4", userName: "Alice Williams", status: "confirmed" }],
//     createdAt: "2023-09-10T09:15:00Z",
//     updatedAt: "2023-09-10T09:15:00Z",
//   },
//   {
//     id: "event-3",
//     title: "Networking Mixer",
//     description: "Evening networking event for professionals",
//     location: "Chicago, IL",
//     startDate: "2023-11-20T18:00:00Z",
//     endDate: "2023-11-20T21:00:00Z",
//     hostId: "user-5",
//     hostName: "Sarah Miller",
//     imageUrl: "/placeholder.svg?height=200&width=400",
//     capacity: 100,
//     attendees: [
//       { userId: "user-1", userName: "John Doe", status: "confirmed" },
//       { userId: "user-2", userName: "Jane Smith", status: "pending" },
//     ],
//     createdAt: "2023-10-01T11:30:00Z",
//     updatedAt: "2023-10-05T16:45:00Z",
//   },
//   {
//     id: "event-4",
//     title: "Product Launch",
//     description: "Exclusive launch event for our new product line",
//     location: "Austin, TX",
//     startDate: "2023-12-15T14:00:00Z",
//     endDate: "2023-12-15T17:00:00Z",
//     hostId: "user-6",
//     hostName: "Michael Brown",
//     imageUrl: "/placeholder.svg?height=200&width=400",
//     capacity: 200,
//     attendees: [{ userId: "user-1", userName: "John Doe", status: "confirmed" }],
//     createdAt: "2023-10-20T08:00:00Z",
//     updatedAt: "2023-10-25T13:20:00Z",
//   },
// ]



// export function EventProvider({ children }: { children: React.ReactNode }) {
//   const [events, setEvents] = useState<Event[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error | null>(null)

//   useEffect(() => {
//     // Simulate fetching events
//     const fetchEvents = async () => {
//       try {
//         setLoading(true)
//         // In a real app, you would fetch from your API
//         setTimeout(() => {
//           setEvents(mockEvents )
//           setLoading(false)
//         }, 1000)
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error("Failed to fetch events"))
//         setLoading(false)
//       }
//     }

//     fetchEvents()
//   }, [])

//   const getEvent = (id: string) => {
//     return events.find((event) => event.id === id)
//   }

//   const createEvent = async (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event> => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       const newEvent: Event = {
//         ...eventData,
//         id: `event-${events.length + 1}`,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       }

//       setEvents((prev) => [...prev, newEvent])
//       setLoading(false)
//       return newEvent
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to create event"))
//       setLoading(false)
//       throw err
//     }
//   }

//   const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       const updatedEvents = events.map((event) =>
//         event.id === id
//           ? {
//               ...event,
//               ...eventData,
//               updatedAt: new Date().toISOString(),
//             }
//           : event,
//       )

//       setEvents(updatedEvents)
//       setLoading(false)

//       const updatedEvent = updatedEvents.find((event) => event.id === id)
//       if (!updatedEvent) {
//         throw new Error("Event not found")
//       }

//       return updatedEvent
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to update event"))
//       setLoading(false)
//       throw err
//     }
//   }

//   const deleteEvent = async (id: string): Promise<void> => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       setEvents((prev) => prev.filter((event) => event.id !== id))
//       setLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to delete event"))
//       setLoading(false)
//       throw err
//     }
//   }

//   const attendEvent = async (eventId: string, userId: string): Promise<void> => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Find the user (in a real app, you would get this from your API)
//       const userName = "Current User" // Placeholder

//       setEvents((prev) =>
//         prev.map((event) => {
//           if (event.id === eventId) {
//             // Check if user is already attending
//             const existingAttendee = event.attendees.find((a) => a.userId === userId)

//             if (existingAttendee) {
//               // Update status if already in the list
//               return {
//                 ...event,
//                 attendees: event.attendees.map((a) => (a.userId === userId ? { ...a, status: "confirmed" } : a)),
//                 updatedAt: new Date().toISOString(),
//               }
//             } else {
//               // Add new attendee
//               return {
//                 ...event,
//                 attendees: [...event.attendees, { userId, userName, status: "confirmed" }],
//                 updatedAt: new Date().toISOString(),
//               }
//             }
//           }
//           return event
//         }),
//       )

//       setLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to attend event"))
//       setLoading(false)
//       throw err
//     }
//   }

//   const cancelAttendance = async (eventId: string, userId: string): Promise<void> => {
//     try {
//       setLoading(true)
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       setEvents((prev) =>
//         prev.map((event) => {
//           if (event.id === eventId) {
//             return {
//               ...event,
//               attendees: event.attendees.map((a) => (a.userId === userId ? { ...a, status: "cancelled" } : a)),
//               updatedAt: new Date().toISOString(),
//             }
//           }
//           return event
//         }),
//       )

//       setLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error("Failed to cancel attendance"))
//       setLoading(false)
//       throw err
//     }
//   }

//   const filterEvents = (filters: { hostId?: string; startDate?: string; endDate?: string }): Event[] => {
//     return events.filter((event) => {
//       // Filter by host
//       if (filters.hostId && event.hostId !== filters.hostId) {
//         return false
//       }

//       // Filter by date range
//       if (filters.startDate && new Date(event.startDate) < new Date(filters.startDate)) {
//         return false
//       }

//       if (filters.endDate && new Date(event.endDate) > new Date(filters.endDate)) {
//         return false
//       }

//       return true
//     })
//   }

//   return (
//     <EventContext.Provider
//       value={{
//         events,
//         loading,
//         error,
//         getEvent,
//         createEvent,
//         updateEvent,
//         deleteEvent,
//         attendEvent,
//         cancelAttendance,
//         filterEvents,
//       }}
//     >
//       {children}
//     </EventContext.Provider>
//   )
// }

// export function useEvents() {
//   const context = useContext(EventContext)
//   if (context === undefined) {
//     throw new Error("useEvents must be used within an EventProvider")
//   }
//   return context
// }
