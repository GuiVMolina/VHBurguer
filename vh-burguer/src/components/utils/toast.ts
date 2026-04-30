import { toast } from "react-toastify";

export const notificacao = (msg: string) =>
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 2000,
    closeOnClick: true,
    draggable: true,
  });

export const erro = (msg: string) =>
  toast.error(msg, {
    position: "bottom-right",
    autoClose: 2000,
    closeOnClick: true,
    draggable: true,
  });
