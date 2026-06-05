import Link from "next/link";

const Subheader = () => {
  return (
    <header className="header bg_vinho">
      <div className="container">
        <Link href="/home">
          <img
            className="logo"
            src="../imgs/logo_footer.svg"
            alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
          />
        </Link>
        <Link href="/home" className="btn2">
          Voltar
        </Link>
      </div>
    </header>
  );
};

export default Subheader;
