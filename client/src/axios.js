// src/axios.js
import axios from 'axios';

export const token = localStorage.getItem('token');

export const baseURL = 'http://localhost:5000/api';

export const base = 'http://localhost:5000/';

console.log(token);


const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export default instance;
