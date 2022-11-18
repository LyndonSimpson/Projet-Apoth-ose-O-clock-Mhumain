import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

export function setToken(token) {
  // sauvegarder le token dans l'instance
  // comme ca, apresè avoir appellé setToken, on peux faire nos requetes sans rien préciser avec l'instance et elles vont toute
  // s'accompagner du Header Authorization
  apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeToken() {
  apiInstance.defaults.headers.common.Authorization = '';
}

export default apiInstance;
