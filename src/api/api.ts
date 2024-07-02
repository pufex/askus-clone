import axios from "axios"

const api = axios.create({
    baseURL: "https://askus-api.onrender.com",
    withCredentials: true,
})

export default api;