import { getAdsProducts, getProducts } from './product.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';

const keys = {
  root: () => ['product'],
  getProducts: () => [...keys.root(), 'products'] as const,
  getAdProducts: () => [...keys.root(), 'ad-products'] as const,
};


export function useGetProducts() {
  return useQuery({
    queryKey: keys.getProducts(),
    queryFn: getProducts,
  });
}

export function useGetAdProducts(){
  return useQuery({
    queryKey: keys.getAdProducts(),
    queryFn: getAdsProducts,
  })
}