import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const LIST_URL = process.env.REACT_APP_LIST_API;
const LISTS_BY_USER_URL = process.env.REACT_APP_LISTS_BY_USER_API;

const URL = API_URL + LIST_URL;

const AddNewList = async (listData) => {
    try {
        const response = await axios.post(URL, listData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const GetAllListsByUser = async (id) => {
    try {
        const response = await axios.get(URL + LISTS_BY_USER_URL + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const DeleteList = async (id) => {
    try {
        const response = await axios.delete(URL + '/' + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const ListService = {
    AddNewList,
    GetAllListsByUser,
    DeleteList
};

export default ListService;
