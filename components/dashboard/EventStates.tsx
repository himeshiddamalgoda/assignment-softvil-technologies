import { Box, Typography, CircularProgress, Alert } from "@mui/material"

export function LoadingState() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
      <CircularProgress />
    </Box>
  )
}

export function ErrorState({ error }: { error: Error }) {
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      {error.message}
    </Alert>
  )
}

export function EmptyState() {
  return (
    <Box sx={{ textAlign: "center", my: 8 }}>
      <Typography variant="h6" color="text.secondary">
        No events found matching your criteria
      </Typography>
    </Box>
  )
}
