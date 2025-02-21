import {
  getAdsProducts,
  getCategories,
  getFavoriteProduct,
  getFavorites,
  getProducts,
} from './product.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const keys = {
  root: () => ['product'],
  category:() => ['category'],
  getProducts: () => [...keys.root(), 'products'] as const,
  getAdProducts: () => [...keys.root(), 'ad-products'] as const,
  getFavoriteProducts: () => [...keys.root(), 'fav'] as const,
  getCategories: () => [...keys.category(), 'categories'] as const,
  favProduct: (id: number) => [...keys.root(), 'favorite', id] as const,

};

export function useGetProducts() {
  return useQuery({
    queryKey: keys.getProducts(),
    queryFn: getProducts,
  });
}

export function useGetAdProducts() {
  return useQuery({
    queryKey: keys.getAdProducts(),
    queryFn: getAdsProducts,
  });
}

export function useFavoriteProduct(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.favProduct(id),
    mutationFn: () => getFavoriteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.favProduct(id) });
      await queryClient.invalidateQueries({ queryKey: keys.root() });
    },
  });
}

export function useGetFavoriteProducts() {
  return useQuery({
    queryKey: keys.getFavoriteProducts(),
    queryFn: getFavorites,
  });
}

export function useGetCategories() {
  return useQuery({
    queryKey: keys.getCategories(),
    queryFn: getCategories,
  });
}
