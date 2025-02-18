import axios from 'axios';

const API = "https://milcase.makalabox.com/api"


export function getProducts() {
  return axios.get(`${API}/products/`);
}


export function getAdsProducts(){
  return axios.get(`${API}/ad-slides/`)
}

