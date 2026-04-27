import Footer from "@/components/footer/footer";
import Subheader from "@/components/sub-header/subheader";
import styles from "./categoria.module.css";
import Link from "next/link";

const Categoria = () => {
  return (
    <>
      <Subheader />
      <section className="min_height" id={styles.categoria}>
        <div className={`${styles.container} layout_guide`}>
          <div className="card">
            <h1 className="title2">Criar categoria</h1>
            <form className="form">
              <div className="input_campo">
                <label>Nome do produto</label>
                <input
                  className="input"
                  type="text"
                  placeholder="BBQ Especial"
                />
              </div>
              <div id={styles.botoes}>
                <Link href="/produto" className="btn1">
                  Adicionar Produto
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

export default Categoria;
