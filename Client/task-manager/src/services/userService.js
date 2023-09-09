import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const USER_URL = process.env.REACT_APP_USER_API;
const LOGIN_URL = process.env.REACT_APP_LOGIN_API;
const REGISTER_URL = process.env.REACT_APP_REGISTER_API;

const URL = API_URL + USER_URL;

const RegisterUser = async (userData) => {
    try {
        const response = await axios.post(URL + REGISTER_URL, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const LoginUser = async (userData) => {
    try {
        const response = await axios.post(URL + LOGIN_URL, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const UserService = {
    RegisterUser,
    LoginUser
};

export default UserService;
