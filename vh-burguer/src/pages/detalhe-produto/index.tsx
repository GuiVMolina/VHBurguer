import Subheader from "@/components/sub-header/subheader";
import styles from "./detalhe-produto.module.css";
import Footer from "@/components/footer/footer";

const DetalheProduto = () => {
  return (
    <>
      <Subheader />
      <section id={styles.detalhe}>
        <div className={`${styles.container} layout_guide`}>
          <div id={styles.card}>
            <h1 className="title3">Detalhes do produto</h1>
            <div id={styles.detalhe_1}>
              <img src="../imgs/hamburguer_alcatra_com_bacon.png" />
              <div id={styles.detalhe_2}>
                <div className={styles.detalhe_info}>
                  <div>
                    <h3>Descrição</h3>
                    <p>
                      Um pão brioche macio segura a fera: duas (ou três) carnes
                      altas e suculentas, queijo cheddar derretido escorrendo
                      pelas laterais, bacon crocante, cebola caramelizada no
                      ponto adocicado, alface fresca, tomate e um molho especial
                      intenso que amarra tudo. Para completar o ataque, uma
                      camada extra de onion rings ou molho defumado que
                      transforma cada mordida numa explosão.
                    </p>
                  </div>
                </div>
                <div className={styles.detalhe_info}>
                  <div>
                    <h3>Preço (R$)</h3>
                    <p>
                      <s>R$45,00</s> R$35,00
                    </p>
                  </div>
                  <div>
                    <h3>Categoria</h3>
                    <ul>
                      <li>Premium</li>
                      <li>Artesanal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetalheProduto;
