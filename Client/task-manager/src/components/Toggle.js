import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BsFillEyeSlashFill } from 'react-icons/bs';

function Toggle({ togglePasswordVisibility, showPassword }) {
    return (
        <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
        >
            {showPassword ? (
                <AiFillEye />
            ) : (
                <BsFillEyeSlashFill />
            )}
        </button>
    );
}

export default Toggle;
