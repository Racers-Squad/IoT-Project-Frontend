import React, {useState, useContext} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {deleteCar, getAllCars} from "../../http/CarsAPI";
import {Context} from "../../index";
import {$host} from "../../http/axiosAPI";

const DeleteCar = observer(({show, onHide}) => {
    const [number, setNumber] = useState("")
    const submit = () => {
            const requiest = deleteCar(number)
            alert(requiest.message)
            onHide()
    }
    const {data} = $host.get("/cars")
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Car
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select aria-label="Default select example" onChange={(e)=>setNumber(e.target.value)}>
                    {data.map(car => <option value={car.number}>{car.number}</option>)}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={() => {
                    submit()
                }}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});


export default DeleteCar;