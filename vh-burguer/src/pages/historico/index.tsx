import DataTable from "@/components/data-table/data-table";
import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./historico.module.css";
import { verificarAutenticacao } from "@/components/utils/auth";
import { listar } from "@/pages/api/logProdutoService";
import { erro } from "@/components/utils/toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type HistoricoAlteracao = {
  logID: number;
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
};

const HistoricoGeral = () => {
  const [historico, setHistorico] = useState<HistoricoAlteracao[] | null>(null);

  const [estaAutenticado, setEstaAtutenticado] = useState(false);

  const router = useRouter();

  async function carregarHistoricoCompleto() {
    try {
      const lista = await listar();
      setHistorico(lista);
    } catch (error: any) {
      erro("Erro ao carregar o histórico geral: " + error.message);
      setHistorico([]);
    }
  }

  useEffect(() => {
    if (!verificarAutenticacao()) {
      router.push("/home");
    } else {
      setEstaAtutenticado(true);
    }
    carregarHistoricoCompleto();
  }, []);

  // A tela de histórico não será renderizada sem autenticação
  if (!estaAutenticado) {
    return null;
  }

  return (
    <>
      <Subheader />
      <main className="min_height" id={styles.historico}>
        <div className={`${styles.container} layout_guide`}>
          <div id={styles.card}>
            <h1 className="title2">Histórico Geral</h1>

            {historico === null ? (
              <p>Carregando histórico completo...</p>
            ) : historico.length === 0 ? (
              <p>Não existem registros de alterações no sistema.</p>
            ) : (
              <table id={styles.info}>
                <thead id={styles.detalhe_info}>
                  <tr>
                    <th>Data da alteração</th>
                    <th>Produto</th>
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

export default HistoricoGeral;
