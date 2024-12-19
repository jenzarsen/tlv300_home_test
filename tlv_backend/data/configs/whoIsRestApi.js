import axios from 'axios';
import { REQUEST_TIMEOUT } from './constant.js';
import { config } from "./index.js";

const clashKingApi = axios.create({
  baseURL: config.api.ckBaseUrl,
  timeout: REQUEST_TIMEOUT
});

export default clashKingApi;
