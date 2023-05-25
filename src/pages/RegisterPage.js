import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {LOGIN_PAGE, MAIN_PAGE} from "../utils/const";
import {useHistory} from "react-router-dom";
import {register} from "../http/userAPI";
import validator from "validator/es";
import "./css/RegisterPage.css"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';


const RegisterPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        let checkBox = document.getElementById('reg_check')
        if (!validator.isEmail(document.getElementById("reg_email").value)) {
            document.getElementById("reg_err_msg").textContent = 'Uncorrect email!'
        } else if (document.getElementById("reg_pass").value === '') {
            document.getElementById("reg_err_msg").textContent = "Password can't be empty"
        } else if (document.getElementById("reg_pass").value !== document.getElementById("reg_pass1").value) {
            document.getElementById("reg_err_msg").textContent = "Repeated password incorrectly"
        } else if (!validator.isStrongPassword(document.getElementById("reg_pass").value, {minSymbols: 0})) {
            document.getElementById("reg_err_msg").textContent = "Password must consist of one lowercase, uppercase letter and number, at least 8 characters"
        } else if (!checkBox.checked) {
            document.getElementById("reg_err_msg").textContent = 'You need to accept personal data processing policies!'
        } else {
            try {
                let data = await register(email, password)
                let user1 = {email: data.sub}
                user.setUser(user1)
                user.setIsAuth(true)
                history.push(MAIN_PAGE)
            } catch (e) {
                alert(e.response)
                console.log(e)
            }
        }
    }
    return (<Container id="flex-container">
        <Card id="form" className="align-items-center">
            <h2 style={{marginTop:30, marginBottom:15}}>Регистрация</h2>
            <Form className="d-flex flex-column">
                <h5 className="mt-0">E-mail</h5>
                <Form.Control className="mb-3" id="reg_email" placeholder="Введите ваш e-mail..."
                              type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
                <h5>Придумайте пароль</h5>
                <Form.Control className="mb-3" id="reg_pass" placeholder="Введите ваш пароль..."
                              type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                <h5>Повторите пароль</h5>
                <Form.Control className="mb-3" id="reg_pass1" placeholder="Повторите ваш пароль..."
                              type="password"></Form.Control>
                <div style={{color: "red", fontSize: 20}} id="reg_err_msg"></div>
                <Row><Col md={1}><input id="reg_check" type="checkbox"/></Col><Col><h6>Я согласен с <a
                    href="https://www.securitycode.ru/personal-data/"
                    style={{color: "lightblue"}}>политикой обработки персональных
                    данных</a></h6></Col></Row>
                <Button className="w-20 align-self-center" variant="secondary" color="gray" style={{marginRight: 10}}
                        onClick={() => {
                            click()
                        }}>Finish registration!</Button>
                <a href={LOGIN_PAGE} className="align-self-center mt-3 mb-3"
                   style={{fontSize: 18, color: "black", textDecoration: "none"}}>У меня есть аккаунт</a>
            </Form>
        </Card>
    </Container>);
});

export default RegisterPage;