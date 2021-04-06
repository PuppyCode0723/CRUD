import React, { useState, useEffect, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { CSVLink } from 'react-csv';

// Import components
import EditUser from './EditUser';

const UserList = (props) => {
    const history = useHistory();
    const [items, setItems] = useState([])
    // const items = useRef([]);
    useEffect(async () => {
        await axios.get('http://localhost:3000/crud')
            .then(res => setItems(res.data))
            .catch(err => console.log(err));
    }, []);

    const editUser = (e) => {
        //items: items, setItems: setItems, index: index
        let index = e.target.value;
        history.push('/editUser', { items: items[index] });
    }

    const insertUser = async (e) => {
        history.push('/createUser');
    }

    const delUser = async (e) => {
        let index = e.target.value;
        let id = items[index].id;
        if (window.confirm('Are you sure to delete this data?')) {
            await axios.delete('http://localhost:3000/crud', { data: { id: id } });
        }
        history.push('/');
    }

    const output = items.map((item, index) => {
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
                    <Button value={index} onClick={(e) => editUser(e)}>Edit</Button>
                </td>
                <td>
                    <Button value={index} variant='danger' onClick={(e) => delUser(e)}>Delete</Button>
                </td>
            </tr>
        )
    })
    return (
        <div>
            <div>
                Hi, {props.name}
            </div>
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
                    <th class='button'>
                        <Button variant='dark' onClick={(e) => insertUser(e)}>
                            Create
                        </Button>
                    </th>
                    <th class='button'>
                        <CSVLink
                            filename={'db.csv'}
                            color='primary'
                            style={{ float: "left", marginRight: "10px" }}
                            className='btn btn-primary'
                            data={items}
                        >
                            Download
                        </CSVLink>
                    </th>
                </tbody>
            </table >

        </div>
    )
}

export default UserList;
