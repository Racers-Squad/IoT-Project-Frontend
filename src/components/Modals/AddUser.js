import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Switch} from '@nextui-org/react';
import {register} from "../../http/userAPI";

const AddUser = observer(({show, onHide}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const regex = /^(?:\+7|8)\d{10}$/;
    const submit = () => {
        console.log(regex.test(phone))
        if (email !== '' && password !== '' && name !== '' && surname !== '' && phone !== '' && regex.test(phone)) {
            const requiest = register(email, password, name, surname, phone, isAdmin)
            console.log(requiest.data)
            if (requiest.data === "User added.") {
                alert("kefteme")
            }
            onHide()
        } else {
            alert("Ny i eblan!=)")
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
                    Add User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        onChange={e => setEmail(e.target.value)}
                        className="mt-3"
                        placeholder="Enter email"
                        type="text"
                    />
                    <hr/>
                    <Form.Control
                        onChange={e => setPassword(e.target.value)}
                        className="mt-3"
                        placeholder="Enter password"
                        type="text"
                    />
                    <hr/>
                    <Form.Control
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Enter name"
                        type="text"
                    />
                    <hr/>
                    <Form.Control
                        onChange={e => setSurname(e.target.value)}
                        className="mt-3"
                        placeholder="Enter surname"
                        type="text"
                    />
                    <hr/>
                    <Form.Control
                        onChange={e => setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Enter phone"
                        type="text"
                    />
                    <hr/>
                    <Col className='align-content-center' style={{display: "flex"}}><Row style={{marginLeft: 5}}>
                        <h3>Admin</h3></Row><Row style={{marginLeft: 30}}><Switch checked={isAdmin}
                                                                                  style={{display: "flex"}}
                                                                                  onChange={e => setIsAdmin(e.target.checked)}/></Row></Col>

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


export default AddUser;