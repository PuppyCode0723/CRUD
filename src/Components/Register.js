import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Register = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async () => {
        if (password === confirmPassword) {
            const input_data = {
                account: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
            }
            try {
                // console.log(input_data);
                const response = await axios.post('/api/register', input_data,
                    { headers: { "Content-Type": "application/json" } });
                console.log(response);
                history.push('http://localhost:3000/login');

            } catch (err) {
                console.log(err);
            }

        } else {
            alert("Password not correct");
        }
    }

    return (
        <Modal
            className="row justify-content-center"
            show={true}
            backdrop="static"
            centered
        >

            <Modal.Header class="card-header">Register</Modal.Header>
            <Modal.Body class="card-body">
                <form class="form-horizontal" method="post" onSubmit={handleSubmit}>

                    <div class="form-group">
                        <label for="name" class="cols-sm-2 control-label">First Name</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" class="form-control" id="name" placeholder="Wu-Shin"
                                    onChange={e => setFirstName(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="cols-sm-2 control-label">Last Name</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" class="form-control" id="name" placeholder="Lin"
                                    onChange={e => setLastName(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="cols-sm-2 control-label">Email</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
                                <input type="text" class="form-control" id="email" placeholder="123@gmail.com"
                                    onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="cols-sm-2 control-label">Password</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" class="form-control" id="password" placeholder="Enter your password"
                                    onChange={e => setPassword(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
                        <div class="cols-sm-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" class="form-control" id="confirm" placeholder="Confirm your Password"
                                    onChange={e => setConfirmPassword(e.target.value)} required />
                            </div>
                        </div>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-lg btn-block login-button" onClick={() => handleSubmit()}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Register;