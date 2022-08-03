import axios from "axios";
export const BASE_URL = '/api'
export const apiConnection = axios.create({
    baseURL : BASE_URL
});