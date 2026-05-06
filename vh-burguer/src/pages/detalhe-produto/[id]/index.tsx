import Subheader from "@/components/sub-header/subheader";
import styles from "./detalhe-produto.module.css";
import Footer from "@/components/footer/footer";
import { formatarPreco } from "@/components/utils/formatacao";
import { listarPorId } from "../../api/produtoService";
import { erro } from "@/components/utils/toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Produto = {
  produtoID: number;
  nome: string;
  descricao: string;
  preco: number;
  img: string;
  categorias: string[];
};

const DetalheProduto = ({} : Produto) => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const params = useParams();
  const id = params?.id;

  async function listarProduto() {
    try {
      const response = await listarPorId(Number(id));
      setProduto(response);
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    if (!id) return;
    listarProduto();
  }, [id]);

  return (
    <>
      <Subheader />
      <main className="min_height" id={styles.detalhe}>
        <div className={`${styles.container} layout_guide`}>
          {produto ? (
            <>
              <div id={styles.card}>
                <h1 className="title3">{produto.nome}</h1>
                <div id={styles.detalhe_1}>
                  {/* 1. Imagem */}
                  <img src={produto.img} alt={produto.nome} />

                  <div id={styles.detalhe_2}>
                    <div className={styles.detalhe_info}>
                      <h3>Descrição</h3>
                      {/* 2. Descrição */}
                      <p>{produto.descricao}</p>
                    </div>
                    <div className={styles.detalhe_info}>
                      <div>
                        <h3>Preço (R$)</h3>
                        {/* 3. Preço */}
                        <p>{formatarPreco(produto.preco)}</p>
                      </div>
                      <div>
                        <h3>Categoria</h3>
                        {/* 4. Categorias */}
                        <ul>
                          {produto.categorias?.map((cat) => (
                            <li>{cat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Carregando produto...</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DetalheProduto;
