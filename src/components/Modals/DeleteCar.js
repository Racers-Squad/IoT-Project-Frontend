import React, {useState, useContext} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {deleteCar} from "../../http/CarsAPI";
import {Context} from "../../index";
import {Dropdown} from "@nextui-org/react";


const DeleteCar = observer(({show, onHide}) => {
    const {cars} = useContext(Context)
    const [firstCar, setFirstCar] = useState('')
    const submit = () => {
        deleteCar(firstCar).then((req) => {
            alert(req.data)
        })
        onHide()
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Car
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Button flat color="black" css={{tt: "capitalize"}}>
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={firstCar}
                        onSelectionChange={(e) => {
                            setFirstCar(e.anchorKey)
                        }}
                    >
                        {cars.cars.map((car) => <Dropdown.Item key={car.id}>{car.id}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={() => {
                    submit()
                }}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});


export default DeleteCar;