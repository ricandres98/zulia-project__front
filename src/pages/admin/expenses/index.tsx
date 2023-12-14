import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { fetchFunc } from "../../../utils/fetchFunc";
import { TransactionWithId } from "../../../types/transactionsTypes";
import { Layout } from "../../../containers/Layout";
import styles from "./styles.module.css";

const ExpensesPage = () => {
  const [transactions, setTransactions] = useState<TransactionWithId[]>([]);

  useEffect(() => {
    const { getTransactionsList } = fetchFunc();
    (async () => {
      const [error, data] = await getTransactionsList();

      if (error) {
        console.error(error);
      } else {
        setTransactions(data);
        console.log(data);
      }
    })();
  }, []);

  return (
    <>
      <AuthorizationContainer>
        <Header />
        <Layout>
          <h2>Transactions</h2>
          <table className={styles["transactions-table"]}>
            <tr>
              <th>fecha</th>
              <th>descripción</th>
              <th>monto</th>
              <th>referencia</th>
            </tr>
            {transactions?.map((transaction) => (
              <tr key={transaction.reference}>
                <td>
                  {`${new Date(transaction.date).getDate()}/${
                    new Date(transaction.date).getMonth() + 1
                  }/${new Date(transaction.date).getFullYear()}`}
                </td>
                <td>{transaction.description}</td>
                <td>{transaction.amount.toFixed(2)}</td>
                <td>{transaction.reference}</td>
              </tr>
            ))}
          </table>
        </Layout>
      </AuthorizationContainer>
    </>
  );
};

export default ExpensesPage;
