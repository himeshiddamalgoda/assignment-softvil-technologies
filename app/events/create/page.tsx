"use client";

import React from "react";
import { Container, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/event-store";
import { useUserStore } from "@/store/user-store";
import { CreateEventForm } from "./CreateEventForm";
import style from "@/styles/form.module.scss";
import { motion } from "motion/react";
import { EventFormData } from "@/lib/validations/event";

export default function CreateEvent() {
  const router = useRouter();
  const { createEvent } = useEventStore();
  const { user } = useUserStore();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (data: EventFormData) => {
    if (!user) {
      setError("You must be logged in to create an event");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newEvent = await createEvent({
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        hostId: user.id,
        hostName: user.name,
        attendees: [],
      });

      setSuccess(true);

      setTimeout(() => {
        router.push(`/events/${newEvent.id}`);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
          className={style.formHeading}
        >
          Create New Event
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, easing: "ease-out" }}
        >
          <CreateEventForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            onSuccessClose={() => setSuccess(false)}
          />
        </motion.div>
      </Container>
    </LocalizationProvider>
  );
}
