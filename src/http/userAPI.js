import jwt_decode from "jwt-decode";
import axios, {$authHost, $host} from "./axiosAPI";


export const register = async (email, password, name, surname, phone, isAdmin) => {
    const response = await $host.post('/register', {email, password, name, surname, phone, isAdmin})
}

export const login = async (email, password) => {
    const response = await $host.post('/login', {email, password})
    localStorage.setItem('token', response.data);
    return jwt_decode(response.data)
}

export const check = async () => {
    const response = await $authHost.get('/check')
    if (response.data !== "LOGOUT") {
        localStorage.setItem('token', response.data.token)
        return [jwt_decode(response.data.token), response.data.reservationId]
    } else {
        localStorage.setItem('token', '')
    }
}