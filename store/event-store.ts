// store/eventStore.ts
import { create } from "zustand";

import { Event } from "@/types";
import { eventApi } from "@/lib/event-api";

interface EventState {
  events: Event[];
  event?: Event;
  loading: boolean;
  error: Error | null;
  success?: boolean;
  attendanceLoading?: boolean;

  fetchEvents: () => Promise<void>;
  fetchEvent: (id: string) => Promise<Event>;
  createEvent: (
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ) => Promise<Event>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  attendEvent: (id: string, eventData: Partial<Event>) => Promise<Event>;
  cancelAttendance: (id: string, eventData: Partial<Event>) => Promise<Event>;
  refetchEvent: (id: string) => Promise<Event>;
  filterEvents: (filters: {
    hostId?: string;
    startDate?: string;
    endDate?: string;
  }) => Event[];
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    try {
      set({ loading: true, error: null, success: false });
      const response = await eventApi.getEvents();
      set({
        events: response.data,
        loading: false,
        success: true,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to fetch events"),
        loading: false,
      });
      throw err;
    }
  },

  fetchEvent: async (id: string) => {
    try {
      set({ loading: true, error: null, success: false });
      const response = await eventApi.getEvent(id);
      set({ event: response.data, loading: false, success: true });
      return response.data;
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to fetch event"),
        loading: false,
      });
      throw err;
    }
  },

  createEvent: async (eventData) => {
    try {
      set({ loading: true, error: null , success: false});
      const response = await eventApi.createEvent(eventData);
      set((state) => ({
        events: [...state.events, response.data],
        loading: false,
        success: true
      }));
      return response.data;
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to create event"),
        loading: false,
      });
      throw err;
    }
  },

  updateEvent: async (id, eventData) => {
    try {
      set({ loading: true, error: null, success: false });
      const response = await eventApi.updateEvent(id, eventData);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? response.data : event
        ),
        loading: false,
        success: true
      }));
      return response.data;
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to update event"),
        loading: false,
      });
      throw err;
    }
  },

  deleteEvent: async (id) => {
    try {
      set({ loading: true, error: null, success: false });
      await eventApi.deleteEvent(id);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        loading: false,
        success: true
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to delete event"),
        loading: false,
      });
      throw err;
    }
  },

  attendEvent: async (id,eventData) => {
    try {
      set({ attendanceLoading: true, error: null, success: false });
      const response = await eventApi.updateEvent(id, eventData);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? response.data : event
        ),
        attendanceLoading: false,
        success: true
      }));
      return response.data;
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to attend event"),
        attendanceLoading: false,
      });
      throw err;
    }
  },

  cancelAttendance: async (id,eventData) => {
    try {
      set({ attendanceLoading: true, error: null, success: false });
      const response = await eventApi.updateEvent(id, eventData);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? response.data : event
        ),
        attendanceLoading: false,
        success: true
      }));
      return response.data;
    } catch (err) {
      set({
        error:
          err instanceof Error ? err : new Error("Failed to cancel attendance"),
          attendanceLoading: false,
      });
      throw err;
    }
  },

  refetchEvent: async (id: string) => {
    try {
      set({ loading: true, error: null, success: false });
      const response = await eventApi.getEvent(id);
      set({ event: response.data, loading: false, success: true });
      return response.data;
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to fetch event"),
        loading: false,
      });
      throw err;
    }
  },

  filterEvents: ({ hostId, startDate, endDate }) => {
    return get().events.filter((event) => {
      if (hostId && event.hostId !== hostId) return false;
      if (startDate && new Date(event.startDate) < new Date(startDate))
        return false;
      if (endDate && new Date(event.endDate) > new Date(endDate)) return false;
      return true;
    });
  },
}));
