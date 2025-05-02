"use client";

import { Container, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEvents } from "@/context/event-context";
import { Filters } from "@/components/dashboard/Filters";
import { EventsGrid } from "@/components/dashboard/EventsGrid";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/dashboard/EventStates";
import styles from "@/styles/dashboard.module.scss";

export default function Dashboard() {
  const router = useRouter();
  const { events, loading, error } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [hostFilter, setHostFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
  const [page, setPage] = useState(1);

  const eventsPerPage = 6;

  const uniqueHosts = Array.from(
    new Set(events.map((event) => event.hostId))
  ).map((hostId) => {
    const event = events.find((e) => e.hostId === hostId);
    return { id: hostId, name: event?.hostName || "Unknown" };
  });

  const filteredEvents = events.filter((event) => {
    if (
      searchTerm &&
      !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    if (hostFilter && event.hostId !== hostFilter) return false;

    if (startDateFilter && new Date(event.startDate) < startDateFilter)
      return false;

    return true;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  const handlePageChange = (_: unknown, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className={styles.upcomingHeading}
      >
        Upcoming Events
      </Typography>
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        hostFilter={hostFilter}
        setHostFilter={setHostFilter}
        startDateFilter={startDateFilter}
        setStartDateFilter={setStartDateFilter}
        uniqueHosts={uniqueHosts}
      />

      {loading && <LoadingState />}
      {error && <ErrorState error={error} />}
      {!loading && filteredEvents.length === 0 && <EmptyState />}

      {!loading && filteredEvents.length > 0 && (
        <EventsGrid
          events={paginatedEvents}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onCardClick={handleCardClick}
        />
      )}
    </Container>
  );
}
