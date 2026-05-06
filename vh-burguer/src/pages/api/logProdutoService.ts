import { api } from "./api";

export async function listar() {
  try {
    const response = await api.get("LogProduto");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarProdutoId(produtoId: number) {
  try {
    const response = await api.get("LogProduto/produto/" + produtoId);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
