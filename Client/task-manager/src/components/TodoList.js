import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function TodoList() {
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('User');
        if (!userCookie) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            Todo List
        </div>
    );
}

export default TodoList;
