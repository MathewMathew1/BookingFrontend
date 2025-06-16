'use client';

import { JSX } from "react";
import { ToastInfo, useToast, useUpdateToast } from "../../context/useToast";
import Toast from "../Toast/Toast";


const ToastContainer = (): JSX.Element => {
  const toasts = useToast();
  const toastUpdate = useUpdateToast();

  const handleClose = (index: number): void => {
    toastUpdate.removeToastById(index);
  };

  return (
    <>
      {toasts.toastsInfos.map((toast: ToastInfo, index: number) => (
        <Toast
          bottom={50 + 80 * index}
          variant={toast.severity}
          handleClose={() => handleClose(toast.id)}
          key={`${index}toast`}
          message={toast.message}
          
        />
      ))}
    </>
  );
};

export default ToastContainer;
