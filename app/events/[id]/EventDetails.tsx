"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Container, Paper, CircularProgress, Alert, Button, } from "@mui/material"
import { useEvents } from "@/context/event-context"
import { useUser } from "@/context/user-context"
import EventHeader from "./EventHeader"
import EventInfo from "./EventInfo"
import EventActions from "./EventActions"
import AttendeesList from "./AttendeesList"


export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { getEvent, loading, error, attendEvent, cancelAttendance, deleteEvent } = useEvents()
  const { user } = useUser()
  const [event, setEvent] = useState(getEvent(id as string))
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [attendLoading, setAttendLoading] = useState(false)


  useEffect(() => {
    setEvent(getEvent(id as string))
  }, [id, getEvent])

 

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    )
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Event not found</Alert>
        <Button variant="contained" onClick={() => router.push("/")}>Back to Dashboard</Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2}>
    
        <EventHeader event={event}  isHost={user?.id === event.hostId} setDeleteDialogOpen={setDeleteDialogOpen} />
        <EventInfo event={event} />
        <EventActions event={event} user={user} attendLoading={attendLoading} attendEvent={attendEvent} cancelAttendance={cancelAttendance} />
        <AttendeesList event={event} />
      </Paper>
      
    


    </Container>
  )
}
