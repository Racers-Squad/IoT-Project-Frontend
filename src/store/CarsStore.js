import {makeAutoObservable} from "mobx";

export default class CarsStore {

    constructor() {
        this._cars = [{id:0, name: "solyarka", number:"ad123d/02"},{id:1, name: "jigulca", number:"zx456c/05"},{id:2, name: "polik", number:"as456s/01"}]
        this._selected = {}
        makeAutoObservable(this)
    }

    get cars() {
        return this._cars
    }

    get selectedCar() {
        return this._selected;
    }


    setSelectedCar(value) {
        this._selected = value;
    }
    setCars(cars) {
        this.cars = cars
    }


}