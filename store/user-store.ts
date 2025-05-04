import { create } from "zustand";
import { userApi } from "@/lib/mock-api";
import { User } from "@/types";

interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const response = await userApi.login(email, password);
      set({ user: response.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Login failed"),
        loading: false,
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await userApi.logout();
      set({ user: null, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Logout failed"),
        loading: false,
      });
      throw err;
    }
  },

  updateUser: async (userData: Partial<User>) => {
    try {
      set({ loading: true, error: null });
      const response = await userApi.updateProfile(userData);
      set({ user: response.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to update user"),
        loading: false,
      });
      throw err;
    }
  },

  fetchCurrentUser: async () => {
    try {
      set({ loading: true, error: null });
      const response = await userApi.getCurrentUser();
      set({ user: response.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error("Failed to fetch user"),
        loading: false,
      });
      throw err;
    }
  },
}));
