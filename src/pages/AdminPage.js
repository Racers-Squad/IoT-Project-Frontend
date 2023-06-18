import React, {useState} from 'react';
import {Button, Col, Container} from "react-bootstrap";
import "./css/AdminPage.css"
import CreateCar from "../components/Modals/CreateCar";
import DeleteCar from "../components/Modals/DeleteCar";
import AddUser from "../components/Modals/AddUser";
import DeleteUser from "../components/Modals/DeleteUser";

const AdminPage = () => {
    const [addCarVisible, setAddCarVisible] = useState(false)
    const [deleteCarVisible, setDeleteCarVisible] = useState(false)
    const [addUserVisible, setAddUserVisible] = useState(false)
    const [deleteUserVisible, setDeleteUserVisible] = useState(false)
    return (<Container className="d-flex flex-column">
            <Col style={{paddingLeft: 100}}>
                <Col>
                    <Button id="adm_button" type={"button"}
                            variant="secondary"
                            className="mt-4 p-2"
                            onClick={() => setAddCarVisible(true)} style={{width: 500}}>
                        Add Cars
                    </Button>
                    <CreateCar show={addCarVisible} onHide={() => setAddCarVisible(false)}/>
                </Col>
                <Col>
                    <Button id="adm_button" type={"button"}
                            variant="secondary"
                            className="mt-4 p-2"
                            onClick={() => setDeleteCarVisible(true)} style={{width: 500}}>
                        Delete Cars
                    </Button>
                    <DeleteCar show={deleteCarVisible} onHide={() => setDeleteCarVisible(false)}/>
                </Col>
                <Col>
                    <Button id="adm_button" type={"button"}
                            variant="secondary"
                            className="mt-4 p-2"
                            onClick={() => setAddUserVisible(true)} style={{width: 500}}>
                        Add User
                    </Button>
                    <AddUser show={addUserVisible} onHide={() => setAddUserVisible(false)}/>
                </Col>
                <Col>
                    <Button id="adm_button" type={"button"}
                            variant="secondary"
                            className="mt-4 p-2"
                            onClick={() => setDeleteUserVisible(true)} style={{width: 500}}>
                        Delete User
                    </Button>
                    <DeleteUser show={deleteUserVisible} onHide={() => setDeleteUserVisible(false)}/>
                </Col>
            </Col>
        </Container>

    );
};

export default AdminPage;