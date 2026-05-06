import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header id={styles.header}>
      <div className={`${styles.container} layout_guide`}>
        <img
          id={styles.logo}
          src="../imgs/logo_vh_burguer.svg"
          alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
        />
        <nav id={styles.navbar}>
          <a href="#destaques" className="link">
            Destaques
          </a>
          <a href="#cardapio" className="link">
            Cardápio
          </a>
          <a href="#unidades" className="link">
            Unidades
          </a>
          <Link href="/login" id={styles.login}>
            Login
          </Link>
        </nav>

        <button id={styles.btn_icon}>
          <img src="../imgs/icon_hamburguer.svg" alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
