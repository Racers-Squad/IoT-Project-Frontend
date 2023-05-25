import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {addCar} from "../../http/CarsAPI";

const CreateCar = observer(({show, onHide}) => {
    const [number, setNumber] = useState("")
    const submit = () => {
        const regex_taxi = /^[АВЕКМНОРСТУХ]{2}\d{3}(?<!000)\d{2,3}$/ui;
        const regex_car = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui
        if (regex_car.test(number) || regex_taxi.test(number)) {
            const requiest = addCar()
            alert(requiest.message)
            onHide()
        }else{
            alert("Number is incorrect!")
        }
    }
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
                <Form>
                    <Form.Control
                        onChange={e => setNumber(e.target.value)}
                        className="mt-3"
                        placeholder="Enter number of car"
                        type="text"
                    />
                    <hr/>
                </Form>
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


export default CreateCar;