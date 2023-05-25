import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {LOGIN_PAGE, MAIN_PAGE} from "../utils/const";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';
import {Context} from "../index";
import {$authHost} from "../http/axiosAPI";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const {data} = $authHost.get("/admin")
    user.setIsAdmin(true)
    return (<Switch>
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>)}
            {user.isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component}
                                                                         exact/>)}
            {user.isAdmin && adminRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component}
                                                                           exact/>)}
            {user.isAuth ? <Redirect to={MAIN_PAGE}/> : !user.isAuth && <Redirect to={LOGIN_PAGE}/>}
        </Switch>

    );
});

export default AppRouter;