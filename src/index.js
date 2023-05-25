import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import CarsStore from "./store/CarsStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Context.Provider value={{
    user: new UserStore(),
    cars: new CarsStore()
}}>
    <App/>
</Context.Provider>);
