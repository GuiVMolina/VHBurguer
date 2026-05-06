import { api } from "./api";

// Base para cadastro de produto
type ProdutoFormulario = {
  nome: string;
  descricao: string;
  preco: string;
  imagem: File | null;
  categoriaIds: number[];
};

// Base para receber o produto da API
interface ProdutoListagem {
  nome: string;
  descricao: string;
  preco: string;
  categoriaIds: number[];
  imagemUrl: string;
  statusProduto: boolean;
}

export async function cadastrarProduto(dados: ProdutoFormulario) {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("descricao", dados.descricao);
    formData.append("preco", dados.preco);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    dados.categoriaIds.forEach((produtoId) => {
      formData.append("categoriaIds", produtoId.toString());
    });

    await api.post("Produto", formData);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarProduto() {
  try {
    const response = await api.get("Produto");

    // Filtra somente produtos ativos
    const produtosAtivos = response.data.filter(
      (produto: ProdutoListagem) => produto.statusProduto === true,
    );

    // Adiciona URL completa da imagem
    const produtos = produtosAtivos.map((produto: ProdutoListagem) => ({
      ...produto,
      imagemUrl: `${api.defaults.baseURL}${produto.imagemUrl}`,
    }));

    return produtos;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function listarPorId(produtoId: number) {
  try {
    const response = await api.get("Produto/" + produtoId);

    const produto = {
      ...response.data,
      imagemUrl: `${api.defaults.baseURL}${response.data.imagemUrl}`,
    };

    return produto;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function excluirProduto(produtoId: number) {
  try {
    await api.delete("Produto/" + produtoId);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}

export async function editarProduto(
  produtoId: number,
  dados: ProdutoFormulario,
) {
  try {
    const formData = new FormData();

    formData.append("nome", dados.nome);
    formData.append("descricao", dados.descricao);
    formData.append("preco", dados.preco);
    if (dados.imagem) {
      formData.append("imagem", dados.imagem);
    }
    dados.categoriaIds.forEach((produtoId) => {
      formData.append("categoriaIds", produtoId.toString());
    });

    await api.put("Produto/" + produtoId, formData);
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
