import React, { useState, useEffect } from 'react'
import List from '../models/List';
import ListService from '../services/listService';
import swalService from '../services/swalService';
import CustomNotificationService from '../services/customNotificationService';
import Cookies from 'js-cookie';


function Lists() {

  const [lists, setLists] = useState([]);
  const [formListData, setFormListData] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('User');
    const userObj = JSON.parse(userCookie);
    const userId = userObj.userLogin._id;
    const initialFormData = new List('', userId);
    setFormListData(initialFormData);

    ListService.GetAllListsByUser(userId)
      .then((userLists) => {
        setLists(userLists);
      })
      .catch((error) => {
        console.error('Error fetching user lists:', error);
      });
  }, []);

  const handleNewListClick = () => {
    swalService.InputItemAlert("Enter a New List", "Please provide a Name to the List.")
      .then((result) => {
        if (result.isConfirmed && result.value) {
          const list = result.value;
          ListService.AddNewList({ name: list, user: formListData.user })
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

  const handleListClick = async (listId) => {
    try {
      Cookies.set('ListId', listId, { expires: 7 });
      setSelectedListId(listId);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };




  return (
    <div>
      <div className="bg-white p-4 shadow-lg h-120 w-60">
        <h1 className='text-4xl text-blue-800 ml-16 underline'>Lists</h1>
        <div className="mt-5 overflow-y-auto h-80 overflow-x-auto">
          <ul>
            {lists && lists.length > 0 ? (
              lists.map((list) => (
                <li className='mt-5 text-sm' key={list._id}>
                  <div
                    className={`bg-sky-300 font-bold rounded-lg shadow-md p-3 ${selectedListId === list._id ? 'bg-blue-500 text-red-500' : 'text-white'
                      }`}
                  >
                    <button
                      className="whitespace-normal focus:outline-none"
                      onClick={() => handleListClick(list._id)}
                    >
                      {list.name}
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No lists available.</p>
            )}
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                       focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-3
                      dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleNewListClick}
          >
            New List
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lists;