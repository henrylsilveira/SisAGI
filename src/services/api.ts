import axios from "axios";

export const api = axios.create({
    baseURL: 'https://siscau.vercel.app/api'
})