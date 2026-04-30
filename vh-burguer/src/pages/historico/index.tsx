import DataTable from "@/components/data-table/data-table";
import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./historico.module.css";

const Historico = () => {
  return (
    <>
      <Subheader />
      <section className="min_height" id={styles.historico}>
        <div className={`${styles.container} layout_guide`}>
          <div id={styles.info}>
            <h1 className="title2">Histórico de alterações: Monstro</h1>
            <div id={styles.detalhe_info}>
              <p>Data da alteração</p>
              <p>Nome Anterior</p>
              <p>Preço Anterior</p>
            </div>
            <hr id={styles.footer_line}></hr>
            <div id={styles.data_table}>
              <DataTable />
              <DataTable />
              <DataTable />
              <DataTable />
              <DataTable />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Historico;
