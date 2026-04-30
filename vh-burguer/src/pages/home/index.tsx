import ListaProduto from "@/components/lista-produto/lista-produto";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from "./home.module.css";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        {/* Banner */}
        <section className={styles.banner}>
          <div className={`${styles.container} layout_guide`}>
            <h1 id={styles.title}>Bem-vindo ao VH Burguer</h1>
            <img
              id={styles.banner_img}
              src="../imgs/foto_de_hamburgueres.png"
              alt=""
            />
            <div id={styles.botoes}>
              <a href="" className="btn1">Chamar atendente</a>
              <a href="#cardapio" className="btn2">Ver cardápio</a>
            </div>
          </div>
        </section>

        {/* Destaques */}
        <section className={styles.destaques} id="destaques">
          <div className={`${styles.container} layout_guide`}>
            <div className={styles.grid}>
              <div className={styles.item}>
                <img
                  className={styles.opcao}
                  src="../imgs/mais_pedidos.png"
                  alt=""
                />
                <div className={styles.texto_esq}>
                  <p>Os queridinhos da galera</p>
                  <h3>Mais pedidos</h3>
                </div>
              </div>
              <div id={styles.sub_grid}>
                <div className={styles.item}>
                  <div className={styles.texto_dir}>
                    <p>Lanches com</p>
                    <h3>Muito bacon</h3>
                  </div>
                  <img
                    className={styles.opcao}
                    src="../imgs/muito_bacon.png"
                    alt=""
                  />
                </div>
                <div className={styles.item}>
                  <div className={styles.texto_dir}>
                    <p>Se tiver com muita fome</p>
                    <h3>Super combos</h3>
                  </div>
                  <img
                    className={styles.opcao}
                    src="../imgs/super_combos.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cardápio */}
        <section className={styles.cardapio} id="cardapio">
          <div className={`${styles.container} layout_guide`}>
            <h2>Cardápio</h2>
            <ListaProduto />
          </div>
        </section>

        {/* Unidades */}
        <section className={styles.unidades} id="unidades">
          <div className={`${styles.container} layout_guide`}>
            <div id={styles.informacoes}>
              <h3>Unidades</h3>
              <ul>
                <li>Centro – Av. Aurora, 742</li>
                <li>Jardim – Av. das Palmeiras, 1280</li>
                <li>Norte – Av. Horizonte, 305</li>
                <li>Sul – Av. Nova Esperança, 910</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
