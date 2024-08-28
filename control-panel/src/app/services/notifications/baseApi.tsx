// noinspection JSAnnotator

import axios from 'axios';

const API_BASE_URL = 'https://erp.smcare.net/v0_0_3-notif';

const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Client-Type': 'web'
  }
  
});


export default baseApi;
