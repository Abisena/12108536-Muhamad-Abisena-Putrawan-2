import axios from "axios";

export const axiosFetcher = axios.create({
    baseURL: 'http://localhost:3000'
})