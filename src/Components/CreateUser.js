import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const CreateUser = (props) => {
    const history = useHistory();
    const [show, setShow] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [hobby, setHobby] = useState('');

    const updateFirstName = (value) => setFirstName(value);
    const updateLastName = (value) => setLastName(value);
    const updateEmail = (value) => setEmail(value);
    const updatePhone = (value) => setPhone(value);
    const updateLocation = (value) => setLocation(value);
    const updateHobby = (value) => setHobby(value);

    const handleSubmit = (e) => {
        // 新增使用者資料
        insertDB();
        history.goBack('/');
    }

    const handleClose = () => {
        setShow(false);
        history.goBack();
    }

    const insertDB = async () => {
        let data = { first: firstName, last: lastName, email, phone, location, hobby };
        await axios.post('http://localhost:3000/crud', data);
    }

    const goBack = (e) => {
        history.goBack();
    }

    return (
        <Modal
            className="row justify-content-center"
            show={show}
            // backdrop="static"
            onHide={() => { handleClose() }}
            centered
        >
            <Modal.Header>
                Create data
        </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { handleSubmit(e) }}>
                    <FormGroup>
                        <FormLabel for="first_name">First Name</FormLabel>
                        <FormControl
                            type='text'
                            className='form-control'
                            name="first_name"
                            onChange={(e) => updateFirstName(e.target.value)}
                            value={firstName} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for="last_name">Last Name</FormLabel>
                        <FormControl
                            type='text'
                            className='form-control'
                            name="last_name"
                            onChange={(e) => updateLastName(e.target.value)}
                            value={lastName} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for="email">Email</FormLabel>
                        <FormControl
                            type='email'
                            className='form-control'
                            name="email"
                            onChange={(e) => updateEmail(e.target.value)}
                            value={email} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for="phone">Phone</FormLabel>
                        <FormControl
                            type='text'
                            className='form-control'
                            name="phone"
                            onChange={(e) => updatePhone(e.target.value)}
                            value={phone} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for="location">Location</FormLabel>
                        <FormControl
                            type='text'
                            className='form-control'
                            name="location"
                            onChange={(e) => updateLocation(e.target.value)}
                            value={location} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel for="hobby">Hobby</FormLabel>
                        <FormControl
                            type='text'
                            className='form-control'
                            name="hobby"
                            onChange={(e) => updateHobby(e.target.value)}
                            value={hobby} />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={e => handleSubmit(e)}>
                    Submit
            </Button>
                <Button variant='info' onClick={e => goBack(e)}>
                    Back
            </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default CreateUser;