import styles from "./card-produto.module.css";
import Link from "next/link";
import { formatarPreco } from "../utils/formatacao";

type ProdutoProps = {
  produtoID: number;
  titulo: string;
  preco: number;
  img: string;
};

const CardProduto = ({ titulo, preco, img, produtoID }: ProdutoProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/detalhe-produto/${produtoID}`} className={styles.link_area}>
        <img className={styles.card_img} src={img} alt={titulo} />

        <div className={styles.absolute_container}>
          <h3 className="title4">{titulo}</h3>
          <h4 className="subtitle">{formatarPreco(preco)}</h4>
        </div>
      </Link>

      <div className={styles.edit_card}>
        <img className="icon" src="/imgs/info.png" alt="Informação" />
        <img className="icon" src="/imgs/editar.png" alt="Editar" />
        <img className="icon" src="/imgs/lixeira.png" alt="Excluir" />
      </div>
    </div>
  );
};

export default CardProduto;
