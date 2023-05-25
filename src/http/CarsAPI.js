import {$host} from "./axiosAPI";

export const getAllCars = async () => {
    // const {data} = await $host.get("/cars")
    // return data
}
export const addCar = async (number, brand) => {
    return await $host.post("/cars/add", {carNumber: number, carBrand: brand})
}
export const deleteCar = async (number) => {
    return await $host.post("cars/delete/" + number)
}

export const getCarInfo = async (number) => {
    const {data} = await $host.get("/car", {params: {carNumber: number}})
}