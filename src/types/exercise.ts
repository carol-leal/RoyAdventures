import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().min(1),
  time: z.number().min(0),
  distance: z.number().optional(),
  calories: z.number().optional(),
  avgPace: z.number().optional(),
  avgSpeed: z.number().optional(),
  avgHeartRate: z.number().int().optional(),
  maxHeartRate: z.number().int().optional(),
  categoryId: z.string().optional(),
  customCategory: z.string().optional(),
});

export type ExerciseFormData = z.infer<typeof createExerciseSchema>;
