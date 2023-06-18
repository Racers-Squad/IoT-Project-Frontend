import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {addCar} from "../../http/CarsAPI";
import {Dropdown} from "@nextui-org/react";
import {Context} from "../../index";

const CreateCar = observer(({show, onHide}) => {
    const [number, setNumber] = useState("")
    const [selectedBrand, setSelectedBrand] = useState("SKODA_OCTAVIA")
    const {cars} = useContext(Context)
    const submit = () => {
        const regex_taxi = /^[АВЕКМНОРСТУХ]{2}\d{3}(?<!000)\d{2,3}$/ui;
        const regex_car = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui
        if (regex_car.test(number) || regex_taxi.test(number)) {
            const requiest = addCar(number, selectedBrand)
            console.log(requiest.data)
            if (requiest.data === "Car added.") {
                cars.addCar({id: number, carBrand: selectedBrand})
            }
            onHide()
        } else {
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
                    <Dropdown>
                        <Dropdown.Button flat color="black" css={{tt: "capitalize"}}>
                            {selectedBrand}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedBrand}
                            onSelectionChange={(e) => {
                                setSelectedBrand(e.anchorKey)
                            }}
                        >
                            <Dropdown.Item key="SKODA_OCTAVIA">SKODA_OCTAVIA</Dropdown.Item>
                            <Dropdown.Item key="HYUNDAI_SOLARIS">HYUNDAI_SOLARIS</Dropdown.Item>
                            <Dropdown.Item key="LADA_GRANTA">LADA_GRANTA</Dropdown.Item>
                            <Dropdown.Item key="RENAULT_LOGAN">RENAULT_LOGAN</Dropdown.Item>
                            <Dropdown.Item key="SKODA_RAPID">SKODA_RAPID</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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