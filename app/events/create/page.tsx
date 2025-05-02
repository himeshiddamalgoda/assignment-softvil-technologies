"use client"

import React, { useState } from "react"
import {
  Container,
  Typography,
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useRouter } from "next/navigation"
import { useEvents } from "@/context/event-context"
import { useUser } from "@/context/user-context"
import { EventFormData } from "@/lib/validations/event"
import { CreateEventForm } from "./CreateEventForm"
import style from '@/styles/form.module.scss'



export default function CreateEvent() {
  const router = useRouter()
  const { createEvent } = useEvents()
  const { user, loading: userLoading } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)


const handleSubmit = async (data: EventFormData) => {
    if (!user) {
      setError("You must be logged in to create an event")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const newEvent = await createEvent({
        ...data,
        hostId: user.id,
        hostName: user.name,
        attendees: [],
      })

      setSuccess(true)

      setTimeout(() => {
        router.push(`/events/${newEvent.id}`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" className={style.formHeading}>
          Create New Event
        </Typography>

        <CreateEventForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          success={success}
          onSuccessClose={() => setSuccess(false)}
        />

      </Container>
    </LocalizationProvider>
  )
}
