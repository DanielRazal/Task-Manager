import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const USER_URL = process.env.REACT_APP_USER_API;
const URL = API_URL + USER_URL;

const RegisterUser = async (userData) => {
    try {
        const response = await axios.post(`${URL}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default RegisterUser;