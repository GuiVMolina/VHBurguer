import { api } from "./api";

type Produto = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: File | null;
  imagemUrl: string;
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
      formData.append("CategoriaIds", id.toString());
    });

    await api.post("Produto", formData);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function listarProduto() {
  try {
    const response = await api.get("Produto");

    const produtos = response.data.map((produto: Produto) => ({
      ...produto,
      imagemUrl: `${api.defaults.baseURL}${produto.imagemUrl}`,
    }));

    return produtos;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarPorId(id: number) {
  try {
    const response = await api.get("Produto/" + id);

    const produtos = response.data.map((produto: Produto) => ({
      ...produto,
      imagemUrl: `${api.defaults.baseURL}${produto.imagemUrl}`,
    }));
    
    return produtos;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
