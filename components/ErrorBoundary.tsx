'use client';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Box, Button, Typography, Paper } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Paper elevation={3} sx={{ padding: 4, margin: 4, backgroundColor: '#ffe6e6' }}>
      <Typography variant="h5" color="error" gutterBottom>
        Something went wrong.
      </Typography>
      <Typography variant="body2" sx={{ color: '#b00020', whiteSpace: 'pre-wrap' }}>
        {error.message}
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="error" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </Box>
    </Paper>
  );
}

export default function ErrorBoundary({ children }: Props) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
