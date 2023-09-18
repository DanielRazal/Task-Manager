import Swal from 'sweetalert2';

const InputItemAlert = async (title, err) => {
    return await Swal.fire({
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

const IsDeleteAlert = async () => {
    const result = await Swal.fire({
        title: 'Delete User',
        html: 'Are you sure to delete the user?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    });

    return result;
};

const swalService = {
    InputItemAlert,
    IsDeleteAlert
};

export default swalService;
