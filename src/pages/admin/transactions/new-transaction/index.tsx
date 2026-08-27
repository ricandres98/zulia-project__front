import React, { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../../../../components/Header";
import { AuthorizationContainer } from "../../../../containers/AuthorizationContainer";
import { Layout } from "../../../../containers/Layout";
import styles from "./styles.module.css";
import { api } from "../../../../utils/fetchFunc";
import type { Period } from "../../../../types/periodsTypes";
import type {
  CreateTransactionDto,
  ErrorResponse,
} from "../../../../types/transactionsTypes";
import { authContext } from "../../../../hooks/useAuth";
import { LoadingMessage } from "../../../../components/LoadingMessage";
import { ErrorMessage } from "../../../../components/ErrorMessage";
import { Message } from "../../../../components/Message";

const NewTransactionPage = (): React.JSX.Element => {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | false>(false);
  const [created, setCreated] = useState(false);
  const { userToken } = useContext(authContext);

  useEffect(() => {
    (async () => {
      const [err, data] = await api.periods.getPeriods();
      if (err) {
        console.error(err);
      } else {
        setPeriods(data as Period[]);
      }
    })();
  }, []);

  const form = useRef<HTMLFormElement>(null);

  const resetFormValues = () => {
    if (form.current) {
      (form.current.children[1] as HTMLInputElement).value = "";
      (form.current.children[3] as HTMLInputElement).value = "";
      (form.current.children[5] as HTMLInputElement).value = "";
      (form.current.children[7] as HTMLInputElement).value = "";
      (form.current.children[9] as HTMLSelectElement).value = "0";
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (form.current) {
      setLoading(true);
      setError(false);
      setCreated(false);
      const formData = new FormData(form.current);

      const date = formData.get("date");
      const amount = formData.get("amount");
      const description = formData.get("description");
      const reference = formData.get("reference");
      const period = formData.get("period");

      if (
        typeof date === "string" &&
        typeof amount === "string" &&
        typeof description === "string" &&
        typeof reference === "string"
      ) {
        const body: CreateTransactionDto = {
          date,
          amount: Number(amount),
          description,
          reference,
        };

        typeof period === "string" &&
          period !== "0" &&
          (body.periodId = parseInt(period));

        console.log(body);
        const [err, data] = await api.transactions.createNewTransaction(
          body,
          userToken as string,
        );
        setLoading(false);

        if (err) {
          setError(err);
          console.error(err);
        } else {
          setCreated(true);
          console.log("Transacción creada", data);
          resetFormValues();
        }
      }
    }
  };

  return (
    <AuthorizationContainer>
      <Header isAdmin={true} />
      <Layout>
        <h2>Agregar nueva transacción</h2>
        <form
          ref={form}
          onSubmit={(e) => handleSubmit(e)}
          className={styles["form-container"]}
        >
          <label htmlFor="date">Fecha:</label>
          <input type="date" id="date" name="date" required />

          <label htmlFor="amount">Monto:</label>
          <input type="number" id="amount" name="amount" required step="0.01" />

          <label htmlFor="description">Descripción:</label>
          <input type="text" id="description" name="description" required />

          <label htmlFor="reference">Referencia:</label>
          <input type="text" id="reference" name="reference" required />

          <label htmlFor="period">Incluir en recibo (opcional):</label>
          <select id="period" name="period" defaultValue={0}>
            <option value="0">Selecciona un período</option>
            {periods.length &&
              periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {`${period.month + 1}-${period.year}`}
                </option>
              ))}
          </select>

          {error && !loading && (
            <ErrorMessage>
              {error.message === "SequelizeUniqueConstraintError"
                ? "El número de referencia ya está registrado"
                : error.message}
            </ErrorMessage>
          )}
          {created && <Message>Transacción creada exitosamente</Message>}

          {loading ? <LoadingMessage /> : <button>Agregar transacción</button>}
        </form>
      </Layout>
    </AuthorizationContainer>
  );
};

export default NewTransactionPage;
