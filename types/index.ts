export interface User {
    id: string
    name: string
    email: string
    avatarUrl?: string
    hostedEvents?: string[]
    attendingEvents?: string[]
  }
  
  export interface Attendee {
    userId: string
    userName: string
    avatarUrl?: string
    status: "confirmed" | "pending" | "cancelled"
  }
  
  export interface Event {
    id: string
    title: string
    description: string
    location: string
    startDate: string
    endDate: string
    hostId: string
    hostName: string
    imageUrl?: string
    capacity: number
    attendees?: Attendee[]
    createdAt: string
    updatedAt: string
  }