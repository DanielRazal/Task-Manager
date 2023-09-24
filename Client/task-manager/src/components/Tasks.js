import React, { useEffect, useState } from 'react';
import swalService from '../services/swalService';
import TaskService from '../services/taskService';
import CustomNotificationService from '../services/customNotificationService';
import { IoAddSharp } from 'react-icons/io5';
import SettingsUser from './SettingsUser';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';


function Tasks({ listIdCookie }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (listIdCookie) {
            handleListClick(listIdCookie);
        } else {
            setTasks([]);
        }
    }, [listIdCookie]);


    const handleListClick = async (id) => {
        try {
            const tasks = await TaskService.GetAllTasksByList(id);
            setTasks(tasks);

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleNewTaskClick = () => {
        if (listIdCookie) {
            swalService.InputItemAlert("Enter a New Task", "Please provide a Name to the Task.")
                .then((result) => {
                    if (result.isConfirmed && result.value) {
                        const task = result.value;
                        TaskService.AddNewTask({ name: task, list: listIdCookie })
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
        }
        else {
            CustomNotificationService.showErrorNotification("Please select a valid list before performing actions.")
        }
    };


    const handleDeleteTaskClick = async (id) => {
        try {
            await TaskService.DeleteTask(id).then((response) => {
                CustomNotificationService.showSuccessNotification(response.message);
                setTasks((prevLists) => prevLists.filter((task) => task._id !== id));
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                CustomNotificationService.showErrorNotification(error.response.data.message)
                console.error('Error deleting list:', error);
            }
        }
    };

    const handleUpdateTaskClick = (id) => {
        swalService.InputItemAlert("Enter a task you want to update", "Please provide a Name to the Task.")
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const taskName = result.value;

                    const taskIndex = tasks.findIndex((task) => task._id === id);

                    if (taskIndex !== -1) {
                        const updatedtasks = [...tasks];

                        updatedtasks[taskIndex].name = taskName;

                        TaskService.UpdateTask(id, { name: taskName })
                            .then((response) => {
                                CustomNotificationService.showSuccessNotification(response.message);

                                setTasks(updatedtasks);
                            })
                            .catch((error) => {
                                if (error.response && error.response.data && error.response.data.message) {
                                    CustomNotificationService.showErrorNotification(error.response.data.message);
                                }
                            });
                    }
                }
            })
            .catch((error) => {
                console.error('Error or cancellation:', error);
            });
    };



    // const toggleTaskCompletion = async (index) => {
    //     try {
    //         const updatedTask = { ...tasks[index], isDone: !tasks[index].isDone };
    //         const response = await TaskService.UpdateTask(updatedTask._id, updatedTask);
    //     } catch (error) {
    //         console.error('Error toggling task completion:', error);
    //     }
    // };

    const toggleTaskCompletion = async (index) => {
        try {
            const updatedTasks = [...tasks];
            updatedTasks[index].isDone = !updatedTasks[index].isDone;
            setTasks(updatedTasks);
            await TaskService.UpdateTask(updatedTasks[index]._id, updatedTasks[index]);
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };


    return (
        <div className="bg-white p-4 shadow-lg h-120 w-180 relative">
            <div className="flex items-center">
                <h1 className="text-4xl text-blue-800 ml-10 underline">Tasks</h1>
                <div className="ml-auto flex space-x-4">
                    <SettingsUser />
                </div>
            </div>
            {
                tasks.length === 0 ? (
                    <p className='text-lg mt-5'>There are no tasks here! Click the add button to create a new task</p>
                ) : (
                    <div className="mt-5 overflow-y-auto h-80 overflow-x-auto">
                        <ul>
                            {tasks.map((task, index) => (
                                <li className='mt-5 text-sm relative' key={task._id}>
                                    <button
                                        className={`bg-sky-300 text-black rounded-lg shadow-md p-3 w-full text-left ${task.isDone ? 'line-through' : 'no-underline'
                                            }`}
                                        onClick={() => toggleTaskCompletion(index)}
                                    >
                                        {task.name}
                                    </button>
                                    <div className="absolute right-3 top-0 bottom-0 flex items-center">
                                        <button onClick={() => handleUpdateTaskClick(task._id)}
                                            className="bg-white w-8 h-8 flex items-center justify-center border border-black mr-2"
                                        >
                                            <AiOutlineEdit size={25} />
                                        </button>
                                        <button
                                            className="bg-red-500 w-8 h-8 flex items-center justify-center border border-black"
                                            onClick={() => handleDeleteTaskClick(task._id)}
                                        >
                                            <MdOutlineDeleteOutline size={25} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                )
            }
            <button
                className="bg-blue-500 w-11 h-11 rounded-full flex items-center justify-center
text-white absolute bottom-4 right-4" onClick={handleNewTaskClick}>
                <IoAddSharp size={30} />
            </button>
        </div >
    );
}

export default Tasks;
