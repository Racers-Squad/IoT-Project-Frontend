import React, {useEffect, useState} from 'react';
import {Col, Row, Container, Table, Card} from "react-bootstrap";
import "./css/LoginPage.css"
import 'bootstrap/dist/css/bootstrap.css';
import {Dropdown, Input, Radio, Button} from "@nextui-org/react";
import {$host} from "../http/axiosAPI";


const HistoryPage = () => {
    const [users, setUsers] = useState([])
    const [cars, setCars] = useState([])
    const [firstUser, setFirstUser] = useState('')
    const [firstCar, setFirstCar] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [checked, setChecked] = useState('Trip');
    const [anal, setAnal] = useState("")
    const [pressed, setPressed] = useState(false)

    useEffect(() => {
        $host.get('/users').then((e) => {
            setUsers(e.data)
            setFirstUser(users[0].second)
        })
        $host.get('/cars').then((e) => {
            setCars(e.data)
            setFirstCar(cars[0].id)
        })
    }, [])

    const analyze = () => {
        setPressed(true);
        $host.get('/stats', {
            params: {
                email: firstUser.anchorKey,
                carId: firstCar.anchorKey,
                startTime: startTime,
                endTime: endTime,
                type: checked,
            },
        }).then((e) => {
            setAnal(e.data);
        });
    };
    return (<Container>
            <Col>
                <Col style={{display: "flex"}}>
                    <Dropdown>
                        <Dropdown.Button flat color="secondary" css={{tt: "capitalize", margin: 10}}>
                            {firstUser}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            disallowEmptySelection
                            color="secondary"
                            selectionMode="single"
                            selectedKeys={firstUser}
                            onSelectionChange={setFirstUser}>
                            {users.map((user) => {
                                return <Dropdown.Item key={user.second}>{user.second}</Dropdown.Item>;
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Button flat color="secondary" css={{tt: "capitalize", margin: 10}}>
                            {firstCar}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            disallowEmptySelection
                            color="secondary"
                            selectionMode="single"
                            selectedKeys={firstCar}
                            onSelectionChange={setFirstCar}
                        >
                            {cars.map((car) => {
                                return <Dropdown.Item key={car.id}>{car.id}</Dropdown.Item>;
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Row> <Input
                    value={startTime}
                    onChange={(e) => {
                        setStartTime(e.target.value)
                    }}
                    size="lg"
                    placeholder="Start Time"
                /> <Input
                    value={endTime}
                    onChange={(e) => {
                        setEndTime(e.target.value)
                    }}
                    size="lg"
                    placeholder="End Time"
                /></Row>
                <Row>
                    <Radio.Group defaultValue="primary"
                                 label="Type of statistics"
                                 value={checked}
                                 onChange={setChecked}
                                 labelColor="secondary"
                                 size="lg"
                                 css={{margin: 20}}
                    >
                        <Radio value="TRIPS" color="secondary" labelColor="secondary">Trips</Radio>
                        <Radio value="RESERVATIONS" color="secondary" labelColor="secondary">Reservation</Radio>
                    </Radio.Group>
                </Row>
                <Button color="secondary" css={{margin: 20}} onClick={() => {
                    analyze()
                }}> Analyze</Button>
            </Col>
            <Col style={{margin: 20}}>

                {pressed &&
                    !!anal &&
                    anal.details.map((stat, index) => (
                        <Card style={{padding: 20, margin: 15}}>
                            <div style={{display: "flex"}}>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                    <h3>USER</h3>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(stat.user).map((data) => <tr>
                                            <td key={data[0]}>{data[0]}</td>
                                            <td key={data[1]}>{data[1]}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                    <h3>Car</h3>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(stat.car).map((data) => <tr>
                                            <td key={data[0]}>{data[0]}</td>
                                            <td key={data[1]}>{data[1]}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td>StartTime</td>
                                        <td>{stat.startTime}</td>
                                    </tr>
                                    <tr>
                                        <td>EndTime</td>
                                        <td>{stat.endTime}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    ))}

                {pressed && !!anal && (<Card style={{padding: 20, margin: 15}}>
                        <Table striped bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(anal.stats).map((data) => <tr>
                                    <td key={data[0]}>{data[0]}</td>
                                    <td key={data[1]}>{data[1]}</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card>
                )}
            </Col>
        </Container>
    )
        ;
};

export default HistoryPage;