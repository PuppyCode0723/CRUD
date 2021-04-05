import React, { useState, useRef } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, Redirect, withRouter } from 'react-router-dom';


const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [redirect, setRedirect] = useState(false);
    const redirect = useRef(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/login', JSON.stringify({ email: email, password: password }),
            { headers: { "Content-Type": "application/json" } });


        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.user.first_name + response.data.user.last_name);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        // setRedirect(d => !d);
        redirect.current = true;
        props.name.current = response.data.user.first_name + " " + response.data.user.last_name;

        if (redirect.current) {
            // return <Redirect to='/' />;
            history.push('/');
        }
    }

    return (
        <Modal
            show={true}
            backdrop="static"
            centered
        >
            <Modal.Header>
                <Modal.Title className="h3 mb-3 fw-normal">Please sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className='form-group' controlId="formBasicEmail">
                        <FormLabel>Email</FormLabel>
                        <FormControl type='email' className='form-control' placeholder='Email'
                            onChange={e => setEmail(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className='form-group'>
                        <FormLabel>Password</FormLabel>
                        <FormControl type='password' className='form-control' placeholder='Password'
                            onChange={e => setPassword(e.target.value)} required />
                    </FormGroup>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' className="w-25 btn btn-lg" onClick={e => { handleSubmit(e) }}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;