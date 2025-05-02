import { Box, Typography, Divider } from "@mui/material"
import {  LocationOn, Person, AccessTime, Event } from "@mui/icons-material"
import { format } from "date-fns"

interface EventInfoProps {
  event: any
}

const EventInfo = ({ event }: EventInfoProps) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {event.title}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Event color="action" sx={{ mr: 1 }} />
        <Typography variant="body1">{format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <AccessTime color="action" sx={{ mr: 1 }} />
        <Typography variant="body1">
          {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <LocationOn color="action" sx={{ mr: 1 }} />
        <Typography variant="body1">{event.location}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Person color="action" sx={{ mr: 1 }} />
        <Typography variant="body1">Hosted by {event.hostName}</Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight="bold">
        About this event
      </Typography>

      <Typography variant="body1" paragraph>
        {event.description}
      </Typography>
    </Box>
  )
}

export default EventInfo
