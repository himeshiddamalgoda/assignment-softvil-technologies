"use client";

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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";
import { Event } from "@/lib/mock-data";
import { useEventStore } from "@/store/event-store";

interface EventHeaderProps {
  event: Event;
  isHost: boolean;
}

export default function EventHeader({ event, isHost }: EventHeaderProps) {
  const router = useRouter();
  const { deleteEvent } = useEventStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const handleEdit = () => {
    router.push(`/events/edit/${event?.id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await deleteEvent(event?.id);
      setDeleteDialogOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Failed to delete event:", error);
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: 300,
          backgroundImage: `url(${
            event?.imageUrl || "/placeholder.svg?height=300&width=1200"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {isHost && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              onClick={handleEdit}
              sx={{ bgcolor: "background.paper" }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => setDeleteDialogOpen(true)}
              sx={{ bgcolor: "background.paper" }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be
            undone.
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
  );
}
