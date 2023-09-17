import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import swalService from '../services/swalService';
import List from '../models/List';
import ListService from '../services/listService';
import CustomNotificationService from '../services/customNotificationService';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import TaskService from '../services/taskService';
import { IoAddSharp } from 'react-icons/io5';
import Task from '../models/Task';
import Tasks from './Tasks';

function TodoList() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [formData, setFormData] = useState(null);
    const [tasks, setTasks] = useState([]);
    // const initialFormTaskData = new Task('', false, listIdCookie);
    // setFormTaskData(initialFormTaskData);
    const listIdCookie = Cookies.get('ListId');
    // const [formTaskData, setFormTaskData] = useState(new Task('', false, listIdCookie));


    useEffect(() => {
        const userCookie = Cookies.get('User');
        if (!userCookie) {
            navigate('/login');
        } else {
            const userObj = JSON.parse(userCookie);
            const userId = userObj.userLogin._id;
            const initialFormData = new List('', userId);
            setFormData(initialFormData);

            ListService.GetAllListsByUser(userId)
                .then((userLists) => {
                    setLists(userLists);
                })
                .catch((error) => {
                    console.error('Error fetching user lists:', error);
                });
        }
    }, [navigate]);

    const handleNewListClick = () => {
        swalService.InputItemAlert("Enter a New List", "Please provide a Name to the List.")
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const list = result.value;
                    ListService.AddNewList({ name: list, user: formData.user })
                        .then((response) => {
                            CustomNotificationService.showSuccessNotification(response.message);
                            setLists((prevLists) => [...prevLists, response.newList]);
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

    // const handleNewTaskClick = () => {
    //     swalService.InputItemAlert("Enter a New Task", "Please provide a Name to the Task.")
    //         .then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const task = result.value;
    //                 TaskService.AddNewTask({ name: task, list: formTaskData.list })
    //                     .then((response) => {
    //                         CustomNotificationService.showSuccessNotification(response.message);
    //                         setTasks((prevTasks) => [...prevTasks, response.newTask]);
    //                     })
    //                     .catch((error) => {
    //                         if (error.response && error.response.data && error.response.data.message) {
    //                             CustomNotificationService.showErrorNotification(error.response.data.message);
    //                         }
    //                     });
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error or cancellation:', error);
    //         });
    // };

    // const handleUpdateListClick = (id) => {
    //     swalService.InputItemAlert("Enter the list you want to update", "Please provide a Name to the List.")
    //         .then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const listName = result.value;

    //                 const listIndex = lists.findIndex((list) => list._id === id);

    //                 if (listIndex !== -1) {
    //                     const updatedLists = [...lists];

    //                     updatedLists[listIndex].name = listName;

    //                     ListService.UpdateList(id, { name: listName, user: formData.user })
    //                         .then((response) => {
    //                             CustomNotificationService.showSuccessNotification(response.message);

    //                             setLists(updatedLists);
    //                         })
    //                         .catch((error) => {
    //                             if (error.response && error.response.data && error.response.data.message) {
    //                                 CustomNotificationService.showErrorNotification(error.response.data.message);
    //                             }
    //                         });
    //                 }
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error or cancellation:', error);
    //         });
    // };



    // const handleDeleteList = async (id) => {
    //     try {
    //         await ListService.DeleteList(id).then((response) => {
    //             console.log(response);
    //             setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    //             CustomNotificationService.showSuccessNotification(response.message);
    //         })
    //     } catch (error) {
    //         console.error('Error deleting list:', error);
    //     }
    // };


    const handleListClick = async (listId) => {
        try {
            const tasks = await TaskService.GetAllTasksByList(listId);

            setTasks(tasks);
            Cookies.set('ListId', listId, { expires: 7 }); // 7 days
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-4 shadow-lg h-120 w-60">
                <h1 className='text-4xl text-blue-800 ml-16 underline'>Lists</h1>
                <div className="mt-5 overflow-y-auto h-80 overflow-x-auto">
                    <ul>
                        {lists.map((list) => (
                            <li className='mt-5 text-sm' key={list._id}>
                                <div className="bg-sky-300 text-white font-bold rounded-lg shadow-md p-3">
                                    <button
                                        className="whitespace-normal focus:outline-none"
                                        onClick={() => handleListClick(list._id)}
                                    >
                                        {list.name}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <div>
                            <button onClick={() => handleUpdateListClick(list._id)}>
                                <GrEdit />
                            </button>
                            <button onClick={() => handleDeleteList(list._id)}>
                                <RiDeleteBin6Line color="black" />
                            </button>
                        </div> */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-3
                        dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleNewListClick}>
                        New List
                    </button>
                </div>
            </div>
            {/* <div className="bg-white p-4 shadow-lg h-120 w-180 relative">
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
            </div> */}
            <Tasks />
        </div >
    );
}
export default TodoList;
