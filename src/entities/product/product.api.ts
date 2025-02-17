import axios from 'axios';

const API = "https://milcase.makalabox.com/api"


export function getProducts() {
  return axios.get(`${API}/products/`);
}
