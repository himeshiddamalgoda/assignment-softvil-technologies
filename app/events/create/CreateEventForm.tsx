"use client";

import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventFormData, eventSchema } from "@/lib/validations/event";
import styles from "@/styles/form.module.scss";

type Props = {
  onSubmit: (data: EventFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  onSuccessClose: () => void;
};

export function CreateEventForm({
  onSubmit,
  loading,
  error,
  success,
  onSuccessClose,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startDate: new Date(Date.now() + 86400000),
      endDate: new Date(Date.now() + 90000000),
      capacity: 50,
      imageUrl: "/placeholder.svg?height=300&width=600",
    },
  });

  const handleFormSubmit = async (data: EventFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Paper elevation={3} className={styles.container}>
      {error && (
        <Alert severity="error" className={styles.alert}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <Grid container spacing={2}>
          <Grid component='div' size={{ xs: 12, sm: 6, md: 6 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Event Title"
                  size="small"
                  fullWidth
                  required
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12, sm: 6, md: 6 }}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
                  size="small"
                  fullWidth
                  required
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Event Description"
                  size="small"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="Start Date & Time"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      required: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label="End Date & Time"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      required: true,
                      error: !!errors.endDate,
                      helperText: errors.endDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="capacity"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <TextField
                  {...field}
                  label="Capacity"
                  type="number"
                  fullWidth
                  required
                  size="small"
                  value={value}
                  onChange={(e) =>
                    onChange(Number.parseInt(e.target.value) || 0)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Max</InputAdornment>
                    ),
                  }}
                  error={!!errors.capacity}
                  helperText={errors.capacity?.message}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12, sm: 6 }}>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL (optional)"
                  size="small"
                  fullWidth
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                />
              )}
            />
          </Grid>

          <Grid component='div' size={{ xs: 12 }} className={styles.actions}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "Create Event"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={onSuccessClose}
        message="Event created successfully!"
      />
    </Paper>
  );
}
