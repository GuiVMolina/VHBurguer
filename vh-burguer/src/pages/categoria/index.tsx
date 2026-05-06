import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./categoria.module.css";
import Link from "next/link";

import { cadastrarCategoria } from "../api/categoriaService";
import { erro, notificacao } from "@/components/utils/toast";
import { useState } from "react";

const Categoria = () => {
  const [categoria, setCategoria] = useState<string>("");

  async function Cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarCategoria(categoria);
      notificacao("Categoria cadastrada!");
    } catch (error: any) {
      erro(error.message);
    }
  }

  return (
    <>
      <Subheader />
      <main className="min_height" id={styles.categoria}>
        <div className={`${styles.container} layout_guide`}>
          <div className="card">
            <h1 className="title2">Criar categoria</h1>
            <form className="form" onSubmit={Cadastrar}>
              <div className="input_campo">
                <label className="label">Nome da categoria</label>
                <input
                  className="input"
                  type="text"
                  name="nome"
                  placeholder="Especial"
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                />
              </div>
              <div id={styles.botoes}>
                <Link href="/produto" className="btn1">
                  Adicionar Produto
                </Link>
                <button className="btn2">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Categoria;
