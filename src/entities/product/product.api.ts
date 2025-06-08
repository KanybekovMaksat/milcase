import axios from 'axios';
import $api from '~shared/api';

const API = 'https://milcase.makalabox.com/api/';

export function getProducts() {
  return axios.get(`${API}/products/`);
}

export function getAdsProducts() {
  return axios.get(`${API}/ad-slides/`);
}

export function getFavoriteProduct(id: number) {
  return $api.get(`favorites/${id}/`);
}

export function getFavorites() {
  return $api.get(`favorites/`);
}

export function getCategories() {
  return axios.get(`${API}/categories/`);
}

export function createOrder(
  orderData: {
    orderItems: { product: number; quantity: number; isFree?: boolean }[];
    city: string;
    address: string;
    phoneNumber: string;
  }
) {
  return $api.post(`orders/me/`, orderData);
}

export function getCartInfo() {
  return $api.get('orders/me');
}

export function createPayment(orderId: number) {
  return $api.post(`create-payment/${orderId}/`);
}

export function getReccommndedProducts() {
  return $api.get(`trending-recommendations/`);
}
