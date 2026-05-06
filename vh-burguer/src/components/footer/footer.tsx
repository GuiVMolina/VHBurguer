import Link from "next/link";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <>
      <footer id={styles.footer}>
        <div className={`${styles.container} layout_guide`}>
          <div id={styles.info}>
            <Link href="/home">
              <img
                id={styles.logo}
                src="../imgs/logo_footer.svg"
                alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
              />
            </Link>
            <nav id={styles.navbar}>
              <a>
                <img
                  className="icon"
                  src="../imgs/tiktok.png"
                  alt="Rede Social, Tiktok do VH Burguer"
                />
              </a>
              <a>
                <img
                  className="icon"
                  src="../imgs/face.png"
                  alt="Rede Social, Facebook do VH Burguer"
                />
              </a>
              <a>
                <img
                  className="icon"
                  src="../imgs/insta.png"
                  alt="Rede Social, Instagram do VH Burguer"
                />
              </a>
              <a>
                <img
                  className="icon"
                  src="../imgs/youtube.png"
                  alt="Canal de vídeos, Youtube do VH Burguer"
                />
              </a>
            </nav>
          </div>
          <hr id={styles.footer_line}></hr>
          <p id={styles.footer_text}>
            Copyright &copy; 2026 VH Burguer | Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
