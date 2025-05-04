"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Button,
  Alert,
  
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { useEventStore } from "@/store/event-store";
import { Attendee } from "@/types";
import TabPanel from "./TabPanel";
import EventCard from "./EventCard";
import { ErrorState, LoadingState } from "@/components/dashboard/EventStates";

export default function Profile() {
  const router = useRouter();
  const { user, loading: userLoading, error: userError } = useUserStore();
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEventStore();
  const [tabValue, setTabValue] = React.useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  const hostedEvents = events.filter((event) => event.hostId === user?.id);
  const attendingEvents = events.filter((event) =>
    event?.attendees?.some(
      (attendee: Attendee) =>
        attendee.userId === user?.id && attendee.status === "confirmed"
    )
  );

  const loading = userLoading || eventsLoading;
  const error = userError || eventsError;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingState />
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

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          You must be logged in to view your profile
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid
            component="div"
            size={{ xs: 12, md: 3 }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Avatar
              src={user.avatarUrl || "/placeholder.svg?height=120&width=120"}
              sx={{ width: 120, height: 120, mx: { xs: "auto", md: 0 } }}
            />
          </Grid>
          <Grid component="div" size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" size="small">
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
            variant="fullWidth"
          >
            <Tab
              label={`Attending (${attendingEvents.length})`}
              id="profile-tab-0"
            />
            <Tab
              label={`Hosting (${hostedEvents.length})`}
              id="profile-tab-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {attendingEvents.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                You are not attending any events yet
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/")}
                sx={{ mt: 2 }}
              >
                Browse Events
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {attendingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id)} // Passing onClick handler
                  showAttendees={false}
                />
              ))}
            </Grid>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {hostedEvents.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                You are not hosting any events yet
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push("/events/create")}
                sx={{ mt: 2 }}
              >
                Create Event
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {hostedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.id)}
                  showAttendees={true}
                />
              ))}
            </Grid>
          )}
        </TabPanel>
      </Box>
    </Container>
  );
}
