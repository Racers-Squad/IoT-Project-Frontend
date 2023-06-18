import React, {useContext, useEffect, useState} from 'react';
import {Col, Row, Table} from "react-bootstrap";
import {getCarInfo} from "../http/CarsAPI";
import {Context} from "../index";
import {Button} from "@nextui-org/react"
import {$host} from "../http/axiosAPI";

const CarTable = () => {
    const [params, setParams] = useState({})
    const [info, setInfo] = useState({})
    const [tripInfo, setTripInfo] = useState({})
    const {cars} = useContext(Context)
    const {user} = useContext(Context)
    const req = () => {
        getCarInfo(cars.selectedCar.id).then((data) => {
                if (data.parameters !== []) {
                    setParams(data.carParameters.parameters)
                    setInfo(data.carInfoResponse)
                }
            }
        )
        const interval = setInterval(() => {
            getCarInfo(cars.selectedCar.id).then((data) => {
                setParams(data.carParameters.parameters);
                setInfo(data.carInfoResponse)
            })
        }, 1000);
        return () => clearInterval(interval);
    }
    useEffect(() => {
        setTimeout(req, 1000)
    }, []);

    const reserved = () => {
        $host.post("/reservation/start", {carId: cars.selectedCar.id, email: user.user.email}).then((data) => {
            user.setReservationId(data.data.id)
        })
        console.log(user.user)
    }
    const unreserved = () => {
        $host.post("/reservation/stop", null, {params: {reservationId: user.user.reservationId}}).then((data) => {
            if (data.data) {
                user.setReservationId(null)
            } else {
                alert(data.data)
            }
        })

    }
    const startTrip = () => {
        $host.get("/trip/start/" + info.id).then((data) => {
            setTripInfo(data.data)
        })

    }
    const endTrip = () => {
        $host.get("/trip/end/" + info.id).then((data) => {
            setTripInfo(data.data)
        })

    }
    return (
        <Col style={{margin: 60}}>
            <h5>
                Номер машины: {info.id}
            </h5>
            <h5>
                Бренд машины: {info.carBrand}
            </h5>
            <h5>
                Год машины: {info.year}
            </h5>
            <h5 style={{color: info.status === "Свободно" ? "limegreen" : "red"}}>
                <span style={{color: "black"}}>Статус: </span>{info.status}
            </h5>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(params).map((data) => <tr>
                        <td key={data[0]}>{data[0]}</td>
                        <td key={data[1]}>{data[1]}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Row style={{display: "flex", margin: 30}}>
                <Button disabled={!(info.status === "Свободно" && user.user.reservationId == null)} shadow
                        color="gradient" auto rounded ghost flat style={{flexGrow: 1}} onClick={() => {
                    reserved()
                }}>
                    Зарезервировать
                </Button>
                <Button
                    disabled={!(info.status === "Занято" && info.reservation === user.user.reservationId && info.reservation != null && user.user.reservationId != null)}
                    shadow
                    color="gradient" auto rounded ghost flat style={{flexGrow: 1}} onClick={() => {
                    unreserved()
                }}>
                    Отдать
                </Button>
            </Row>
            {info.status === "Занято" && info.reservation === user.user.reservationId && info.reservation != null && user.user.reservationId != null &&
                <Row>
                    <Col style={{display: "flex", margin: 30}}>
                        <Button disabled={tripInfo.endTime === null} shadow
                                color="gradient" auto rounded ghost flat
                                style={{flexGrow: 1}}
                                onClick={() => {
                                    startTrip()
                                }}>
                            Начать поездку
                        </Button>
                        <Button disabled={tripInfo.endTime !== null}
                                shadow
                                color="gradient" auto rounded ghost flat style={{flexGrow: 1}} onClick={() => {
                            endTrip()
                        }}>
                            Закончить поездку
                        </Button>
                    </Col>
                    <Row style={{display: "flex"}}>
                        <h4> Начальная локация: {tripInfo.startLocation}</h4>
                        <h4> Начальное время: {tripInfo.startTime}</h4>
                        <h4> Конечная локация: {tripInfo.endLocation}</h4>
                        <h4> Конечное время: {tripInfo.endTime}</h4>
                    </Row>
                </Row>}
        </Col>
    );
};

export default CarTable;