import Footer from "@/components/footer/footer";
import Subheader from "@/components/sub-header/subheader";
import styles from "./produto.module.css";
import Link from "next/link";

const Produto = () => {
  return (
    <>
      <Subheader />
      <section className="min_height" id={styles.produto}>
        <div className={`${styles.container} layout_guide`}>
          <div className="card">
            <h1 className="title2">Criar produto</h1>
            <form className="form">
              <div className="input_campo">
                <label>Nome do produto</label>
                <input
                  className="input"
                  type="text"
                  placeholder="BBQ Especial"
                />
              </div>
              <div className="input_campo">
                <label>Descrição</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Hamburguer com molho barbecue defumado com cebola caramelizada"
                />
              </div>
              <div className="input_campo">
                <label>Preço (R$)</label>
                <input className="input" type="text" placeholder="40,00" />
              </div>
              <div className="input_campo">
                <label>Categoria</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Selecione a categoria"
                />
                <a className="a_input" href="/categoria">
                  Adicionar categoria
                </a>
              </div>
              <div className="input_campo">
                <label>URL da imagem</label>
                <input
                  className="input"
                  type="text"
                  placeholder="https://unsplash.com/pt-br/fotografias/cheseburger"
                />
              </div>
              <div id={styles.botoes}>
                <Link href="/historico" className="btn1">Histórico</Link>
                <Link href="#" className="btn2">Salvar</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Produto;
