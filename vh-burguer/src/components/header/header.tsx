import styles from "./header.module.css";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  function mostrarMenu() {
    setMenuAberto(!menuAberto);
  }

  return (
    <header id={styles.header}>
      <div className={`${styles.container} layout_guide`}>
        <img
          id={styles.logo}
          src="../imgs/logo_vh_burguer.svg"
          alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
        />
        <nav id={styles.navbar} className={menuAberto ? styles.nav_menu_open : styles.nav_menu_closed}>
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

        <button id={styles.btn_icon} onClick={mostrarMenu}>
          <img src="../imgs/icon_hamburguer.svg" alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
