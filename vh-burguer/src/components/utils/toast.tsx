import { Slide, toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  closeOnClick: true,
  draggable: true,
  transition: Slide,
};

export const notificacao = (msg: string) => toast.success(msg, defaultOptions);
export const erro = (msg: string) => toast.error(msg, defaultOptions);

export const toastConfirmarExcluir = (aoConfirmar: () => void) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>Deseja realmente excluir?</p>
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button
            className="btn1"
            onClick={() => {
              aoConfirmar();
              closeToast();
            }}
          >
            Sim
          </button>

          <button onClick={closeToast} className="btn2">
            Cancelar
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      transition: Slide,
    },
  );
};
