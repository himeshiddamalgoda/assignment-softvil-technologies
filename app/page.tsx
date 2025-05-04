"use client";

import React from "react";
import { Filters } from "@/components/dashboard/Filters";
import { EventsGrid } from "@/components/dashboard/EventsGrid";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/dashboard/EventStates";
import { motion } from "motion/react";

import { useRouter } from "next/navigation";
import { useEventStore } from "@/store/event-store";

import { Container, Typography } from "@mui/material";
import styles from "@/styles/dashboard.module.scss";
import { filterEvents, getUniqueHosts } from "@/utils/filters";
import { getTotalPages, paginate } from "@/utils/pagination";
import { eventDetailConfig } from "@/utils/motion";

export interface EventFilters {
  searchTerm: string;
  hostFilter: string;
  startDateFilter: Date | null;
}

export default function Dashboard() {
  const router = useRouter();
  const { events, loading, error , success} = useEventStore();

  const [filters, setFilters] = React.useState<EventFilters>({
    searchTerm: "",
    hostFilter: "",
    startDateFilter: null as Date | null,
  });
  const [page, setPage] = React.useState<number>(1);

  const eventsPerPage = 6;

  const uniqueHosts = React.useMemo(() => getUniqueHosts(events), [events]);

  const filteredEvents = React.useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  const paginatedEvents = React.useMemo(
    () => paginate(filteredEvents, page, eventsPerPage),
    [filteredEvents, page]
  );

  const totalPages = React.useMemo(
    () => getTotalPages(filteredEvents.length, eventsPerPage),
    [filteredEvents]
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1.2, easing: "ease-out" }}
      >
        <Filters
          searchTerm={filters.searchTerm}
          setSearchTerm={(val) =>
            setFilters((f) => ({ ...f, searchTerm: val }))
          }
          hostFilter={filters.hostFilter}
          setHostFilter={(val) =>
            setFilters((f) => ({ ...f, hostFilter: val }))
          }
          startDateFilter={filters.startDateFilter}
          setStartDateFilter={(val) =>
            setFilters((f) => ({ ...f, startDateFilter: val }))
          }
          uniqueHosts={uniqueHosts}
        />
      </motion.div>

      {loading && <LoadingState />}
      {error && <ErrorState error={error} />}
      {!loading && success && filteredEvents.length === 0 && <EmptyState />}

      {!loading && filteredEvents.length > 0 && (
        <motion.div {...eventDetailConfig}>
          <EventsGrid
            events={paginatedEvents}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onCardClick={handleCardClick}
          />
        </motion.div>
      )}

      {/* <TestErrorComponent /> */}
    </Container>
  );
}

//  function TestErrorComponent() {
//   throw new Error("This is a test error for the error boundary.");
//   return null
// }
