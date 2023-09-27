import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Lists from './Lists';

function TodoList() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        handleUserCookie(navigate, setUserId);
    }, [navigate]);

    const handleUserCookie = (navigate, setUserId) => {
        const userCookie = Cookies.get('User');
        if (!userCookie) {
            navigate('/login');
        } else {
            try {
                const userObj = JSON.parse(userCookie);
                if (userObj && userObj.userLogin && userObj.userLogin._id) {
                    setUserId(userObj.userLogin._id);
                } else {
                    throw new Error('Invalid user data in cookie');
                }
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                navigate('/login');
            }
        }
    };

    return (
        <div>
            {userId !== null ? (
                <>
                    <Lists />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default TodoList;
