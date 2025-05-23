import { get } from 'http';
import {
  createOrder,
  createPayment,
  getAdsProducts,
  getCartInfo,
  getCategories,
  getFavoriteProduct,
  getFavorites,
  getProducts,
  getReccommndedProducts,
} from './product.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const keys = {
  root: () => ['product'],
  category: () => ['category'],
  cart: () => ['cart'],
  createOrder: () => [...keys.root(), 'create'] as const,
  getCart: () => [...keys.root(), 'cart-info'] as const,
  getProducts: () => [...keys.root(), 'products'] as const,
  getAdProducts: () => [...keys.root(), 'ad-products'] as const,
  getFavoriteProducts: () => [...keys.root(), 'fav'] as const,
  getCategories: () => [...keys.category(), 'categories'] as const,
  favProduct: (id: number) => [...keys.root(), 'favorite', id] as const,
  getReccommndedProducts: () =>
    [...keys.root(), 'recommended'] as const,
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

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.createOrder(),
    mutationFn: createOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.cart() });
    },
  });
}

export function useGetCart() {
  return useQuery({
    queryKey: keys.getCart(),
    queryFn: getCartInfo,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.createOrder(),
    mutationFn: createPayment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: keys.cart() });
    },
  });
}


export function useGetReccommndedProducts() {
  return useQuery({
    queryKey: keys.getReccommndedProducts(),
    queryFn: getReccommndedProducts
  });
}