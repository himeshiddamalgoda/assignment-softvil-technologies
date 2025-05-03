import { AxiosResponse } from "axios";
import { Attendee, Event, mockEvents, mockUsers, User } from "./mock-data";

// Define types for User and Event
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatarUrl?: string;
// }

// interface Attendee {
//   userId: string;
//   userName: string;
//   avatarUrl?: string;
//   status: string;
// }

// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   startTime: string;
//   endTime: string;
//   createdAt: string;
//   updatedAt: string;
//   attendees?: Attendee[];
// }

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API response creator\
const createResponse = async <T>(
  data: T,
  status = 200,
  delayMs = 800
): Promise<AxiosResponse<T>> => {
  await delay(delayMs);
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: {},
    config: {} as any,
  };
};

// User API
export const userApi = {
  getCurrentUser: async () => {
    try {
      // In a real app, this would be a real API call
      // return await api.get('/users/me')

      // For mock, we'll return the first user
      return await createResponse(mockUsers[0]);
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: async (email: string, password: string) => {
    try {
      // In a real app: return await api.post('/auth/login', { email, password })

      // For mock, find user by email
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Simulate storing auth token
      localStorage.setItem("auth_token", "mock_token_12345");

      return await createResponse(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // In a real app: return await api.post('/auth/logout')

      // For mock, just remove the token
      localStorage.removeItem("auth_token");

      return await createResponse({ success: true });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  updateProfile: async (userData: Partial<User>) => {
    try {
      // In a real app: return await api.patch('/users/me', userData)

      // For mock, return updated user
      return await createResponse({ ...mockUsers[0], ...userData });
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },
};

// Events API
export const eventApi = {
  getEvents: async () => {
    try {
      // In a real app: return await api.get('/events')

      // For mock, return all events
      return await createResponse(mockEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  getEvent: async (id: string) => {
    try {
      // In a real app: return await api.get(`/events/${id}`)

      // For mock, find event by id
      const event = mockEvents.find((e) => e.id === id);
      if (!event) {
        throw new Error("Event not found");
      }

      return await createResponse(event);
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  createEvent: async (
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      // In a real app: return await api.post('/events', eventData)

      // For mock, create new event
      const newEvent: Event = {
        ...eventData,
        id: `event-${mockEvents.length + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return await createResponse(newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  updateEvent: async (id: string, eventData: Partial<Event>) => {
    try {
      // In a real app: return await api.patch(`/events/${id}`, eventData)

      // For mock, find and update event
      const eventIndex = mockEvents.findIndex((e) => e.id === id);
      if (eventIndex === -1) {
        throw new Error("Event not found");
      }

      const updatedEvent = {
        ...mockEvents[eventIndex],
        ...eventData,
        updatedAt: new Date().toISOString(),
      };

      return await createResponse(updatedEvent);
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },

  deleteEvent: async (id: string) => {
    try {
      // In a real app: return await api.delete(`/events/${id}`)

      // For mock, just return success
      return await createResponse({ success: true });
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  },

  attendEvent: async (eventId: string, userId: string) => {
    try {
      // In a real app: return await api.post(`/events/${eventId}/attend`, { userId })

      // For mock, find event and add attendee
      const eventIndex = mockEvents.findIndex((e) => e.id === eventId);
      if (eventIndex === -1) {
        throw new Error("Event not found");
      }

      // Find user
      const user = mockUsers.find((u) => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Check if already attending
      const attendeeIndex = mockEvents[eventIndex]?.attendees?.findIndex(
        (a: Attendee) => a.userId === userId
      );

      let updatedEvent: Event;

      if (attendeeIndex !== -1) {
        // Update status if already in the list
        updatedEvent = {
          ...mockEvents[eventIndex],
          attendees: mockEvents[eventIndex]?.attendees?.map((a) =>
            a.userId === userId ? { ...a, status: "confirmed" } : a
          ),
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Add new attendee
        updatedEvent = {
          ...mockEvents[eventIndex],
          attendees: [
            ...mockEvents[eventIndex].attendees?? [],
            {
              userId,
              userName: user.name,
              avatarUrl: user.avatarUrl,
              status: "confirmed",
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      }

      return await createResponse(updatedEvent);
    } catch (error) {
      console.error(`Error attending event ${eventId}:`, error);
      throw error;
    }
  },

  cancelAttendance: async (eventId: string, userId: string) => {
    try {
      // In a real app: return await api.post(`/events/${eventId}/cancel`, { userId })

      // For mock, find event and update attendee status
      const eventIndex = mockEvents.findIndex((e) => e.id === eventId);
      if (eventIndex === -1) {
        throw new Error("Event not found");
      }

      const updatedEvent = {
        ...mockEvents[eventIndex],
        attendees: mockEvents[eventIndex]?.attendees?.map((a) =>
          a.userId === userId ? { ...a, status: "cancelled" } : a
        ),
        updatedAt: new Date().toISOString(),
      };

      return await createResponse(updatedEvent);
    } catch (error) {
      console.error(`Error cancelling attendance for event ${eventId}:`, error);
      throw error;
    }
  },
};
