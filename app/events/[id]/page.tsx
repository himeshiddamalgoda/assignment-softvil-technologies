"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { motion } from "motion/react";
import { useEventStore } from "@/store/event-store";
import { useUserStore } from "@/store/user-store";
import { Event } from "@/types";

import EventHeader from "./EventHeader";
import EventInfo from "./EventInfo";
import EventActions from "./EventActions";
import styles from "@/styles/eventdetail.module.scss";
import { eventDetailConfig } from "@/utils/motion";
import { ErrorState, LoadingState } from "@/components/dashboard/EventStates";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { fetchEvent, loading, error, success} = useEventStore();
  const { user } = useUserStore();

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
  }, [id, fetchEvent]);

  const handleBack = () => router.push("/");
  const isHost = user?.id === event?.hostId;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingState/>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
       <ErrorState error={error} />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {success && <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>}
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className={styles.detailHeading}
      >
        Event Details
      </Typography>
      <motion.div {...eventDetailConfig}>
        <Paper elevation={2} className={styles.container}>
          <Container
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2,1fr)",
              },
              gap: 2,
            }}
          >
            <EventInfo event={event} />
            <EventHeader event={event!} isHost={isHost} />
          </Container>

          <EventActions
            event={event}
            user={user!}
          />
          {/* <AttendeesList event={event} /> */}
        </Paper>
      </motion.div>
    </Container>
  );
}
