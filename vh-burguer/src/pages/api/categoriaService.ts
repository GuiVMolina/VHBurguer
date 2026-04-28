import { api } from "./api";

export async function cadastrarCategoria(nome: string) {
  try {
    await api.post("Categoria", { nome });
  } catch (error: any) {
    throw new Error("Erro ao cadastrar categoria");
  }
}
