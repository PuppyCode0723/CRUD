import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';

// Import components
import EditUser from './EditUser';

const UserList = (props) => {    
    const history = useHistory();
    useEffect(async () => {
        await axios.get('http://localhost:3000/crud')
            .then(res => props.setItems(res.data))
            .catch(err => console.log(err));
    }, [props.items]);

    const editUser = (e) => {
        history.push('/editUser');
    }

    const output = props.items.map(item => {
        return (
            <tr key={item.id}>
                <th scope='row'>{item.id}</th>
                <td>{item.first}</td>
                <td>{item.last}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.location}</td>
                <td>{item.hobby}</td>
                <td>
                    <Button onClick={(e) => editUser(e)}>Edit</Button>
                </td>
                <td>
                    <Button variant='danger'>Delete</Button>
                </td>
            </tr>
        )
    })

    return (
        <table class="layout display responsive-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Hobby</th>
                    <th colspan='2'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {output}
            </tbody>
        </table >
    )
}

export default UserList;
