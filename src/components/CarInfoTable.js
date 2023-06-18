import React, {useContext, useEffect, useState} from 'react';
import {getCarInfo} from "../http/CarsAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import CarTable from "./CarTable";

const CarInfoTable = observer(() => {
    const {cars} = useContext(Context)
    const [data, setData] = useState({})
    return (
        <div>
            <CarTable/>
        </div>
    );
});

export default CarInfoTable;