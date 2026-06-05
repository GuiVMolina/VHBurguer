import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import Link from "next/link";

import { verificarAutenticacao } from "@/components/utils/auth";
import { cadastrarCategoria } from "../api/categoriaService";
import { erro, notificacao } from "@/components/utils/toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Categoria = () => {
  const [categoria, setCategoria] = useState<string>("");

  const [estaAutenticado, setEstaAtutenticado] = useState(false);

  const router = useRouter();

  async function Cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await cadastrarCategoria(categoria);
      notificacao("Categoria cadastrada!");
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    if (!verificarAutenticacao()) {
      router.push("/home");
    } else {
      setEstaAtutenticado(true);
    }
  });

  // A tela de categoria não será renderizada sem autenticação
  if (!estaAutenticado) {
    return null;
  }

  return (
    <>
      <Subheader />
      <main className="container column min_height">
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
            <div className="row">
              <Link href="/produto" className="btn1">
                Adicionar Produto
              </Link>
              <button className="btn2">Salvar</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Categoria;
