"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { Container, Alert, Button, CircularProgress, Paper } from "@mui/material"
import { useEventStore } from "@/store/event-store"
import { useUserStore } from "@/store/user-store"
import { Event } from "@/lib/mock-data"
import EventHeader from "./EventHeader"
import EventInfo from "./EventInfo"
import EventActions from "./EventActions"
import AttendeesList from "./AttendeesList"

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { fetchEvent, loading, error, attendEvent, cancelAttendance } = useEventStore()
  const { user } = useUserStore()
  const [event, setEvent] = React.useState<Event | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()

    const fetch = async(id: string) => {
      const eventData = await fetchEvent(id)
      setEvent(eventData)
    }
    if (id) {
      fetch(id)
    }
    return () => {
      controller.abort()
    }
  }, [id, fetchEvent])


  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CircularProgress sx={{ display: "block", mx: "auto", my: 8 }} />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          {error.message}
        </Alert>
      </Container>
    )
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          Event not found
        </Alert>
        <Button variant="contained" onClick={() => router.push("/")} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2}>
        <EventHeader event={event} isHost={user?.id === event.hostId} />
        <EventInfo event={event} />
        <EventActions
          event={event}
          user={user}
          attendEvent={attendEvent}
          cancelAttendance={cancelAttendance}
        />
        <AttendeesList event={event} />
      </Paper>
    </Container>
  )
}
