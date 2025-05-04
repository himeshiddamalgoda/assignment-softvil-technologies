import React from "react";
import {  Button, Snackbar } from "@mui/material";

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
import { Share } from "@mui/icons-material";
import { Attendee, Event, User } from "@/types";
import { useEventStore } from "@/store/event-store";
interface EventActionsProps {
  event: Event;
  user: User;
}

export default function EventActions({
  event,
  user,
}: EventActionsProps) {

  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const { refetchEvent,attendanceLoading ,attendEvent, cancelAttendance } =
      useEventStore();
  React.useEffect(() => {
  console.log('first')
  }, [attendanceLoading ])
  

  const currentStatus = React.useMemo(() => {
    const match = event?.attendees?.find(
      (attendee: Attendee) => attendee.userId === user?.id
    );
    return match?.status ?? null;
  }, [event.attendees, user?.id]);

  const confirmedAttendees = React.useMemo(
      () => event?.attendees?.filter((a) => a.status === "confirmed"),
      [event.attendees]
    );
  
    const pendingAttendees = React.useMemo(
      () => event?.attendees?.filter((a) => a.status === "pending"),
      [event.attendees]
    );

  const handleAttend = async () => {
    const newEvent = {
      ...event,
      attendees: [
        {
          userId: user.id,
          userName: user.name,
          status: "confirmed" as const,
        },
      ],
    };
    await attendEvent(event.id, newEvent);
    await refetchEvent(event.id)
    setSuccessMsg("You have successfully registered for the event!");
  };

  const handleCancelAttendance = async () => {
    const newEvent = {
      ...event,
      attendees: event.attendees?.filter(a => a.userId !== user.id) || [],
    };
    await cancelAttendance(event.id, newEvent);
    await refetchEvent(event.id)
    setSuccessMsg("You have cancelled your attendance.");
  };


  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <>
    <Box sx={{ mx: 2, display: "flex", gap: 2 }}>
      {currentStatus === null ? (
        <Button
          variant="contained"
          size="small"
          onClick={handleAttend}
          aria-label="Attend Event"
        >
          Attend Event
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleCancelAttendance}
          aria-label="Cancel Attendance"
        >
          {currentStatus === "cancelled" ? "Cancelled" : "Cancel Attendance"}
        </Button>
      )}

      <Button
        variant="outlined"
        size="small"
        startIcon={<Share />}
        onClick={handleShare}
        aria-label="Share Event"
      >
        Share
      </Button>

     
    </Box>

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
     <Snackbar
     open={!!successMsg}
     autoHideDuration={3000}
     onClose={() => setSuccessMsg(null)}
     message={successMsg}
   />
   </>
  );
}
