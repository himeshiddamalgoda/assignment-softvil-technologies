"use client";
import React from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { EventFormData } from "@/lib/validations/event";
import styles from "@/styles/form.module.scss"

type Props = {
  control: Control<EventFormData>;
  errors: FieldErrors<EventFormData>;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel: string;
};

export default function EventForm({
  control,
  errors,
  submitting,
  onCancel,
  onSubmit,
  submitLabel,
}: Props) {
  return (
    <form onSubmit={onSubmit}className={styles.form}>
    <Grid container spacing={2}>
      <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
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

      <Grid item size={{ xs: 12, sm: 6, md: 6 }}>
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

      <Grid item size={{ xs: 12 }}>
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

      <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
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

      <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
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

      <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
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

      <Grid item size={{ xs: 12, sm: 6 }}>
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

      
      <Grid item size={{ xs: 12, sm: 12 }}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onCancel} disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} /> : null}
            >
              {submitLabel}
            </Button>
          </Box>
        </Grid>
    </Grid>
  </form>
  );
}




