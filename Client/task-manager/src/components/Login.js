import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Toggle from './Toggle';
import UserService from '../services/userService';
import CustomNotificationService from '../services/customNotificationService';
import User from '../models/User';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(new User('', ''));
    const navigate = useNavigate();
    const isFormValid = formData.userName && formData.password;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await UserService.LoginUser(formData);
            console.log(response.message);
            if (response && response.message) {
                CustomNotificationService.showSuccessNotification(response.message);
                Cookies.set('User', JSON.stringify(response), { expires: 7 }); // 7 days
                navigate('/todo');
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                CustomNotificationService.showErrorNotification(error.response.data.message)
            }
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                                    <input type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your User Name"
                                        value={formData.userName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>

                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <Toggle togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />
                                    </div>
                                </div>

                                <button type="submit" className={`w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${isFormValid ? '' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                                    disabled={!isFormValid}
                                >Login</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                    <Link to="/signUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-3">
                                        Create Account here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;