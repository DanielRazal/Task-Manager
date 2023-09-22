import React, { useState } from 'react'
import { CiViewList } from 'react-icons/ci';
import swalService from '../services/swalService';
import CustomNotificationService from '../services/customNotificationService';
import ListService from '../services/listService';
import Cookies from 'js-cookie';

function SettingsList() {

    const [isOpen, setIsOpen] = useState(false);
    const listIdCookie = Cookies.get('ListId');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // const handleUpdateListClick = (id) => {
    //     swalService.InputItemAlert("Enter the list you want to update", "Please provide a Name to the List.")
    //         .then((result) => {
    //             if (result.isConfirmed && result.value) {
    //                 const listName = result.value;

    //                 const listIndex = lists.findIndex((list) => list._id === id);

    //                 if (listIndex !== -1) {
    //                     const updatedLists = [...lists];

    //                     updatedLists[listIndex].name = listName;

    //                     ListService.UpdateList(id, { name: listName, /*user: formListData.user*/ })
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



    const handleDeleteList = async (id) => {
        try {
            await ListService.DeleteList(id).then((response) => {
                // setLists((prevLists) => prevLists.filter((list) => list._id !== id));
                CustomNotificationService.showSuccessNotification(response.message);
            })
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
                <CiViewList />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-md">
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
                        // onClick={() => handleUpdateListClick(listIdCookie)}
                    >
                        <span className="mr-2">Edit</span>

                    </button>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
                        onClick={() => handleDeleteList(listIdCookie)}
                    >
                        <span className="mr-2 text-red-500">Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
}


export default SettingsList;