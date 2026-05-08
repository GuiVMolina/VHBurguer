import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./produto.module.css";
import Link from "next/link";
import { verificarAutenticacao } from "@/components/utils/auth";
import { erro, notificacao } from "@/components/utils/toast";
import { listarCategoria } from "../api/categoriaService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  cadastrarProduto,
  editarProduto,
  listarPorId,
} from "../api/produtoService";

interface Categoria {
  categoriaID: number;
  nome: string;
}

const Produto = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    number[]
  >([]);

  const [estaAutenticado, setEstaAtutenticado] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const telaEditar = !!id;

  async function listarCategoriaProduto() {
    try {
      const lista = await listarCategoria();
      setCategorias(lista.data);
    } catch (error) {
      erro("Erro ao carregar categorias");
    }
  }

  async function carregarInformacoes() {
    if (!id) return;
    try {
      const produto = await listarPorId(Number(id));
      setNome(produto.nome);
      setDescricao(produto.descricao);
      setPreco(produto.preco);

      const idsFormatados = produto.categoriaIds.map((catId: any) =>
        Number(catId),
      );
      setCategoriasSelecionadas(idsFormatados);
    } catch (error) {
      erro("Erro ao carregar dados do produto");
    }
  }

  // Quando o produto for renderizado, a função listarCategoriaProduto acontece
  useEffect(() => {
    if (!router.isReady) return;
    if (!verificarAutenticacao()) {
      router.push("/home");
      return;
    }
    setEstaAtutenticado(true);
    carregarInformacoes();
    listarCategoriaProduto();
  }, [router.isReady, id]);

  // A tela de produto não será renderizada sem autenticação
  if (!estaAutenticado) {
    return null;
  }

  async function salvarProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const dados = {
        nome,
        descricao,
        preco,
        imagem,
        categoriaIds: categoriasSelecionadas,
      };

      if (telaEditar) {
        await editarProduto(Number(id), dados);
        notificacao("Produto editado!");
      } else {
        await cadastrarProduto(dados);
        notificacao("Produto cadastrado!");
      }
      router.push("/historico");
    } catch (error: any) {
      erro(error.message || "Erro ao salvar");
    }
  }

  return (
    <>
      <Subheader />
      <main className="min_height" id={styles.produto}>
        <div className={`${styles.container} layout_guide`}>
          <div className="card">
            <h1 className="title2">
              {telaEditar ? "Editar" : "Criar"} produto
            </h1>
            <form className="form" onSubmit={salvarProduto}>
              <div className="input_campo">
                <label className="label">Nome do produto</label>
                <input
                  className="input"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="input_campo">
                <label className="label">Descrição</label>
                <input
                  className="input"
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="input_campo">
                <label className="label">Preço (R$)</label>
                <input
                  className="input"
                  type="text"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>

              <div className="input_campo">
                <label className="label">Categorias</label>
                <div className="checkbox">
                  {categorias.map((item) => (
                    <div key={item.categoriaID}>
                      <input
                        type="checkbox"
                        id={`cat-${item.categoriaID}`}
                        value={item.categoriaID}
                        checked={categoriasSelecionadas.includes(
                          Number(item.categoriaID),
                        )}
                        onChange={(e) => {
                          const catId = Number(e.target.value);
                          if (e.target.checked) {
                            setCategoriasSelecionadas([
                              ...categoriasSelecionadas,
                              catId,
                            ]);
                          } else {
                            setCategoriasSelecionadas(
                              categoriasSelecionadas.filter((c) => c !== catId),
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`cat-${item.categoriaID}`}
                        className="checkbox_label"
                      >
                        {item.nome}
                      </label>
                    </div>
                  ))}
                </div>
                <Link className="a_input less_bottom_margin" href="/categoria">
                  Adicionar categoria
                </Link>
              </div>

              <div className="input_campo">
                <label className="label">Imagem do produto</label>
                <input
                  className="input_file"
                  type="file"
                  required={!telaEditar}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImagem(e.target.files[0]);
                    }
                  }}
                />
              </div>

              <div id={styles.botoes}>
                <Link className="btn1" href="/historico">
                  Histórico
                </Link>
                <button type="submit" className="btn2">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Produto;
