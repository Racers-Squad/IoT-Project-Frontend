import jwt_decode from "jwt-decode";
import axios, {$authHost, $host} from "./axiosAPI";


export const register = async (email, password) => {
    const response = await $host.post('/register', {email, password})
    console.log(response)
    localStorage.setItem('token', response.data);
    console.log(jwt_decode(response.data))
    return jwt_decode(response.data)
}

export const login = async (email, password) => {
    const response = await $host.post('/login', {email, password})
    console.log(response)
    localStorage.setItem('token', response.data);
    return jwt_decode(response.data)
}

export const check = async () => {
    const response = await $authHost.get('/check')
    if (response.data !== "LOGOUT") {
        localStorage.setItem('token', response.data)
        return jwt_decode(response.data)
    }else{
        localStorage.setItem('token', '')
    }
}