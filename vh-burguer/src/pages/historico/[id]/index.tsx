import DataTable from "@/components/data-table/data-table";
import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./../historico.module.css";
import { listarProdutoId } from "@/pages/api/logProdutoService";
import { erro } from "@/components/utils/toast";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type HistoricoAlteracao = {
  logID: number;
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
};

const Historico = () => {
  const [historico, setHistorico] = useState<HistoricoAlteracao[]>([]);

  const params = useParams();
  const id = params?.id;

  async function listarHistorico() {
    try {
      const lista = await listarProdutoId(Number(id));
      setHistorico(lista);
    } catch (error: any) {
      erro(error.message);
    }
  }

  useEffect(() => {
    if (!id) return;
    listarHistorico();
  });

  return (
    <>
      <Subheader />
      <main className="min_height" id={styles.historico}>
        <div className={`${styles.container} layout_guide`}>
          <h1 className="title2">Histórico de alterações:</h1>
          <div id={styles.card}>
            {historico === null ? (
              <p>Carregando historico</p>
            ) : historico.length === 0 ? (
              <p>O produto não contém histórico de alterações</p>
            ) : (
              <table id={styles.info}>
                <thead id={styles.detalhe_info}>
                  <tr>
                    <th>Data da alteração</th>
                    <th>Nome Anterior</th>
                    <th>Preço Anterior</th>
                  </tr>
                </thead>
                <tbody id={styles.line}></tbody>
                <tfoot id={styles.data_table}>
                  {historico.map((item) => (
                    <DataTable
                      key={item.logID}
                      dataAlteracao={item.dataAlteracao}
                      nomeAnterior={item.nomeAnterior}
                      precoAnterior={item.precoAnterior}
                    />
                  ))}
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Historico;
