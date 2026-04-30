import { api } from "./api";

type Produto = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: File | null;
  categoriaId: number[];
};

export async function cadastrarProduto(dados: Produto) {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("descricao", dados.descricao);
    formData.append("preco", dados.preco);

    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }

    dados.categoriaId.forEach((id) => {
      formData.append("categoriaId", id.toString());
    });

    await api.post("Produto", formData);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
