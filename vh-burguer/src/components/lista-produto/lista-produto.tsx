import CardProduto from "../card-produto/card-produto";
import styles from "./lista-produto.module.css";
import Link from "next/link";

const ListaProduto = () => {
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
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
        </div>
      </div>
    </>
  );
};

export default ListaProduto;
