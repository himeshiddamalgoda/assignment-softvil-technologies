"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Container, Alert, Button, CircularProgress } from "@mui/material"
import { useEvents } from "@/context/event-context"
import { useUser } from "@/context/user-context"
import EventDetail from "./EventDetails"

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { getEvent, loading, error, attendEvent, cancelAttendance, deleteEvent } = useEvents()
  const { user } = useUser()
  const [event, setEvent] = useState(getEvent(id as string))

  useEffect(() => {
    setEvent(getEvent(id as string))
  }, [id, getEvent])

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
    <EventDetail
      event={event}
      user={user}
      attendEvent={attendEvent}
      cancelAttendance={cancelAttendance}
      deleteEvent={deleteEvent}
    />
  )
}
