import React from "react"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material"
import { Event as EventIcon, LocationOn, Person } from "@mui/icons-material"
import { format } from "date-fns"
import { Event } from "@/types"

interface EventCardProps {
  event: Event
  onClick: () => void 
  showAttendees?: boolean
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, showAttendees = false }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={onClick}> 
        <CardMedia
          component="img"
          height="140"
          image={event.imageUrl || "/placeholder.svg?height=140&width=300"}
          alt={event.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" noWrap>
            {event.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <EventIcon fontSize="small" sx={{ mr: 1 }} color="action" />
            <Typography variant="body2" color="text.secondary">
              {format(new Date(event.startDate), "MMM d, yyyy • h:mm a")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn fontSize="small" sx={{ mr: 1 }} color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {event.location}
            </Typography>
          </Box>

          {showAttendees ? (
            <Typography variant="body2" color="primary">
              {event.attendees?.length ?? 0} attendees
            </Typography>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Person fontSize="small" sx={{ mr: 1 }} color="action" />
              <Typography variant="body2" color="text.secondary">
                {event.hostName}
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default EventCard
