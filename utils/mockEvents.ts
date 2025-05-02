import { Event } from "@/lib/models/events";

export const mockEvents: Event[] = [
  {
    id: "user-1",
    title: "Event Title 1",
    description: "Description for event 1. This is a sample event to demonstrate UI layout.",
    location: "Miami, FL",
    startDate: "2023-12-11T10:00:00Z",
    endDate: "2023-12-11T14:00:00Z",
    hostId: "user-1",
    hostName: "Bob",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
    capacity: 110,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" }
    ],
    createdAt: "2023-10-02T10:00:00Z",
    updatedAt: "2023-10-03T12:00:00Z",
  },
  {
    id: "event-2",
    title: "Event Title 2",
    description: "Description for event 2. This is a sample event to demonstrate UI layout.",
    location: "Seattle, WA",
    startDate: "2023-12-12T10:00:00Z",
    endDate: "2023-12-12T14:00:00Z",
    hostId: "user-1",
    hostName: "Charlie",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
    capacity: 120,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" }
    ],
    createdAt: "2023-10-03T10:00:00Z",
    updatedAt: "2023-10-04T12:00:00Z",
  },
  {
    id: "event-3",
    title: "Event Title 3",
    description: "Description for event 3. This is a sample event to demonstrate UI layout.",
    location: "Denver, CO",
    startDate: "2023-12-13T10:00:00Z",
    endDate: "2023-12-13T14:00:00Z",
    hostId: "user-4",
    hostName: "Diana",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 130,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" }
    ],
    createdAt: "2023-10-04T10:00:00Z",
    updatedAt: "2023-10-05T12:00:00Z"
  },
  {
    id: "event-4",
    title: "Event Title 4",
    description: "Description for event 4. This is a sample event to demonstrate UI layout.",
    location: "Boston, MA",
    startDate: "2023-12-14T10:00:00Z",
    endDate: "2023-12-14T14:00:00Z",
    hostId: "user-5",
    hostName: "Evan",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 140,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" },
      { userId: "user-5", userName: "User 5", status: "confirmed" }
    ],
    createdAt: "2023-10-05T10:00:00Z",
    updatedAt: "2023-10-06T12:00:00Z"
  },
  {
    id: "event-5",
    title: "Event Title 5",
    description: "Description for event 5. This is a sample event to demonstrate UI layout.",
    location: "Los Angeles, CA",
    startDate: "2023-12-15T10:00:00Z",
    endDate: "2023-12-15T14:00:00Z",
    hostId: "user-6",
    hostName: "Fiona",
    imageUrl: "https://picsum.photos/seed/picsum/200/300",
    capacity: 150,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" }
    ],
    createdAt: "2023-10-06T10:00:00Z",
    updatedAt: "2023-10-07T12:00:00Z"
  },
  {
    id: "event-6",
    title: "Event Title 6",
    description: "Description for event 6. This is a sample event to demonstrate UI layout.",
    location: "Miami, FL",
    startDate: "2023-12-16T10:00:00Z",
    endDate: "2023-12-16T14:00:00Z",
    hostId: "user-1",
    hostName: "Alice",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 160,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" }
    ],
    createdAt: "2023-10-07T10:00:00Z",
    updatedAt: "2023-10-08T12:00:00Z"
  },
  {
    id: "event-7",
    title: "Event Title 7",
    description: "Description for event 7. This is a sample event to demonstrate UI layout.",
    location: "Seattle, WA",
    startDate: "2023-12-17T10:00:00Z",
    endDate: "2023-12-17T14:00:00Z",
    hostId: "user-2",
    hostName: "Bob",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 170,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" }
    ],
    createdAt: "2023-10-08T10:00:00Z",
    updatedAt: "2023-10-09T12:00:00Z"
  },
  {
    id: "event-8",
    title: "Event Title 8",
    description: "Description for event 8. This is a sample event to demonstrate UI layout.",
    location: "Denver, CO",
    startDate: "2023-12-18T10:00:00Z",
    endDate: "2023-12-18T14:00:00Z",
    hostId: "user-3",
    hostName: "Charlie",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 180,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" }
    ],
    createdAt: "2023-10-09T10:00:00Z",
    updatedAt: "2023-10-10T12:00:00Z"
  },
  {
    id: "event-9",
    title: "Event Title 9",
    description: "Description for event 9. This is a sample event to demonstrate UI layout.",
    location: "Boston, MA",
    startDate: "2023-12-19T10:00:00Z",
    endDate: "2023-12-19T14:00:00Z",
    hostId: "user-4",
    hostName: "Diana",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 190,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" },
      { userId: "user-5", userName: "User 5", status: "confirmed" }
    ],
    createdAt: "2023-10-10T10:00:00Z",
    updatedAt: "2023-10-11T12:00:00Z"
  },
  {
    id: "event-10",
    title: "Event Title 10",
    description: "Description for event 10. This is a sample event to demonstrate UI layout.",
    location: "Los Angeles, CA",
    startDate: "2023-12-20T10:00:00Z",
    endDate: "2023-12-20T14:00:00Z",
    hostId: "user-5",
    hostName: "Evan",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 200,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" }
    ],
    createdAt: "2023-10-11T10:00:00Z",
    updatedAt: "2023-10-12T12:00:00Z"
  },
  {
    id: "event-11",
    title: "Event Title 11",
    description: "Description for event 11. This is a sample event to demonstrate UI layout.",
    location: "Miami, FL",
    startDate: "2023-12-21T10:00:00Z",
    endDate: "2023-12-21T14:00:00Z",
    hostId: "user-6",
    hostName: "Fiona",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 210,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" }
    ],
    createdAt: "2023-10-12T10:00:00Z",
    updatedAt: "2023-10-13T12:00:00Z"
  },
  {
    id: "event-12",
    title: "Event Title 12",
    description: "Description for event 12. This is a sample event to demonstrate UI layout.",
    location: "Seattle, WA",
    startDate: "2023-12-22T10:00:00Z",
    endDate: "2023-12-22T14:00:00Z",
    hostId: "user-1",
    hostName: "Alice",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 220,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" }
    ],
    createdAt: "2023-10-13T10:00:00Z",
    updatedAt: "2023-10-14T12:00:00Z"
  },
  {
    id: "event-13",
    title: "Event Title 13",
    description: "Description for event 13. This is a sample event to demonstrate UI layout.",
    location: "Denver, CO",
    startDate: "2023-12-23T10:00:00Z",
    endDate: "2023-12-23T14:00:00Z",
    hostId: "user-2",
    hostName: "Bob",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 230,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" }
    ],
    createdAt: "2023-10-14T10:00:00Z",
    updatedAt: "2023-10-15T12:00:00Z"
  },
  {
    id: "event-14",
    title: "Event Title 14",
    description: "Description for event 14. This is a sample event to demonstrate UI layout.",
    location: "Boston, MA",
    startDate: "2023-12-24T10:00:00Z",
    endDate: "2023-12-24T14:00:00Z",
    hostId: "user-3",
    hostName: "Charlie",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 240,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" },
      { userId: "user-5", userName: "User 5", status: "confirmed" }
    ],
    createdAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-10-16T12:00:00Z"
  },
  {
    id: "event-15",
    title: "Event Title 15",
    description: "Description for event 15. This is a sample event to demonstrate UI layout.",
    location: "Los Angeles, CA",
    startDate: "2023-12-25T10:00:00Z",
    endDate: "2023-12-25T14:00:00Z",
    hostId: "user-4",
    hostName: "Diana",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 250,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" }
    ],
    createdAt: "2023-10-16T10:00:00Z",
    updatedAt: "2023-10-17T12:00:00Z"
  },
  {
    id: "event-16",
    title: "Event Title 16",
    description: "Description for event 16. This is a sample event to demonstrate UI layout.",
    location: "Miami, FL",
    startDate: "2023-12-26T10:00:00Z",
    endDate: "2023-12-26T14:00:00Z",
    hostId: "user-5",
    hostName: "Evan",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 260,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" }
    ],
    createdAt: "2023-10-17T10:00:00Z",
    updatedAt: "2023-10-18T12:00:00Z"
  },
  {
    id: "event-17",
    title: "Event Title 17",
    description: "Description for event 17. This is a sample event to demonstrate UI layout.",
    location: "Seattle, WA",
    startDate: "2023-12-27T10:00:00Z",
    endDate: "2023-12-27T14:00:00Z",
    hostId: "user-6",
    hostName: "Fiona",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 270,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" }
    ],
    createdAt: "2023-10-18T10:00:00Z",
    updatedAt: "2023-10-19T12:00:00Z"
  },
  {
    id: "event-18",
    title: "Event Title 18",
    description: "Description for event 18. This is a sample event to demonstrate UI layout.",
    location: "Denver, CO",
    startDate: "2023-12-28T10:00:00Z",
    endDate: "2023-12-28T14:00:00Z",
    hostId: "user-1",
    hostName: "Alice",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 280,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" }
    ],
    createdAt: "2023-10-19T10:00:00Z",
    updatedAt: "2023-10-20T12:00:00Z"
  },
  {
    id: "event-19",
    title: "Event Title 19",
    description: "Description for event 19. This is a sample event to demonstrate UI layout.",
    location: "Boston, MA",
    startDate: "2023-12-29T10:00:00Z",
    endDate: "2023-12-29T14:00:00Z",
    hostId: "user-2",
    hostName: "Bob",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 290,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" },
      { userId: "user-5", userName: "User 5", status: "confirmed" }
    ],
    createdAt: "2023-10-20T10:00:00Z",
    updatedAt: "2023-10-21T12:00:00Z"
  },
  {
    id: "event-20",
    title: "Event Title 20",
    description: "Description for event 20. This is a sample event to demonstrate UI layout.",
    location: "Los Angeles, CA",
    startDate: "2023-12-30T10:00:00Z",
    endDate: "2023-12-30T14:00:00Z",
    hostId: "user-3",
    hostName: "Charlie",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 300,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" }
    ],
    createdAt: "2023-10-21T10:00:00Z",
    updatedAt: "2023-10-22T12:00:00Z"
  },
  {
    id: "event-21",
    title: "Event Title 21",
    description: "Description for event 21. This is a sample event to demonstrate UI layout.",
    location: "Miami, FL",
    startDate: "2023-12-31T10:00:00Z",
    endDate: "2023-12-31T14:00:00Z",
    hostId: "user-4",
    hostName: "Diana",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 310,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" }
    ],
    createdAt: "2023-10-22T10:00:00Z",
    updatedAt: "2023-10-23T12:00:00Z"
  },
  {
    id: "event-22",
    title: "Event Title 22",
    description: "Description for event 22. This is a sample event to demonstrate UI layout.",
    location: "Seattle, WA",
    startDate: "2024-01-01T10:00:00Z",
    endDate: "2024-01-01T14:00:00Z",
    hostId: "user-5",
    hostName: "Evan",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 320,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" }
    ],
    createdAt: "2023-10-23T10:00:00Z",
    updatedAt: "2023-10-24T12:00:00Z"
  },
  {
    id: "event-23",
    title: "Event Title 23",
    description: "Description for event 23. This is a sample event to demonstrate UI layout.",
    location: "Denver, CO",
    startDate: "2024-01-02T10:00:00Z",
    endDate: "2024-01-02T14:00:00Z",
    hostId: "user-6",
    hostName: "Fiona",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 330,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" }
    ],
    createdAt: "2023-10-24T10:00:00Z",
    updatedAt: "2023-10-25T12:00:00Z"
  },
  {
    id: "event-24",
    title: "Event Title 24",
    description: "Description for event 24. This is a sample event to demonstrate UI layout.",
    location: "Boston, MA",
    startDate: "2024-01-03T10:00:00Z",
    endDate: "2024-01-03T14:00:00Z",
    hostId: "user-1",
    hostName: "Alice",
    imageUrl: "/placeholder.svg?height=200&width=400",
    capacity: 340,
    attendees: [
      { userId: "user-1", userName: "User 1", status: "confirmed" },
      { userId: "user-2", userName: "User 2", status: "pending" },
      { userId: "user-3", userName: "User 3", status: "confirmed" },
      { userId: "user-4", userName: "User 4", status: "pending" },
      { userId: "user-5", userName: "User 5", status: "confirmed" }
    ],
    createdAt: "2023-10-25T10:00:00Z",
    updatedAt: "2023-10-26T12:00:00Z"
  },
]
