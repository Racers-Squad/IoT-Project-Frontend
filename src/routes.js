import {ADMIN_PAGE, HISTORY_PAGE, LOGIN_PAGE, MAIN_PAGE, REGISTER_PAGE} from "./utils/const";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import HistoryPage from "./pages/HistoryPage";


export const publicRoutes = [
    {
        path: LOGIN_PAGE, Component: LoginPage
    },
    {
        path: REGISTER_PAGE, Component: RegisterPage
    }
]

export const authRoutes = [
    {
        path: MAIN_PAGE, Component: MainPage
    },{
    path: HISTORY_PAGE, Component: HistoryPage
    }
]

export const adminRoutes = [{
    path: MAIN_PAGE, Component: MainPage
}, {
    path: ADMIN_PAGE, Component: AdminPage
}]
