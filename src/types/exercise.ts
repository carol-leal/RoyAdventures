import { z } from "zod";

const optionalNumber = () =>
  z
    .union([z.number(), z.nan()])
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .optional();

export const createExerciseSchema = z.object({
  name: z.string().optional(),
  time: z.number().min(0),
  distance: optionalNumber(),
  calories: optionalNumber(),
  avgPace: optionalNumber(),
  avgSpeed: optionalNumber(),
  avgHeartRate: optionalNumber(),
  maxHeartRate: optionalNumber(),
  category: z.string().min(1),
  date: z.date(),
});

export type ExerciseFormData = z.infer<typeof createExerciseSchema>;
