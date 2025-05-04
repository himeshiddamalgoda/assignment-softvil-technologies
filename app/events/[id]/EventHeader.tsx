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
import { Event } from "@/types";

import { useEventStore } from "@/store/event-store";
interface EventHeaderProps {
  event: Event;
  isHost: boolean;
}

export default function EventHeader({ event, isHost }: EventHeaderProps) {
  const router = useRouter();
  const { deleteEvent } = useEventStore();

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const handleEdit = () => {
    router.push(`/events/edit/${event?.id}`);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await deleteEvent(event?.id);
      setDialogOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Failed to delete event:", error);
      setDeleteLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "15px",
      }}
    >
      <Box
        sx={{
          height: 300,
          width: "100%",
          backgroundImage: `url(${
            event?.imageUrl || "/placeholder.svg?height=300&width=1200"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
        }}
      ></Box>

      {isHost && (
        <Box
          sx={{
            mt: "10px",
            display: "flex",
            gap: 5,
          }}
        >
          <IconButton onClick={handleEdit} sx={{ bgcolor: "background.paper" }}>
            <Edit />
          </IconButton>
          <IconButton
            onClick={handleDeleteClick}
            sx={{ bgcolor: "background.paper" }}
          >
            <Delete />
          </IconButton>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
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
    </Box>
  );
}
