import Swal from 'sweetalert2';

const AddNewItemAlert = async (title, err) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
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
            }
        })
            .then((result) => {
                if (result.isConfirmed) {
                    resolve(result.value);
                } else {
                    reject('Action canceled');
                }
            });
    });
}


const swalService = {
    AddNewItemAlert,
};

export default swalService;
