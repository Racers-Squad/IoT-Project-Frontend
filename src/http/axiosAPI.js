import axios from "axios"
import delayAdapterEnhancer from 'axios-delay';


const $host = axios.create({
    baseURL: "http://localhost:8080",
    adapter: delayAdapterEnhancer(axios.defaults.adapter)
})

const $authHost = axios.create({
    baseURL: "http://localhost:8080"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}