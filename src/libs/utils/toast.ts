import { toast, ToastOptions} from 'react-toastify';

const commonOptions: ToastOptions = {
    autoClose: 2000,
}
export const  toastInfo = (text:string, options?: ToastOptions)=> toast.info(text,{
    ...commonOptions,
    ...options,
});

export const  toastSuccess =(text:string, options?: ToastOptions)=> toast.success(text,{
    ...commonOptions,
    ...options,
});

export const  toastError =(text:string, options?: ToastOptions)=> toast.error(text,{
    ...commonOptions,
    ...options,
});