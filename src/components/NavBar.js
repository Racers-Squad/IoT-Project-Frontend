import React, {useContext} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ADMIN_PAGE, HISTORY_PAGE, LOGIN_PAGE, MAIN_PAGE} from "../utils/const";
import 'bootstrap/dist/css/bootstrap.css';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()


    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }

    return (
        <Navbar bg="dark" variant="light" className="align-items-end">
            <Nav className="justify-content-center me-auto">
                <Button variant="light" onClick={() => {
                    history.push(MAIN_PAGE)
                }} style={{marginLeft: 20, textDecoration: 'none'}}
                >Main</Button></Nav>
            <Nav className="justify-content-center">
                <Button variant="light" onClick={() => {
                    history.push(HISTORY_PAGE)
                }} style={{marginRight: 20, textDecoration: 'none'}}
                >History</Button></Nav>
            {user.isAuth && user.isAdmin && <Nav><Button variant="light" style={{marginRight: 30}} onClick={() => {
                history.push(ADMIN_PAGE)
            }}>Админ панель</Button></Nav>}
            <Nav
                className="flex-column me-3" style={{float: "right"}}>
                {!user.isAuth && <Button variant="light" onClick={() => {
                    history.push(LOGIN_PAGE)
                }}
                                         style={{width: 80}}>Вход</Button>}
                {user.isAuth &&
                    <div><h5
                        style={{float: "left", marginRight: 10, color: "white", marginTop: 6}}>{user.user.email}</h5>
                        <Button variant="light"
                                style={{marginLeft: 10}}
                                onClick={() => {
                                    logout()
                                }}>Выход</Button>
                    </div>}
            </Nav>

        </Navbar>);
});

export default NavBar;