// noinspection JSAnnotator
import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3000/';


const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', 
    'X-Client-Type': 'web'
  }
});


export default baseApi;
