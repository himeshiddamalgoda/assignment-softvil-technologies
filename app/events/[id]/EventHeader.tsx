// components/EventHeader.tsx
"use client"

import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Event } from "@/lib/models/events"

interface EventHeaderProps {
  event: Event
  isHost: boolean
  onDelete: (eventId: string) => Promise<void>
}

export default function EventHeader({
  event,
  isHost,
  onDelete,
}: EventHeaderProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleEdit = () => {
    router.push(`/events/edit/${event?.id}`)
  }

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true)
      await onDelete(event?.id)
      setDeleteDialogOpen(false)
      router.push("/")
    } catch (error) {
      console.error("Failed to delete event:", error)
      setDeleteLoading(false)
    }
  }

  return (
    <>
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${event?.imageUrl || "/placeholder.svg?height=300&width=1200"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {isHost && (
          <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 1 }}>
            <IconButton onClick={handleEdit} sx={{ bgcolor: "background.paper" }}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => setDeleteDialogOpen(true)} sx={{ bgcolor: "background.paper" }}>
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={deleteLoading}
            startIcon={deleteLoading ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
