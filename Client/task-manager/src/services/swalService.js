import Swal from 'sweetalert2';

const AddNewItemAlert = (title, err) => {
    return Swal.fire({
        title: title,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return err;
            }
            return null;
        },
    });
};

const swalService = {
    AddNewItemAlert,
};

export default swalService;
