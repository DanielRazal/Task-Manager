import React, { useState } from 'react';
import swalService from '../services/swalService';
import TaskService from '../services/taskService';
import Cookies from 'js-cookie';
import CustomNotificationService from '../services/customNotificationService';
import { IoAddSharp } from 'react-icons/io5';
import Task from '../models/Task';


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const listIdCookie = Cookies.get('ListId');
    const [formTaskData, setFormTaskData] = useState(new Task('', false, listIdCookie));

    const handleNewTaskClick = () => {
        swalService.InputItemAlert("Enter a New Task", "Please provide a Name to the Task.")
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const task = result.value;
                    TaskService.AddNewTask({ name: task, list: formTaskData.list })
                        .then((response) => {
                            CustomNotificationService.showSuccessNotification(response.message);
                            setTasks((prevTasks) => [...prevTasks, response.newTask]);
                        })
                        .catch((error) => {
                            if (error.response && error.response.data && error.response.data.message) {
                                CustomNotificationService.showErrorNotification(error.response.data.message);
                            }
                        });
                }
            })
            .catch((error) => {
                console.error('Error or cancellation:', error);
            });
    };



    return (
        <div className="bg-white p-4 shadow-lg h-120 w-180 relative">
            <h1 className='text-4xl text-blue-800 ml-10 underline'>Tasks</h1>
            {tasks.length === 0 ? (
                <p className='text-lg mt-5'>There are no tasks here! Click the add button to create a new task</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li className='mt-5 text-sm' key={task._id}>
                            <div className="bg-sky-300 text-white font-bold rounded-lg shadow-md p-3">
                                <span className="whitespace-normal">{task.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="bg-blue-500 w-11 h-11 rounded-full flex items-center justify-center
text-white absolute bottom-4 right-4" onClick={handleNewTaskClick}>
                <IoAddSharp size={30} />
            </button>
        </div>
    );
}

export default Tasks;
