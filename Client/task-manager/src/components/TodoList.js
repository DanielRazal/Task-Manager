import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import swalService from '../services/swalService';
import List from '../models/List';
import ListService from '../services/listService';
import CustomNotificationService from '../services/customNotificationService';
import { AiOutlineDelete } from 'react-icons/ai';

function TodoList() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const userCookie = Cookies.get('User');
        if (!userCookie) {
            navigate('/login');
        } else {
            const userObj = JSON.parse(userCookie);
            const userId = userObj.userLogin._id;
            const initialFormData = new List('', userId);
            setFormData(initialFormData);

            // Fetch all lists for the user, including _id values
            ListService.GetAllListsByUser(userId)
                .then((userLists) => {
                    setLists(userLists);
                })
                .catch((error) => {
                    console.error('Error fetching user lists:', error);
                });
        }
    }, [navigate]);


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



    const [formData, setFormData] = useState(null);

    const handleNewListClick = () => {
        swalService
            .AddNewItemAlert("Enter a New List", "Please provide a Name to the List.")
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const list = result.value;
                    ListService.AddNewList({ name: list, user: formData.user })
                        .then((response) => {
                            CustomNotificationService.showSuccessNotification(response.message);
                            setLists((prevLists) => [response.newList, ...prevLists]);
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


    const handleDeleteList = async (id) => {
        try {
            await ListService.DeleteList(id);

            setLists((prevLists) => prevLists.filter((list) => list._id !== id));
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg h-120 w-60">
                <h1 className='text-4xl text-blue-800 ml-16 underline'>Lists</h1>
                <div className="mt-5 overflow-y-auto h-80">
                    <ul>
                        {lists.map((list) => (
                            <li className='mt-5 bg-sky-300 text-white font-bold pt-2 px-3 rounded-lg shadow-md' key={list._id}>
                                {list.name}
                                <button onClick={() => handleDeleteList(list._id)}
                                    className='absolute right-200'>
                                    <AiOutlineDelete />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
                    dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-12 mt-6"
                    onClick={handleNewListClick}>New List</button>
            </div>
        </div >
    );
}
export default TodoList;
