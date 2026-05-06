import CardProduto from "../card-produto/[id]/card-produto";
import styles from "./lista-produto.module.css";
import Link from "next/link";
import { excluirProduto, listarProduto } from "@/pages/api/produtoService";
import { useEffect, useState } from "react";
import { erro, notificacao, toastConfirmarExcluir } from "../utils/toast";

interface Produto {
  produtoID: number;
  imagemUrl: string;
  nome: string;
  preco: number;
  statusProduto: boolean;
}

const ListaProduto = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

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
    listar();
  }, []);

  return (
    <>
      <div id={styles.cardapio}>
        <div id={styles.campo_btn}>
          <button className="btn1">
            <span>Filtrar</span>
            <svg
              id={styles.btn_filtrar_icon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="9" cy="6" r="2" fill="currentColor" />
              <circle cx="15" cy="12" r="2" fill="currentColor" />
              <circle cx="11" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>

          <div id={styles.btn_cardapio}>
            <Link className="btn1" href="/historico">
              Histórico
            </Link>
            <Link className="btn1" href="/produto">
              Adicionar produto
            </Link>
          </div>
        </div>
        <div id={styles.cards_produtos}>
          {produtos.length > 0 ? (
            produtos.map((item) => (
              <CardProduto
                key={item.produtoID}
                produtoID={item.produtoID}
                titulo={item.nome}
                preco={item.preco}
                img={item.imagemUrl}
                onDelete={confirmarExcluir}
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
