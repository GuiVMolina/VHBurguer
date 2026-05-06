import styles from "./card-produto.module.css";
import Link from "next/link";
import { formatarPreco } from "../../utils/formatacao";

type ProdutoProps = {
  produtoID: number;
  titulo: string;
  preco: number;
  img: string;

  // Criando uma props que recebe uma função
  onDelete: (produtoId: number) => void;
};

const CardProduto = ({
  titulo,
  preco,
  img,
  produtoID,
  onDelete,
}: ProdutoProps) => {
  return (
    <div className={styles.card}>
      <Link href={`/detalhe-produto/${produtoID}`} className={styles.link_area}>
        <img className={styles.card_img} src={img} alt={titulo} />

        <div className={styles.absolute_container}>
          <h3 className="title4">{titulo}</h3>
          <h4 className="subtitle">{formatarPreco(preco)}</h4>
        </div>
      </Link>

      <div className={styles.info_card}>
        <Link href={`/historico/${produtoID}`}>
          <img className="icon" src="/imgs/info.png" alt="Informação" />
        </Link>
        <button onClick={() => onDelete(produtoID)}>
          <img className="icon" src="/imgs/lixeira.png" alt="Excluir" />
        </button>
        <Link href={`/produto?id=${produtoID}`}>
          <img className="icon" src="/imgs/editar.png" alt="Editar" />
        </Link>
      </div>
    </div>
  );
};

export default CardProduto;
