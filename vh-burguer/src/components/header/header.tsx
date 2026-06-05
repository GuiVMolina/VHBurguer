import styles from "./header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { verificarAutenticacao } from "../utils/auth";
import { logout } from "@/pages/api/authService";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const [estaAutenticado, setEstaAutenticado] = useState(false);

  function mostrarMenu() {
    setMenuAberto((prev) => !prev);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  useEffect(() => {
    setEstaAutenticado(verificarAutenticacao());
  }, []);

  return (
    <header className="header">
      <div className="container">
        <img
          className="logo"
          src="../imgs/logo_vh_burguer.svg"
          alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
        />
        <nav
          id={styles.navbar}
          className={menuAberto ? styles.nav_menu_open : styles.nav_menu_closed}
        >
          <a href="#destaques" className="link" onClick={fecharMenu}>
            Destaques
          </a>
          <a href="#cardapio" className="link" onClick={fecharMenu}>
            Cardápio
          </a>
          <a href="#unidades" className="link" onClick={fecharMenu}>
            Unidades
          </a>
          {estaAutenticado ? (
            <button className="link2" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link href="/login" className="link2">
              Login
            </Link>
          )}
        </nav>

        <button
          type="button"
          id={styles.btn_icon}
          onClick={mostrarMenu}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          <img src="../imgs/icon_hamburguer.svg" alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
