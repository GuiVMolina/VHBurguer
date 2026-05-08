import CardProduto from "../card-produto/[id]/card-produto";
import styles from "./lista-produto.module.css";
import Link from "next/link";
import { excluirProduto, listarProduto } from "@/pages/api/produtoService";
import { erro, notificacao, toastConfirmarExcluir } from "../utils/toast";
import { useEffect, useState } from "react";
import { verificarAutenticacao } from "../utils/auth";

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
      <div id={styles.cardapio}>
        <div id={styles.campo_btn}>
          <div id={styles.campo_pesquisa}>
            <select
              className="btn1"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="menor_valor">Menor Valor</option>
              <option value="maior_valor">Maior Valor</option>
            </select>

            <div id={styles.caixa_pesquisa}>
              <label htmlFor="pesquisa">Pesquisa</label>
              <input
                className="select"
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
            <div id={styles.btn_cardapio}>
              <Link className="btn1" href="/historico">
                Histórico
              </Link>
              <Link className="btn1" href="/produto">
                Novo produto
              </Link>
            </div>
          )}
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
            <p>Carregando produtos...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListaProduto;
