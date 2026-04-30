import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./produto.module.css";
import Link from "next/link";

import { listarCategoria } from "../api/categoriaService";
import { useEffect, useState } from "react";
import { cadastrarProduto } from "../api/produtoService";

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
    } catch (error: any) {
      alert(error.message);
    }
  }

  // Quando 'Produto' for renderizado...
  // ↳ A função listarCategoriaProduto acontece
  useEffect(() => {
    listarCategoriaProduto();
  }, []);

  return (
    <>
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
                <label className="label">Categoria</label>
                <select
                  className="input"
                  multiple
                  onChange={(e) =>
                    setCategoriasSelecionadas(
                      Array.from(e.target.selectedOptions).map((option) =>
                        Number(option.value),
                      ),
                    )
                  }
                  required
                >
                  {categorias.map((item) => (
                    <option value={item.categoriaID}>{item.nome}</option>
                  ))}
                </select>
                <a className="a_input less_bottom_margin" href="/categoria">
                  Adicionar categoria
                </a>
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
                <Link href="/historico" className="btn1">
                  Histórico
                </Link>
                <Link href="#" className="btn2">
                  Salvar
                </Link>
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
