import React, { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const EditUser = (props) => {
    const history = useHistory();
    const [show, setShow] = useState(true);
    const fromComponentInfo = history.location.state.items; // {id: 4, first: 's', last: 'S', email: '234@gmail.com'}
    // console.log(fromComponentInfo);

    const [firstName, setFirstName] = useState(fromComponentInfo.first);
    const [lastName, setLastName] = useState(fromComponentInfo.last);
    const [email, setEmail] = useState(fromComponentInfo.email);
    const [phone, setPhone] = useState(fromComponentInfo.phone);
    const [location, setLocation] = useState(fromComponentInfo.location);
    const [hobby, setHobby] = useState(fromComponentInfo.hobby);

    const handleClose = () => {
        setShow(false);
        history.goBack();
    }

    const handleSubmit = (e) => {
        // 更新資料庫
        updateDB();
        history.goBack('/');
    }

    const updateDB = async () => {
        const id = fromComponentInfo.id;
        const data = { id: id, first: firstName, last: lastName, email: email, phone: phone, location: location, hobby: hobby }
        await axios.put('http://localhost:3000/crud', data);
    }

    const goBack = (e) => {
        history.goBack();
    }

    const updateFirstName = (value) => setFirstName(value);
    const updateLastName = (value) => setLastName(value);
    const updateEmail = (value) => setEmail(value);
    const updatePhone = (value) => setPhone(value);
    const updateLocation = (value) => setLocation(value);
    const updateHobby = (value) => setHobby(value);


    return (
        <Modal
            className="row justify-content-center"
            show={show}
            // backdrop="static"
            onHide={() => { handleClose() }}
            centered
        >
            <Modal.Header>
                Edit data
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
    );
};

export default EditUser;