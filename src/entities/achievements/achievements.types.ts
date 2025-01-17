import { z } from 'zod';
import { AchievementSchema, RaritySchema } from './achievements.contracts';

export type RaritySchema = z.infer<typeof RaritySchema>;
export type AchievementSchema = z.infer<typeof AchievementSchema>;
