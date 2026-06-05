import DataTable from "@/components/data-table/data-table";
import Subheader from "@/components/sub-header/subheader";
import Footer from "@/components/footer/footer";
import styles from "./../historico.module.css";
import { verificarAutenticacao } from "@/components/utils/auth";
import { listarProdutoId } from "@/pages/api/logProdutoService";
import { useParams, useRouter } from "next/navigation";
import { erro } from "@/components/utils/toast";
import { useEffect, useState } from "react";

type HistoricoAlteracao = {
  logID: number;
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
};

const Historico = () => {
  const [historico, setHistorico] = useState<HistoricoAlteracao[]>([]);

  const [estaAutenticado, setEstaAtutenticado] = useState(false);

  const router = useRouter();

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
    if (!verificarAutenticacao()) {
      router.push("/home");
    } else {
      setEstaAtutenticado(true);
    }

    if (!id) return;
    listarHistorico();
  });

  // A tela de histórico não será renderizada sem autenticação
  if (!estaAutenticado) {
    return null;
  }

  return (
    <>
      <Subheader />
      <main className="min_height">
        <div className="container column">
          <h1 className="title2">Histórico de alterações:</h1>
          <div className="infocard">
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
                <tbody className="line"></tbody>
                <tfoot className="column">
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
