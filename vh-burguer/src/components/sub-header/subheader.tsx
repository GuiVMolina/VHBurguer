import styles from "./subheader.module.css";
import Link from "next/link";

const Subheader = () => {
  return (
    <>
      <header id={styles.subheader}>
        <div className={`${styles.container} layout_guide`}>
          <Link href="/home">
            <img
              id={styles.logo}
              src="../imgs/logo_footer.svg"
              alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
            />
          </Link>
          <Link href="/home" id={styles.link}>Voltar</Link>
        </div>
      </header>
    </>
  );
};

export default Subheader;
