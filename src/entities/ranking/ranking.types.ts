import { z } from 'zod';
import { GroupRanking, UserRanking } from './ranking.contracts';

export type GroupRanking = z.infer<typeof GroupRanking>;
export type UserRanking = z.infer<typeof UserRanking>;
