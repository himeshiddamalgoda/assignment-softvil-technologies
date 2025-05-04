import React from "react";
import { Box, Button } from "@mui/material";
import { Share } from "@mui/icons-material";
import { Attendee, Event, User } from "@/types";
interface EventActionsProps {
  event: Event;
  user: User;
  attendEvent: (eventId: string, userId: string) => void;
  cancelAttendance: (eventId: string, userId: string) => void;
}

export default function EventActions({
  event,
  user,
  attendEvent,
  cancelAttendance,
}: EventActionsProps) {
  const currentStatus = React.useMemo(() => {
    const match = event?.attendees?.find((attendee: Attendee) => attendee.userId === user?.id);
    return match?.status ?? null;
  }, [event.attendees, user?.id]);

  const handleAttend = () => {
    attendEvent(event.id, user.id);
  };

  const handleCancelAttendance = () => {
    cancelAttendance(event.id, user.id);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
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
  );
}
