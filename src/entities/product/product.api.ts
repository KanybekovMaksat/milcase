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
  orderItems: { product: number; quantity: number }[]
) {
  return $api.post(`orders/me/`, { orderItems });
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
