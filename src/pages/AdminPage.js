import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import "./css/AdminPage.css"
import CreateCar from "../components/Modals/CreateCar";
import DeleteCar from "../components/Modals/DeleteCar";

const AdminPage = () => {
    const [addCarVisible, setAddCarVisible] = useState(false)
    const [deleteCarVisible, setDeleteCarVisible] = useState(false)
    return (<Container className="d-flex flex-column">
            <Row>
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
                </Col>
            </Row>

        </Container>

    );
};

export default AdminPage;