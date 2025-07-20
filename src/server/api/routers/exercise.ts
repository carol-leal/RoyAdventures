import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        time: z.number().min(0),
        distance: z.number().optional(),
        calories: z.number().optional(),
        avgPace: z.number().optional(),
        avgSpeed: z.number().optional(),
        avgHeartRate: z.number().optional(),
        maxHeartRate: z.number().optional(),
        category: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
          category: input.category,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const exercises = await ctx.db.exercise.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return exercises ?? null;
  }),
});
