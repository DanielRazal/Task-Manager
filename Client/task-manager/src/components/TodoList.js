import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import swalService from '../services/swalService';
import List from '../models/List';
import ListService from '../services/listService';
import CustomNotificationService from '../services/customNotificationService';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';

function TodoList() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [formData, setFormData] = useState(null);

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

    const handleUpdateListClick = (id) => {
        swalService.InputItemAlert("Enter the list you want to update", "Please provide a Name to the List.")
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const listName = result.value;

                    const listIndex = lists.findIndex((list) => list._id === id);

                    if (listIndex !== -1) {
                        const updatedLists = [...lists];

                        updatedLists[listIndex].name = listName;

                        ListService.UpdateList(id, { name: listName, user: formData.user })
                            .then((response) => {
                                CustomNotificationService.showSuccessNotification(response.message);

                                setLists(updatedLists);
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



    const handleDeleteList = async (id) => {
        try {
            await ListService.DeleteList(id).then((response) => {
                console.log(response);
                setLists((prevLists) => prevLists.filter((list) => list._id !== id));
                CustomNotificationService.showSuccessNotification(response.message);
            })
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-4 shadow-lg h-120 w-60">
                <h1 className='text-4xl text-blue-800 ml-16 underline'>Lists</h1>
                <div className="mt-5 overflow-y-auto h-80 overflow-x-auto">
                    <ul>
                        {lists.map((list) => (
                            <li
                                className='mt-5 text-sm'
                                key={list._id}
                            >
                                <div className="bg-sky-300 text-white font-bold rounded-lg shadow-md p-3">
                                    <span className="whitespace-normal">{list.name}</span>
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
            <div className="bg-white p-4  shadow-lg h-120 w-180">
                <h1 className='text-4xl text-blue-800 ml-10 underline'>Tasks</h1>
            </div>
        </div >
    );
}
export default TodoList;
