"use client"

import { useEffect } from "react"
import { useUserStore } from "@/store/user-store"
import { useEventStore } from "@/store/event-store"

export default function StoreInitializer() {
  const fetchCurrentUser = useUserStore((state:any) => state.fetchCurrentUser)
  const fetchEvents = useEventStore((state) => state.fetchEvents)

  useEffect(() => {
    // Initialize stores with data
    fetchCurrentUser().catch((err:Error) => console.error("Failed to fetch user:", err))
    fetchEvents().catch((err) => console.error("Failed to fetch events:", err))
  }, [fetchCurrentUser, fetchEvents])

  return null
}
