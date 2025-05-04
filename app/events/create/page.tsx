"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/event-store";
import { useUserStore } from "@/store/user-store";
import { CreateEventForm } from "./CreateEventForm";
import style from "@/styles/form.module.scss";
import { motion } from "framer-motion";
import { EventFormData } from "@/lib/validations/event";
import { Event } from "@/types";

import { createFormConfig } from "@/utils/motion";

export default function CreateEvent() {
  const router = useRouter();
  const { createEvent } = useEventStore();
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  const handleSubmit = async (data: EventFormData) => {
    if (!user) {
      setError("You must be logged in to create an event");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newEvent: Event = await createEvent({
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        hostId: user.id,
        hostName: user.name,
        attendees: [],
      });
      console.table({
        id: newEvent.id,
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        hostId: user.id,
        hostName: user.name,
        attendees: [],
      });
      setSuccess(true);

      redirectTimeoutRef.current = setTimeout(() => {
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

        <motion.div {...createFormConfig}>
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
