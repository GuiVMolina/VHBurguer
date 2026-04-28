import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./categoria.module.css";
import Link from "next/link";
import { useState } from "react";
import { cadastrarCategoria } from "../api/categoriaService";

const Categoria = () => {
  const [categoria, setCategoria] = useState<string>("");

  function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    cadastrarCategoria(categoria);
  }

  return (
    <>
      <Subheader />
      <section className="min_height" id={styles.categoria}>
        <div className={`${styles.container} layout_guide`}>
          <div className="card">
            <h1 className="title2">Criar categoria</h1>
            <form className="form" onSubmit={cadastrar}>
              <div className="input_campo">
                <label className="label">Nome do produto</label>
                <input
                  className="input"
                  type="text"
                  name="nome"
                  placeholder="BBQ Especial"
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                />
              </div>
              <div id={styles.botoes}>
                <Link href="/produto" className="btn1">
                  Adicionar Produto
                </Link>
                <button className="btn2">
                  Salvar
                </button>
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
