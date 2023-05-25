import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, ListGroup} from "react-bootstrap";
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.css';

const TypeBar = observer(() => {
    const {cars} = useContext(Context)
    console.log(cars.cars)
    return (<Card style={{
        width: 230, boxShadow: "5px 5px 100px 5px rgba(34, 60, 80, 0.2)", left: 0, marginLeft: 35, marginTop: 50
    }}>
        <ListGroup
            id="listGroup"
            color="primary"
            label="Категории" style={{height: 500}} activeKey="0">
            {cars.cars.map(car => <ListGroup.Item id={car.id} style={{
                height: 50, paddingBottom: 5, paddingTop: 5, cursor: "pointer"
            }}
                                                  active={car.id === cars.selectedCar.id}
                                                  onClick={() => cars.setSelectedCar(car)}
                                                  value={car.id}
                                                  key={car.id}>{car.number}   ({car.name})</ListGroup.Item>)}

        </ListGroup>
    </Card>);
});

export default TypeBar;