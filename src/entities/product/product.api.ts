import axios from 'axios';
import  $api  from '~shared/api';

const API = "https://milcase.makalabox.com/api"


export function getProducts() {
  return axios.get(`${API}/products/`);
}


export function getAdsProducts(){
  return axios.get(`${API}/ad-slides/`)
}

export function getFavoriteProduct(id: number) {
  return $api.get(`favorites/${id}/`);
}

export function getFavorites(){
  return $api.get(`favorites/`);
}


export function getCategories(){
  return axios.get(`${API}/categories/`)
}