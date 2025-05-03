"use client";

import React, { useEffect } from "react";
import EventForm from "./EditEventForm";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventStore } from "@/store/event-store";
import { useUserStore } from "@/store/user-store";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { EventFormData, eventSchema } from "@/lib/validations/event";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import styles from "@/styles/form.module.scss";
import { Event } from "@/lib/mock-data";

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { fetchEvent, updateEvent, loading } = useEventStore();
  const { user } = useUserStore();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [event, setEvent] = React.useState<Event | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    const fetch = async (id: string) => {
      const eventData = await fetchEvent(id);
      setEvent(eventData);
    };
    if (id) {
      fetch(id);
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      capacity: 50,
      imageUrl: "",
    },
  });

  // Set form values when event data is available
  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        description: event.description,
        location: event.location,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        capacity: event.capacity,
        imageUrl: event.imageUrl || "",
      });
    }
  }, [event, reset]);

  // Check if user is authorized to edit this event
  useEffect(() => {
    if (event && user && event.hostId !== user.id) {
      setError("You are not authorized to edit this event");
      setTimeout(() => router.push(`/events/${id}`), 2000);
    }
  }, [event, user, router, id]);

  const onSubmit = async (data: EventFormData) => {
    if (!event || !user || event.hostId !== user.id) {
      setError("Not authorized or event not found");
      return;
    }

    try {
      setSubmitting(true);
      await updateEvent(event.id, {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      });
      setSuccess(true);
      setTimeout(() => router.push(`/events/${event.id}`), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          Event not found
        </Alert>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
          className={styles.formHeading}
        >
          Edit Event
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mt: 4 }} className={styles.container}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <EventForm
            control={control}
            errors={errors}
            submitting={submitting}
            onCancel={() => router.push(`/events/${id}`)}
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Update Event"
          />
        </Paper>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="Event updated successfully!"
        />
      </Container>
    </LocalizationProvider>
  );
}
