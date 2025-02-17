import { getProducts } from './product.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';

const keys = {
  root: () => ['product'],
  getProducts: () => [...keys.root(), 'products'] as const,
};


export function useGetRankingByGroups() {
  return useQuery({
    queryKey: keys.getProducts(),
    queryFn: getProducts,
  });
}

