import axios from "axios";
export const BASE_URL = 'http://localhost:3001/api'
export const apiConnection = axios.create({
    baseURL : BASE_URL
});