import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import swalService from '../services/swalService';
import List from '../models/List';
import ListService from '../services/listService';
import CustomNotificationService from '../services/customNotificationService';

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
        swalService.AddNewItemAlert("Enter a New List", "Please provide a Name to the List.")
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const list = result.value;
                    ListService.AddNewList({ name: list, user: formData.user })
                        .then((response) => {
                            CustomNotificationService.showSuccessNotification(response.message)
                        })
                        .catch((error) => {
                            if (error.response && error.response.data && error.response.data.message) {
                                CustomNotificationService.showErrorNotification(error.response.data.message)
                            }
                        });
                }
            })
            .catch((error) => {
                console.error('Error or cancellation:', error);
            });
    };



    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg h-120 w-60">
                <h1 className='text-4xl text-blue-800 ml-16 underline'>Lists</h1>
                <div className='mt-5'>
                    <ul>
                        {lists.map((list) => (
                            <li className='mt-5 bg-blue-700 text-white pt-2 px-3 rounded-lg shadow-md text-center' key={list._id}>{list.name}</li>
                        ))}
                    </ul>
                </div>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-12 mt-80"
                    onClick={handleNewListClick}>New List</button>
            </div>
        </div >
    );
}
export default TodoList;
