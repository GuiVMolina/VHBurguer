import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./produto.module.css";
import Link from "next/link";

import { listarCategoria } from "../api/categoriaService";
import { useEffect, useState } from "react";
import { cadastrarProduto } from "../api/produtoService";
import { erro, notificacao } from "@/components/utils/toast";
import { ToastContainer } from "react-toastify";

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

  console.log(nome);
  console.log(descricao);
  console.log(preco);
  console.log(imagem);
  console.log(categoriasSelecionadas);

  async function listarCategoriaProduto() {
    const lista = await listarCategoria();
    setCategorias(lista.data);
  }

  async function Cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const dados = {
        nome,
        descricao,
        preco,
        imagem,
        categoriaId: categoriasSelecionadas,
      };
      await cadastrarProduto(dados);
      notificacao("Produto cadastrado!");
    } catch (error: any) {
      erro(error.message);
    }
  }

  // Quando 'Produto' for renderizado...
  // ↳ A função listarCategoriaProduto acontece
  useEffect(() => {
    listarCategoriaProduto();
  }, []);

  return (
    <>
      <ToastContainer />
      <Subheader />
      <section className="min_height" id={styles.produto}>
        <div className={`${styles.container} layout_guide`}>
          <div className="card">
            <h1 className="title2">Criar produto</h1>
            <form className="form" onSubmit={Cadastrar}>
              <div className="input_campo">
                <label className="label">Nome do produto</label>
                <input
                  className="input"
                  type="text"
                  name="nome"
                  placeholder="BBQ Especial"
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
                  name="descricao"
                  placeholder="Hamburguer com molho barbecue defumado com cebola caramelizada"
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
                  name="preco"
                  placeholder="40,00"
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
                          item.categoriaID,
                        )}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          if (e.target.checked) {
                            // Adiciona à lista
                            setCategoriasSelecionadas([
                              ...categoriasSelecionadas,
                              id,
                            ]);
                          } else {
                            // Remove da lista
                            setCategoriasSelecionadas(
                              categoriasSelecionadas.filter((c) => c !== id),
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
                <label className="label">URL da imagem</label>
                <input
                  className="input_file"
                  type="file"
                  name="imagem"
                  placeholder="https://unsplash.com/pt-br/fotografias/cheseburger"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImagem(e.target.files[0]);
                    }
                  }}
                  required
                />
              </div>
              <div id={styles.botoes}>
                <Link className="btn1" href="/historico">
                  Histórico
                </Link>
                <button className="btn2">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Produto;
