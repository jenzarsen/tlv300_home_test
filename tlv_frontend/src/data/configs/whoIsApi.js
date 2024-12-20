import axios from "axios";
import { REQUEST_TIMEOUT, API_HEADERS } from "./constant";

// Create axios instance with default config
const whoIsApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: API_HEADERS,
    timeout: REQUEST_TIMEOUT,
    // Add error handling and retry logic
    validateStatus: (status) => status >= 200 && status < 500,
});


export default whoIsApi;