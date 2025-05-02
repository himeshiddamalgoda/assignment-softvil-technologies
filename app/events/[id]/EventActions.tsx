import { Box, Button, CircularProgress } from "@mui/material"
import { Share } from "@mui/icons-material"

interface EventActionsProps {
  event: any
  user: any
  attendLoading: boolean
  attendEvent: (eventId: string, userId: string) => void
  cancelAttendance: (eventId: string, userId: string) => void
}

const EventActions = ({ event, user, attendLoading, attendEvent, cancelAttendance }: EventActionsProps) => {
  const isAttending = event.attendees.some(
    (attendee) => attendee.userId === user?.id && attendee.status === "confirmed"
  )
  const isPending = event.attendees.some((attendee) => attendee.userId === user?.id && attendee.status === "pending")
  const isCancelled = event.attendees.some(
    (attendee) => attendee.userId === user?.id && attendee.status === "cancelled"
  )

  const handleAttend = () => {
    attendEvent(event.id, user.id)
  }

  const handleCancelAttendance = () => {
    cancelAttendance(event.id, user.id)
  }

  return (
    <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
      {!isAttending && !isPending && !isCancelled ? (
        <Button
          variant="contained"
          size="large"
          disabled={attendLoading}
          onClick={handleAttend}
          startIcon={attendLoading ? <CircularProgress size={20} /> : null}
        >
          Attend Event
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="error"
          size="large"
          disabled={attendLoading}
          onClick={handleCancelAttendance}
          startIcon={attendLoading ? <CircularProgress size={20} /> : null}
        >
          {isCancelled ? "Cancelled" : "Cancel Attendance"}
        </Button>
      )}
      <Button variant="outlined" startIcon={<Share />} onClick={() => navigator.clipboard.writeText(window.location.href)}>
        Share
      </Button>
    </Box>
  )
}

export default EventActions
