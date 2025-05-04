import React from "react";
import { Event} from "@/types";

import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import styles from "@/styles/eventdetail.module.scss";

interface AttendeesListProps {
  event: Event;
}

export default function AttendeesList({ event }: AttendeesListProps) {
  const confirmedAttendees = React.useMemo(
    () => event?.attendees?.filter((a) => a.status === "confirmed"),
    [event.attendees]
  );

  const pendingAttendees = React.useMemo(
    () => event?.attendees?.filter((a) => a.status === "pending"),
    [event.attendees]
  );

  return (
    <Paper
      elevation={1}
      sx={{ px: 3, mt: 2, height: "100%" }}
      className={styles.containerAttendee}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Attendees ({confirmedAttendees?.length}/{event.capacity})
      </Typography>

      {confirmedAttendees && confirmedAttendees?.length > 0 ? (
        <List>
          {confirmedAttendees?.map((attendee) => (
            <ListItem key={attendee.userId} disablePadding sx={{ mb: 1 }}>
              <ListItemAvatar>
                <Avatar
                  src={attendee.avatarUrl || "/placeholder.svg?height=40&width=40"}
                  alt={attendee.userName}
                />
              </ListItemAvatar>
              <ListItemText primary={attendee.userName || "Unnamed User"} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No attendees yet. Be the first to attend!
        </Typography>
      )}

      {pendingAttendees && pendingAttendees.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Pending ({pendingAttendees.length})
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {pendingAttendees.map((attendee) => (
              <Chip
                key={attendee.userId}
                label={attendee.userName || "Unnamed"}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
}
