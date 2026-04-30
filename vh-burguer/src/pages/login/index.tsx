// Importando o CSS
import styles from "./login.module.css";

// Importando o useState
import { useState } from "react";

// Importando a API
import { login } from "../api/authService";

// Importando o Router
import { useRouter } from "next/router";

// Importando o Toastify
import { ToastContainer, toast } from "react-toastify";
import { erro, notificacao } from "@/components/utils/toast";

// Estrutura padrão
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const router = useRouter();

  async function autenticar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, senha);
      notificacao("Login bem sucedido!");

      // Push depois de 3 segundos
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    } catch (error: any) {
      erro(error.response.data);
    }
  }

  return (
    <>
      <ToastContainer />
      <main id={styles.main}>
        <img src="../imgs/hamburguer_login.png" alt="" />
        <div id={styles.login}>
          <h1 className="title1">Login</h1>
          <form className="form" onSubmit={autenticar}>
            <div className="input_campo">
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input
                className="input"
                type="text"
                name="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input_campo">
              <label className="label" htmlFor="senha">
                Senha:
              </label>
              <input
                className="input"
                type="password"
                name="senha"
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <a className="a_input" href="">
                Esqueceu sua senha?
              </a>
            </div>
            <button className="btn3">Entrar</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
