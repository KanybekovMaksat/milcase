import { z } from 'zod';

export const Product = z.object({
  id: z.number(),
  name: z.string(),
  price:z.string(),
  category: z.object({
    id:z.number(),
    name: z.string()
  })
});

