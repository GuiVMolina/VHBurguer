// Importando o CSS
import styles from "./login.module.css";

// Importando o useState
import { useState } from "react";

// Importando a API
import { login } from "../api/authService";

// Estrutura padrão
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  function autenticar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, senha);
  }

  return (
    <>
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
