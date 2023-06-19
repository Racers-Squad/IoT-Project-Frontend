import {ADMIN_PAGE, HISTORY_PAGE, LOGIN_PAGE, MAIN_PAGE} from "./utils/const";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import HistoryPage from "./pages/HistoryPage";


export const publicRoutes = [
    {
        path: LOGIN_PAGE, Component: LoginPage
    }
]

export const authRoutes = [
    {
        path: MAIN_PAGE, Component: MainPage
    }
]

export const adminRoutes = [{
    path: MAIN_PAGE, Component: MainPage
}, {
    path: ADMIN_PAGE, Component: AdminPage
}, {
    path: HISTORY_PAGE, Component: HistoryPage
}]
