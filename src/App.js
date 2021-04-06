import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

// Import components
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Nav from './Components/Nav';
import EditUser from './Components/EditUser';
import CreateUser from './Components/CreateUser';

function App() {
  // const [name, setName] = useState('');
  const name = useRef("");
  const [items, setItems] = useState([]);

  const addItemToState = (item) => {
    setItems([...items, item]);
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id);
    const newArray = [
      ...items.slice(0, itemIndex),
      item,
      ...items.slice(itemIndex + 1)
    ]
    setItems(newArray);
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  }

  useEffect(() => {
    (
      async () => {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api', { token }, { headers: { 'Content-Type': 'application/json' } });
        // setName(response.data.name); /**useEffect method */    

        // await setValue(response.data.user);
        if (response.data.user) {
          name.current = response.data.user.first_name + " " + response.data.user.last_name; /** useRef method */

          fetch('http://localhost:3000/crud')
            .then(res => setItems(res.data))
            .catch(err => console.log(err));
        } else {
          name.current = "";
        }
      }
    )();
  });

  return (
    <div className="App">
      <Nav name={name} />
      <main className="form-signin">
        <Switch className='form-signin'>
          <Route path="/" exact component={() => <Home name={name} items={items} setItems={setItems} />} />
          <Route path="/login" component={() => <Login name={name} />} />
          <Route path="/register" component={() => <Register />} />
          <Route path="/editUser" component={() => <EditUser />} />
          <Route path='/createUser' component={() => <CreateUser />} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
