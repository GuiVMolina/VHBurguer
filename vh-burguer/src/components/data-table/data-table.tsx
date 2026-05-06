import styles from "./data-table.module.css";
import { formatarPreco } from "../utils/formatacao";

type Dados = {
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
};

const DataTable = ({ dataAlteracao, nomeAnterior, precoAnterior }: Dados) => {
  return (
    <tr id={styles.detalhe}>
      <td>{dataAlteracao}</td>
      <td>{nomeAnterior}</td>
      <td>{formatarPreco(precoAnterior)}</td>
    </tr>
  );
};

export default DataTable;
