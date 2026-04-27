import Link from "next/link";
import styles from "./subheader.module.css";

const Subheader = () => {
  return (
    <>
      <header id={styles.subheader}>
      <div className={`${styles.container} layout_guide`}>
        <img
          id={styles.logo}
          src="../imgs/logo_footer.svg"
          alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
        />
        <Link href="/home">Voltar</Link>
      </div>
    </header>
    </>
  )
}

export default Subheader;