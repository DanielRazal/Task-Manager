import React, { useState } from 'react'
import { CiViewList } from 'react-icons/ci';
import Cookies from 'js-cookie';
import CustomNotificationService from '../services/customNotificationService';

function SettingsList({ handleDeleteListClick, handleUpdateListClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const listIdCookie = Cookies.get('ListId');

    const toggleMenu = () => {
        if (listIdCookie) {
            setIsOpen(!isOpen);
        } else {
            CustomNotificationService.showErrorNotification("Please select a valid list before performing actions.")
        }
    };

    const onDeleteClick = () => {
        handleDeleteListClick(listIdCookie);
        toggleMenu();
    };

    const onUpdateClick = () => {
        handleUpdateListClick(listIdCookie);
        toggleMenu();
    };

    return (
        <div className="relative">
            <button className="bg-white w-8 h-8 flex items-center justify-center border border-black" onClick={toggleMenu}>
                <CiViewList />
            </button>

            {listIdCookie && isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-md">
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
                        onClick={onUpdateClick}
                    >
                        <span className="mr-2">Edit</span>
                    </button>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
                        onClick={onDeleteClick}
                    >
                        <span className="mr-2 text-red-500">Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SettingsList;
