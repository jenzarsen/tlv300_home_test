import axios from 'axios';
import { REQUEST_TIMEOUT } from './constant.js';
import { config } from "./index.js";

const whoIsApi = axios.create({
  baseURL: config.api.baseUrl,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': `application/json`
  }
});

export default whoIsApi;
