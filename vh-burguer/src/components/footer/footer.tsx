import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container column">
          <div className="row">
            <Link href="/home">
              <img
                className="logo"
                src="../imgs/logo_footer.svg"
                alt="Logo do VH Burguer que contém como plano de fundo um hamburguer"
              />
            </Link>
            <nav className="navbar">
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
          <hr className="line2"></hr>
          <p className="text2">
            Copyright &copy; 2026 VH Burguer | Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
