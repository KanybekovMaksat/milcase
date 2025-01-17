import { z } from 'zod';

export const GroupRanking = z.object({
  id: z.number(),
  name: z.string(),
  points: z.number(),
});

export const UserRanking = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string(),
  points: z.number(),
  rating: z.number(),
});
