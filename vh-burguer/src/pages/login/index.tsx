// Importando o CSS
import styles from "./login.module.css";

// Estrutura padrão
const Login = () => {
  return (
    <>
      <main id={styles.main}>
        <img src="../imgs/hamburguer_login.png" alt="" />
        <div id={styles.login}>
          <h1 className="title1">LOGIN</h1>
          <form className="form" action="">
            <div className="input_campo">
              <label htmlFor="email">Email:</label>
              <input
                className="input"
                type="text"
                name="email"
                placeholder="email@email.com"
                required
              />
            </div>
            <div className="input_campo">
              <label htmlFor="senha">Senha:</label>
              <input
                className="input"
                type="password"
                name="senha"
                placeholder="********"
                required
              />
              <a className="a_input" href="">
                Esqueceu sua senha?
              </a>
            </div>
            <button>Entrar</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
