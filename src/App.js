import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then((data) => {
            if (data !== "LOGOUT") {
                let user1 = {email: data[0].sub, reservationId: data[1]};
                user.setUser(user1);
                user.setIsAuth(true)
            } else {
                user.setUser('');

            }
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    if (loading) {
        <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});
export default App;
