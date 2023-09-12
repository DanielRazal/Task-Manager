import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import swalService from '../services/swalService';
import List from '../models/List';

function TodoList() {
    const navigate = useNavigate();
    useEffect(() => {
        const userCookie = Cookies.get('User');
        console.log(userCookie);
        if (!userCookie) {
            navigate('/login');
        } else {
            const userObj = JSON.parse(userCookie);
            const userId = userObj.userLogin._id;
            console.log(userId);
            const initialFormData = new List('', userId);
            setFormData(initialFormData);
        }
    }, [navigate]);

    const [formData, setFormData] = useState(null);

    const handleNewListClick = () => {
        swalService.AddNewItemAlert("Enter a New List", "Please provide a Name to the List.")
            .then((result) => {
                console.log('Result from AddNewItemAlert:', result);
            })
            .catch((error) => {
                console.error('Error or cancellation:', error);
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg h-120 w-100">
                <h1 className='text-4xl text-blue-800 ml-16'>Lists</h1>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600
            dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-12 mt-80"
                    onClick={handleNewListClick}>New List</button>
            </div>
        </div>
    );
}

export default TodoList;
