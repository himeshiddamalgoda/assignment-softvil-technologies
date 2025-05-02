export interface Event {
    id: string
    title: string
    description: string| undefined
    location: string
    startDate: string // ISO format: YYYY-MM-DDTHH:mm:ss
    endDate: string   // ISO format
    createdAt: string
    updatedAt?: string
    imageUrl?: string
    organizerId?: string
    isPublic?: boolean
    tags?: string[]
    hostId?: string
    hostName?: string
    capacity?: number
    attendees?: string|Attendee[]
  }

  type AttendeeStatus = "confirmed" | "pending";

  interface Attendee {
    userId: string;
    userName: string;
    status: AttendeeStatus;
  }
  