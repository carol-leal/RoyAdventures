import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createExerciseSchema } from "~/types/exercise";

export const exerciseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createExerciseSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.exercise.create({
        data: {
          name:
            input.name ??
            (input.category && input.date
              ? `${input.category} - ${input.date.toString()}`
              : undefined) ??
            "New Exercise",
          time: input.time,
          userId: ctx.session.user.id,
          distance: input.distance,
          calories: input.calories,
          avgPace: input.avgPace,
          avgSpeed: input.avgSpeed,
          avgHeartRate: input.avgHeartRate,
          maxHeartRate: input.maxHeartRate,
          category: input.category,
          date: input.date,
        },
      });
    }),

  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.exercise.findMany({
      where: { userId: ctx.session.user.id },
      select: { category: true },
    });
    return categories ?? null;
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const exercises = await ctx.db.exercise.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return exercises ?? null;
  }),
});
