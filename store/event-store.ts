import { create } from "zustand"
import { eventApi } from "@/lib/mock-api"
import { Event } from "@/lib/mock-data";

interface EventState {
  events: Event[]
  event?: Event
  loading: boolean
  error: Error | null

  // Actions
  fetchEvents: () => Promise<void>
  fetchEvent: (id: string) => Promise<Event> 
  createEvent: (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">) => Promise<Event>
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>
  deleteEvent: (id: string) => Promise<void>
  attendEvent: (eventId: string, userId: string) => Promise<void>
  cancelAttendance: (eventId: string, userId: string) => Promise<void>
  filterEvents: (filters: { hostId?: string; startDate?: string; endDate?: string }) => Event[]
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    try {
      set({ loading: true, error: null })
      const response = await eventApi.getEvents()
      set({ events: response.data, loading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to fetch events"),
        loading: false,
      })
      throw err
    }
  },

  fetchEvent: async (id: string) => {
    try {
      set({ loading: true, error: null })
      const response = await eventApi.getEvent(id)
      set({ event: response.data, loading: false })
      return response.data 
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to fetch events"),
        loading: false,
      })
      throw err
    }
  },

  createEvent: async (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">): Promise<Event>  => {
    try {
      set({ loading: true, error: null })
      const response = await eventApi.createEvent(eventData)
      set((state:any) => ({
        events: [...state.events, response.data],
        loading: false,
      }))
      return response.data as unknown  as Event
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to create event"),
        loading: false,
      })
      throw err
    }
  },

  updateEvent: async (id: string, eventData: Partial<Event>): Promise<Event> => {
    try {
      set({ loading: true, error: null })
      const response = await eventApi.updateEvent(id, eventData)
      set((state:any) => ({
        events: state.events.map((event:any) => (event.id === id ? response.data : event)),
        loading: false,
      }))
      return response.data as unknown  as Event
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to update event"),
        loading: false,
      })
      throw err
    }
  },

  deleteEvent: async (id: string) => {
    try {
      set({ loading: true, error: null })
      await eventApi.deleteEvent(id)
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        loading: false,
      }))
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to delete event"),
        loading: false,
      })
      throw err
    }
  },

  attendEvent: async (eventId: string, userId: string) => {
    try {
      set({ loading: true, error: null })
      const response = await eventApi.attendEvent(eventId, userId)
      set((state:any) => ({
        events: state.events.map((event:any) => (event.id === eventId ? response.data : event)),
        loading: false,
      }))
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to attend event"),
        loading: false,
      })
      throw err
    }
  },

  cancelAttendance: async (eventId: string, userId: string) => {
    try {
      set({ loading: true, error: null })
      const response = await eventApi.cancelAttendance(eventId, userId)
      set((state:any) => ({
        events: state.events.map((event:any) => (event.id === eventId ? response.data : event)),
        loading: false,
      }))
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to cancel attendance"),
        loading: false,
      })
      throw err
    }
  },

  filterEvents: (filters: { hostId?: string; startDate?: string; endDate?: string }) => {
    return get().events.filter((event:any) => {
      // Filter by host
      if (filters.hostId && event.hostId !== filters.hostId) {
        return false
      }

      // Filter by date range
      if (filters.startDate && new Date(event.startDate) < new Date(filters.startDate)) {
        return false
      }

      if (filters.endDate && new Date(event.endDate) > new Date(filters.endDate)) {
        return false
      }

      return true
    })
  },
}))
