import Swal from 'sweetalert2';

const InputItemAlert = (title, err) => {
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
    InputItemAlert,
};

export default swalService;
