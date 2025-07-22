import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createExerciseSchema } from "~/types/exercise";

export const exerciseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createExerciseSchema)
    .mutation(async ({ ctx, input }) => {
      let categoryId = input.categoryId;

      // Create a new custom category if 'Other'
      if (!categoryId && input.customCategory) {
        const category = await ctx.db.exerciseCategory.create({
          data: {
            name: input.customCategory,
            userId: ctx.session.user.id,
          },
        });
        categoryId = category.id;
      }

      return ctx.db.exercise.create({
        data: {
          name: input.name,
          time: input.time,
          userId: ctx.session.user.id,
          distance: input.distance,
          calories: input.calories,
          avgPace: input.avgPace,
          avgSpeed: input.avgSpeed,
          avgHeartRate: input.avgHeartRate,
          maxHeartRate: input.maxHeartRate,
          categoryId,
        },
      });
    }),

  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.exerciseCategory.findMany({
      where: { userId: ctx.session.user.id },
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
