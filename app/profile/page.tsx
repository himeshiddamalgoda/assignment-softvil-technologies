"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Event as EventIcon, LocationOn, Person } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { useUserStore } from "@/store/user-store"
import { useEventStore } from "@/store/event-store"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Profile() {
  const router = useRouter()
  const { user, loading: userLoading, error: userError } = useUserStore()
  const { events, loading: eventsLoading, error: eventsError } = useEventStore()
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  // Filter events
  const hostedEvents = events.filter((event) => event.hostId === user?.id)
  const attendingEvents = events.filter((event) =>
    event.attendees.some((attendee) => attendee.userId === user?.id && attendee.status === "confirmed"),
  )

  const loading = userLoading || eventsLoading
  const error = userError || eventsError

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          {error.message}
        </Alert>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          You must be logged in to view your profile
        </Alert>
        <Button variant="contained" onClick={() => router.push("/")} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Avatar
              src={user.avatarUrl || "/placeholder.svg?height=120&width=120"}
              sx={{ width: 120, height: 120, mx: { xs: "auto", md: 0 } }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {user.email}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" size="small">
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs" variant="fullWidth">
            <Tab label={`Attending (${attendingEvents.length})`} id="profile-tab-0" />
            <Tab label={`Hosting (${hostedEvents.length})`} id="profile-tab-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {attendingEvents.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                You are not attending any events yet
              </Typography>
              <Button variant="contained" onClick={() => router.push("/")} sx={{ mt: 2 }}>
                Browse Events
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {attendingEvents.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardActionArea onClick={() => handleEventClick(event.id)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={event.imageUrl || "/placeholder.svg?height=140&width=300"}
                        alt={event.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" noWrap>
                          {event.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <EventIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {format(new Date(event.startDate), "MMM d, yyyy • h:mm a")}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {event.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Person fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.hostName}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {hostedEvents.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                You are not hosting any events yet
              </Typography>
              <Button variant="contained" onClick={() => router.push("/events/create")} sx={{ mt: 2 }}>
                Create Event
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {hostedEvents.map((event) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardActionArea onClick={() => handleEventClick(event.id)}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={event.imageUrl || "/placeholder.svg?height=140&width=300"}
                        alt={event.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" noWrap>
                          {event.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <EventIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {format(new Date(event.startDate), "MMM d, yyyy • h:mm a")}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {event.location}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="primary">
                          {event.attendees.length} attendees
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Box>
    </Container>
  )
}
