import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const LIST_URL = process.env.REACT_APP_LIST_API;

const URL = API_URL + LIST_URL;

const AddNewList = async (listData) => {
    try {
        const response = await axios.post(URL, listData);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const ListService = {
    AddNewList,
};

export default ListService;
