import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { api } from "../../../utils/fetchFunc";
import type { TransactionWithId } from "../../../types/transactionsTypes";
import { Layout } from "../../../containers/Layout";
import styles from "./styles.module.css";
import { TransactionRow } from "../../../components/TransactionRow";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionWithId[]>([]);

  useEffect(() => {
    (async () => {
      const [error, data] = await api.transactions.getTransactionsList();

      if (error) {
        console.error(error);
      } else {
        data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          return dateA.getTime() - dateB.getTime();
        });

        setTransactions(data);
        console.log(data);
      }
    })();
  }, []);

  return (
    <>
      <AuthorizationContainer>
        <Header isAdmin={true} />
        <Layout>
          <h2>Transacciones</h2>
          <table className={styles["transactions-table"]}>
            <tr>
              <th>fecha</th>
              <th>descripción</th>
              <th>monto</th>
              <th>referencia</th>
            </tr>
            {transactions?.map((transaction) => (
              <TransactionRow
                key={transaction.reference}
                transaction={transaction}
              />
            ))}
          </table>
        </Layout>
      </AuthorizationContainer>
    </>
  );
};

export default TransactionsPage;
