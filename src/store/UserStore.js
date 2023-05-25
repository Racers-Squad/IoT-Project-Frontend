import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = true
        this._isAdmin = true
        this._user = {email: ''}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
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