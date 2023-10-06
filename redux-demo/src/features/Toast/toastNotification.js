import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';

import { toastTypes } from '../../utils/toastType';

import 'react-toastify/dist/ReactToastify.css';

export const ToastNotify = () => {


    const { type, message } = useSelector(state => state.toast.toastData)

    useEffect(() => {
        showToast()
    }, [message, type])

    const showToast = () => {
        switch (type) {
            case toastTypes.Success:
                // add type: 'success' to options
                return toast.success(message);
            case toastTypes.Error:
                // add type: 'error' to options
                return toast.error(message);
            case toastTypes.Warning:
                // add type: 'warning' to options
                return toast.warn(message);
            case toastTypes.Info:
                // add type: 'info' to options
                return toast.info(message);
            case toastTypes.Clear:
                // Remove all toasts !
                return toast.dismiss();
            default:
                return toast(message);

        }
    }

    return (
        <React.Fragment>
            <div className="animated">
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </React.Fragment>
    )
}