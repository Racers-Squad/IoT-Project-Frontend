import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {Dropdown} from "@nextui-org/react";
import {$host} from "../../http/axiosAPI";
import deleteUser from "./DeleteUser";


const DeleteUser = observer(({show, onHide}) => {
    const [users, setUsers] = useState([{first: '', second: ''}])
    const [selectedUser, setSelectedUser] = useState("")
    useEffect(() => {
        $host.get('/users').then((data) => {
            if (data !== null) {
                setUsers(data.data)
            }
        })
    }, [])
    const submit = () => {
        const requiest = deleteUser(selectedUser.first)
        alert(requiest.message)
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
                    Delete User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Button flat color="black" css={{tt: "capitalize"}}>
                        {selectedUser.second}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedUser.second}
                        onSelectionChange={setSelectedUser}
                    >
                        {users.map((user) => <Dropdown.Item key={user.first}>{user.second}</Dropdown.Item>)}

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


export default DeleteUser;