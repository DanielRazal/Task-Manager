import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const TASK_URL = process.env.REACT_APP_TASK_API;
const TASKS_BY_LIST_URL = process.env.REACT_APP_TASKS_BY_LIST_API;

const URL = API_URL + TASK_URL;

const AddNewTask = async (taskData) => {
    try {
        const response = await axios.post(URL, taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const GetAllTasksByList = async (id) => {
    try {
        const response = await axios.get(URL + TASKS_BY_LIST_URL + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const DeleteTask = async (id) => {
    try {
        const response = await axios.delete(URL + '/' + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const UpdateTask = async (id, taskData) => {
    try {
        const response = await axios.patch(URL + '/' + id, taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};


const TaskService = {
    AddNewTask,
    GetAllTasksByList,
    DeleteTask,
    UpdateTask
};

export default TaskService;
