import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from "@mui/material"

interface DeleteDialogProps {
  open: boolean
  onClose: () => void
  onDelete: (eventId: string) => void
  deleteLoading: boolean
}

const DeleteDialog = ({ open, onClose, onDelete, deleteLoading }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Event</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this event? This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error" disabled={deleteLoading} startIcon={deleteLoading ? <CircularProgress size={20} /> : null}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
