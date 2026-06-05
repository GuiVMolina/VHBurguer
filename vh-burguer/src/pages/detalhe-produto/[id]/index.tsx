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
  imagemUrl: string;
  categorias: string[];
};

const DetalheProduto = () => {
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
      <main className="min_height">
        <div className="container column">
          {produto ? (
            <>
              <div className={styles.card}>
                <h1 className="title3">{produto.nome}</h1>
                <div className={styles.detalhe}>
                  <img
                    className={styles.imagem_produto}
                    src={produto.imagemUrl || "/imgs/foto_de_hamburgueres.png"}
                    alt={produto.nome}
                    onError={(event) => {
                      event.currentTarget.src =
                        "/imgs/foto_de_hamburgueres.png";
                    }}
                  />

                  <div className="column">
                    <div>
                      <h3 className="title2 to_start">Descrição</h3>
                      <p>{produto.descricao}</p>
                    </div>
                    <div className="row to_column">
                      <div className="full_width">
                        <h3 className="title2 to_start">Preço (R$)</h3>
                        <p>{formatarPreco(produto.preco)}</p>
                      </div>
                      <div className="full_width">
                        <h3 className="title2 to_start">Categoria</h3>
                        <ul>
                          {produto.categorias?.map((cat) => (
                            <li key={cat}>{cat}</li>
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
