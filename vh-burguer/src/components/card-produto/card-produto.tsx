import Link from "next/link";
import styles from "./card-produto.module.css";

const CardProduto = () => {
  return (
    <Link href="/detalhe-produto" id={styles.card}>
      <img
        id={styles.card_img}
        src="../imgs/hamburguer_alcatra_com_bacon.png"
        alt="Hambúrguer de Alcatra com Bacon"
      />

      <div className={styles.absolute_container}>
        <h3 className="title4">Monster</h3>
        <div id={styles.edit_card}>
          <img className="icon" src="../imgs/info.png" alt="" />
          <img className="icon" src="../imgs/editar.png" alt="" />
          <img className="icon" src="../imgs/lixeira.png" alt="" />
        </div>
        <h4 className="subtitle">R$ 35,00</h4>
      </div>
    </Link>
  );
};

export default CardProduto;
