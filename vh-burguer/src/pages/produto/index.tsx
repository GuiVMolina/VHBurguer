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
                <label className="label">Nome do produto</label>
                <input
                  className="input"
                  type="text"
                  name="nome"
                  placeholder="BBQ Especial"
                  required
                />
              </div>
              <div className="input_campo">
                <label className="label">Descrição</label>
                <input
                  className="input"
                  type="text"
                  name="descricao"
                  placeholder="Hamburguer com molho barbecue defumado com cebola caramelizada"
                  required
                />
              </div>
              <div className="input_campo">
                <label className="label">Preço (R$)</label>
                <input
                  className="input"
                  type="text"
                  name="preco"
                  placeholder="40,00"
                  required
                />
              </div>
              <div className="input_campo">
                <label className="label">Categoria</label>
                <input
                  className="input"
                  type="text"
                  name="categoria"
                  placeholder="Selecione a categoria"
                  required
                />
                <a className="a_input" href="/categoria">
                  Adicionar categoria
                </a>
              </div>
              <div className="input_campo">
                <label className="label">URL da imagem</label>
                <input
                  className="input"
                  type="text"
                  name="imagem"
                  placeholder="https://unsplash.com/pt-br/fotografias/cheseburger"
                  required
                />
              </div>
              <div id={styles.botoes}>
                <Link href="/historico" className="btn1">
                  Histórico
                </Link>
                <Link href="#" className="btn2">
                  Salvar
                </Link>
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
