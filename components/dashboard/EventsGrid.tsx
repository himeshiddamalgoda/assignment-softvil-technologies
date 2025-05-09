import { Grid, Box, Pagination } from "@mui/material";
import { EventCard } from "./EventCard";
import { motion } from "motion/react";
import styles from "@/styles/dashboard.module.scss";
import { Event } from "@/types";

import { eventDetailConfig } from "@/utils/motion";

export function EventsGrid({
  events,
  page,
  totalPages,
  onPageChange,
  onCardClick,
}: {
  events: Event[];
  page: number;
  totalPages: number;
  onPageChange: (e: unknown, value: number) => void;
  onCardClick: (id: string) => void;
}) {
  return (
    <Box className={styles.eventsContainer}>
      <Grid container spacing={3} rowSpacing={3}>
        {events.map((event) => (
          <Grid
            component="div"
            key={event.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            className={styles.cardWrapper}
          >
            <motion.div {...eventDetailConfig}>
              <EventCard event={event} onClick={onCardClick} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
