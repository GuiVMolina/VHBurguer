import { api } from "./api";
import secureLocalStorage from "react-secure-storage";

export async function login(email: string, senha: string) {
  try {
    // Requisição
    const response = await api.post("Autenticacao/login", { email, senha });
    const token = response.data.token;

    secureLocalStorage.setItem("userToken", token);
  } catch (error: any) {
    throw new Error("Email ou senha inválidos");
  }
}
