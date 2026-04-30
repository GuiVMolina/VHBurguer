import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const apiLocal = "https://localhost:7261/api/";

const apiRemota = "";

// Criar um endereço da API dentro do axios
export const api = axios.create({
  baseURL: apiLocal,
});

// interceptors
// É um interceptor do Axios
// Ele intercepta (pega) toda a requisição antes de ser enviada 
api.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
