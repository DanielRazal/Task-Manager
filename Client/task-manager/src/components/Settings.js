import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import CustomNotificationService from '../services/customNotificationService';
import { FiSettings } from 'react-icons/fi';
import swalService from '../services/swalService';

function Settings() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const removeAllCookies = () => {
        const cookieNames = Object.keys(Cookies.get());

        cookieNames.forEach(cookieName => {
            Cookies.remove(cookieName);
        });
    };

    const handleLogoutClick = () => {
        removeAllCookies();
        navigate('/login');
    }

    const handleDeleteUser = async () => {
        try {
            const userCookie = Cookies.get('User');
            if (userCookie) {
                const userData = JSON.parse(userCookie);
                const userId = userData.userLogin._id;
                console.log(userId);

                const result = await swalService.IsDeleteAlert();
                if (result.isConfirmed) {
                    const response = await UserService.DeleteUser(userId);
                    navigate('/login');
                    CustomNotificationService.showSuccessNotification(response.message);
                } else {
                    console.log('Deletion canceled');
                }
            } else {
                console.log('User cookie not found');
            }
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    return (
        <div className="relative">
            <button
                className="bg-white w-8 h-8 flex items-center justify-center border border-black"
                onClick={toggleMenu}
            >
                <FiSettings />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-md">
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
                        onClick={handleLogoutClick}
                    >
                        <span className="mr-2">LogOut</span>

                    </button>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
                        onClick={handleDeleteUser}
                    >
                        <span className="mr-2 text-red-500">Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Settings;