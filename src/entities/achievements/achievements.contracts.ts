import { z } from 'zod';


export const RaritySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const AchievementSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  photo: z.string(),
  rarity: RaritySchema,
  createdAt: z.string().datetime(),
});
