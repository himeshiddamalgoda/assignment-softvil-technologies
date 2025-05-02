import { z } from "zod"

export const eventSchema = z
.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: z.string().min(3, "Location is required"),
    startDate: z.date().refine((date) => date > new Date(), "Start date must be in the future"),
    endDate: z.date(),
    capacity: z.number().int().min(1, "Capacity must be at least 1"),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })

export type EventFormData = z.infer<typeof eventSchema>
