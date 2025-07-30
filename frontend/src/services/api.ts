import axios from "axios"
import { getToken } from "../utils/token"
const BASE_URL = import.meta.env.VITE_API_URL
console.log(BASE_URL)
export const api = axios.create({
    
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }

});

api.interceptors.request.use((config) =>{
    const token = getToken();
    if (token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})