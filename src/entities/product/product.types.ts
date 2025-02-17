import { z } from 'zod';
import { Product } from './product.contracts';

export type Product = z.infer<typeof Product>;