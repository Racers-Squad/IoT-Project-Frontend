import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {email: '',reservationId: ''}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setReservationId(id){
        this._user.reservationId =  id
    }


    setUser(user) {
        this._user = user
    }

    setIsAdmin(admin){
        this._isAdmin =admin
    }

    get isAdmin(){
       return this._isAdmin
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}