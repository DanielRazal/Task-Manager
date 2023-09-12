import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showSuccessNotification = async (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
    });
};

const showErrorNotificationRegister = (errorMessage) => {
    if (Array.isArray(errorMessage)) {
        const formattedErrorMessages = errorMessage.map((message, index) => (
            <p key={index} className='font-bold text-black text-xs'>{message}</p>
        ));

        toast.error(
            <div>
                <p className='text-red-500 font-bold'>Registration failed:</p>
                {formattedErrorMessages}
            </div>,
            {
                position: 'top-right',
                autoClose: 5000,
            }
        );
    } else if (typeof errorMessage === 'string') {
        toast.error(
            <div>
                <p className='text-red-500 font-bold'>Registration failed:</p>
                <p className='font-bold text-black text-xs'>{errorMessage}</p>
            </div>,
            {
                position: 'top-right',
                autoClose: 5000,
            }
        );
    }
};


const showErrorNotification = (errorMessage) => {
    toast.error(
        <div>
            <p className='text-red-500 font-bold'>Registration failed:</p>
            <p className='font-bold text-black text-xs'>{errorMessage}</p>
        </div>,
        {
            position: 'top-right',
            autoClose: 5000,
        }
    );
};


const CustomNotificationService = {
    showSuccessNotification,
    showErrorNotificationRegister,
    showErrorNotification
};

export default CustomNotificationService;
