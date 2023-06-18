import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Row} from "react-bootstrap";
import {$host} from "../http/axiosAPI";
import TypeBar from "../components/TypeBar";
import CarInfoTable from "../components/CarInfoTable";

const MainPage = observer(() => {
    const {cars} = useContext(Context)
    useEffect(() => {
        $host.get('/cars').then((data) => {
            cars.setCars(data.data)
            cars.setSelectedCar(data.data[0])
        })
    },[])
    return (<Row className="g-0">
            <Col md={1} className="mt-2" style={{width: 250}}>
                <TypeBar/>
            </Col>
            <Col>
                <CarInfoTable/>
            </Col>

        </Row>
    );
});

export default MainPage;