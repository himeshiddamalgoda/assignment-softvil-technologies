import { Attendee } from "@/lib/mock-data"
import { Box, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Chip } from "@mui/material"
import styles from "@/styles/eventdetail.module.scss";

interface AttendeesListProps {
  event: any
}

const AttendeesList = ({ event }: AttendeesListProps) => {
  return (
    <Paper elevation={1} sx={{ px: 3,mt:2, height: "100%" }} className={styles.containerAttendee}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Attendees ({event.attendees.filter((a:Attendee) => a.status === "confirmed").length}/{event.capacity})
      </Typography>

      {event.attendees.length > 0 ? (
        <List>
          {event.attendees
            .filter((attendee:Attendee) => attendee.status === "confirmed")
            .map((attendee:Attendee) => (
              <ListItem key={attendee.userId} disablePadding sx={{ mb: 1 }}>
                <ListItemAvatar>
                  <Avatar src={attendee.avatarUrl || "/placeholder.svg?height=40&width=40"} />
                </ListItemAvatar>
                <ListItemText primary={attendee.userName} />
              </ListItem>
            ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No attendees yet. Be the first to attend!
        </Typography>
      )}

      {event.attendees.some((a:Attendee) => a.status === "pending") && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Pending ({event.attendees.filter((a:Attendee) => a.status === "pending").length})
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {event.attendees
              .filter((a:Attendee) => a.status === "pending")
              .map((attendee:Attendee) => (
                <Chip key={attendee.userId} label={attendee.userName} size="small" variant="outlined" />
              ))}
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default AttendeesList
