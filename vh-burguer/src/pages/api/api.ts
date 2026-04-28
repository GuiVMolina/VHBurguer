import axios from "axios";

const apiLocal = "https://localhost:7261/api/";

const apiRemota = "";

// Criar um endereço da API dentro do axios
export const api = axios.create({
  baseURL: apiLocal,
});
