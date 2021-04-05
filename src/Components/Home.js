import React, { useEffect, useState } from 'react';
import isLoggedIn from '../helper/isLogin.js';
import { Button, Form, FormControl, FormGroup, FormLabel, Table } from 'react-bootstrap';

/** Import Component */
import UserList from './UserList'

const Home = (props) => {
    return (
        // 結束之後要換成這個
        //  {(isLoggedIn() && props.name.current) ? <UserList /> :'You are not logged in' }
        <div>
            {(isLoggedIn() && props.name.current) ? "You are not logged in " : 'Pass'}
        </div>
    );
};

export default Home;
