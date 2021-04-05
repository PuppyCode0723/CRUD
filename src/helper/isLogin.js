import axios from 'axios'

const isLoggedIn = async () => {
    const token = localStorage.getItem('token');
    try {
        await axios.post('http://localhost:3000/api', { token }, { headers: { 'Content-Type': 'application/json' } });
        return true;
    } catch (err) {
        return false;
    }
}

export default isLoggedIn;