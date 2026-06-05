import CardProduto from "../card-produto/[id]/card-produto";
import styles from "./lista-produto.module.css";
import Link from "next/link";
import { excluirProduto, listarProduto } from "@/pages/api/produtoService";
import { erro, notificacao, toastConfirmarExcluir } from "../utils/toast";
import { verificarAutenticacao } from "../utils/auth";
import { useEffect, useState } from "react";

interface Produto {
  produtoID: number;
  nome: string;
  preco: number;
  imagemUrl: string;
  statusProduto: boolean;
}

const ListaProduto = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Salvar informações de filtro
  const [ordem, setOrdem] = useState("todos");

  // Salvar o que for escrito pelo usuário
  const [pesquisa, setPesquisa] = useState("");

  // Salva a informação do usuário logado
  const [estaAutenticado, setEstaAtutenticado] = useState(false);

  async function listar() {
    try {
      const lista = await listarProduto();
      setProdutos(lista);
    } catch (error: any) {
      erro(error.message);
    }
  }

  function confirmarExcluir(produtoId: number) {
    toastConfirmarExcluir(async () => {
      try {
        await excluirProduto(produtoId);
        setProdutos((listaAtual) =>
          listaAtual.map((produto) =>
            produto.produtoID === produtoId
              ? { ...produto, statusProduto: false }
              : produto,
          ),
        );

        notificacao("Produto inativado!");
        listar();
      } catch (error: any) {
        erro(error.message);
      }
    });
  }

  useEffect(() => {
    setEstaAtutenticado(verificarAutenticacao());
    listar();
  }, []);

  // sort - Organizar/ordenar o array
  const produtosFiltrados = produtos
    .filter((produto) =>
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordem === "menor_valor") {
        return a.preco - b.preco;
      } else if (ordem === "maior_valor") {
        return b.preco - a.preco;
      }
      return a.produtoID - b.produtoID;
    });

  return (
    <>
      <div className="full_width">
        <div className="row to_column">
          <div className="side_by_side to_reverse_column">
            <select
              className="select"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="menor_valor">Menor Valor</option>
              <option value="maior_valor">Maior Valor</option>
            </select>

            <div>
              {/* <label htmlFor="pesquisa">Pesquisa</label> */}
              <input
                className="input"
                type="text"
                name="pesquisa"
                id=""
                placeholder="Busque seu produto..."
                onChange={(e) => {
                  setPesquisa(e.target.value);
                }}
              />
            </div>
          </div>

          {estaAutenticado && (
            <div className="side_by_side to_column">
              <Link className="btn1" href="/historico">
                Histórico
              </Link>
              <Link className="btn1" href="/produto">
                + Produto
              </Link>
            </div>
          )}
        </div>
      </div>
      <div id={styles.cards_produtos}>
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((item) => (
            <CardProduto
              key={item.produtoID}
              produtoID={item.produtoID}
              titulo={item.nome}
              preco={item.preco}
              img={item.imagemUrl}
              onDelete={confirmarExcluir}
              estaLogado={estaAutenticado}
            />
          ))
        ) : (
          <p className="text">Carregando produtos...</p>
        )}
      </div>
    </>
  );
};

export default ListaProduto;
