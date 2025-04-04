import { ToastContainer, TypeOptions, toast } from 'react-toastify';

export function showToast(message: string, type: TypeOptions = 'default') {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        type: type
    });
}