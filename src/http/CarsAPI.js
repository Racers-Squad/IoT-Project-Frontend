import {$host} from "./axiosAPI";

export const getAllCars = async () => {
    const {data} = await $host.get("/cars")
    return data
}
export const addCar = async (number) => {
    return await $host.post("/cars/add", {Number: number})
}
export const deleteCar = async (number) => {
    return await $host.post("cars/delete/" + number)
}