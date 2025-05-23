import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { motion } from "motion/react";
import { format } from "date-fns";
import { Event as EventIcon, LocationOn, Person } from "@mui/icons-material";
import styles from "@/styles/dashboard.module.scss";
import { Event } from "@/types";

export function EventCard({
  event,
  onClick,
}: {
  event: Event;
  onClick: (id: string) => void;
}) {
  return (
    <Card className={styles.card}>
      <CardActionArea onClick={() => onClick(event.id)}>
        <motion.div
          initial={{ filter: "blur(15px)", opacity: 0.1 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1, easing: "ease-out" }}
          style={{ display: "contents" }}
        >
          <CardMedia
            component="img"
            height="160"
            image={event.imageUrl || "/placeholder.svg?height=140&width=300"}
            alt={event.title}
            className={styles.image}
          />
        </motion.div>
        <CardContent className={styles.content}>
          <Typography variant="h6" className={styles.title}>
            {event.title}
          </Typography>
          <Box className={styles.detailRow}>
            <EventIcon fontSize="small" className={styles.icon} />
            <Typography variant="body2" className={styles.text}>
              {format(new Date(event.startDate), "MMM d, yyyy • h:mm a")}
            </Typography>
          </Box>
          <Box className={styles.detailRow}>
            <LocationOn fontSize="small" className={styles.icon} />
            <Typography variant="body2" className={styles.text} noWrap>
              {event.location}
            </Typography>
          </Box>
          <Box className={styles.detailRow}>
            <Person fontSize="small" className={styles.icon} />
            <Typography variant="body2" className={styles.text}>
              {event.hostName}
            </Typography>
          </Box>
          <Typography variant="body2" className={styles.description}>
            {event.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Chip
              size="small"
              label={`${event.attendees?.length} attending`}
              color="secondary"
              variant="filled"
              className={styles.chip}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
