
import { Event } from "@/types";
import api from "./axiosInstance";

export const eventApi = {
  getEvents: async () => {
    const response = await api.get<Event[]>("/events");
    return response; 
  },

  getEvent: async (id: string) => {
    const response = await api.get<Event>(`/events/${id}`);
    return response;
  },

  createEvent: async (eventData: Omit<Event, "id" | "createdAt" | "updatedAt">) => {
    const response = await api.post<Event>("/events", {
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response;
  },

  updateEvent: async (id: string, eventData: Partial<Event>) => {
    const response = await api.put<Event>(`/events/${id}`, {
      ...eventData,
      updatedAt: new Date().toISOString(),
    });
    return response;
  },

  deleteEvent: async (id: string) => {
    const response = await api.delete<{ success: boolean }>(`/events/${id}`);
    return response;
  },
};
