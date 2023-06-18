import {makeAutoObservable} from "mobx";

export default class CarsStore {

    constructor() {
        this._cars = []
        this._selected = {id:0}
        makeAutoObservable(this)
    }

    get cars() {
        return this._cars
    }
    setSelectedCarStatus(status){
        this._selected.status = status
    }

    get selectedCar() {
        return this._selected;
    }


    setSelectedCar(value) {
        this._selected = value;
    }
    setCars(cars) {
        this._cars = cars
    }

    addCar(car){
        this._cars.push(car)
    }
}