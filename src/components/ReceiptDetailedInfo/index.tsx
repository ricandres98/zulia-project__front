import {
  ExpensesType,
  ReceiptDetailedInfoType,
} from "../../types/receiptTypes";
import styles from "./styles.module.css";

interface PropTypes {
  receiptInfo: ReceiptDetailedInfoType | undefined;
}

const ReceiptDetailedInfo = ({ receiptInfo }: PropTypes) => {
  if (typeof receiptInfo === "undefined") {
    return (
      <>
        <p>Ha habido un problema al cargar la información</p>
      </>
    );
  } else {
    const subtotal: number = receiptInfo.expenses
      .map((expense: ExpensesType) => expense.amount)
      .reduce((prev: number, curr: number) => prev + curr, 0);

    const reserva20 = subtotal * 0.2;
    const total = subtotal + reserva20;
    const aliquot = (total * receiptInfo.aliquot) / 100;

    return (
      <div className="DetailedInfo">
        <div className={styles.DetailedInfo__titles}>
          <span>Descripción</span>
          <span>Monto</span>
        </div>
        <div className={styles["DetailedInfo-separator"]}>
          {receiptInfo?.expenses.map((expense: ExpensesType) => (
            <ExpenseItem
              key={expense.description}
              description={expense.description}
              amount={expense.amount}
            />
          ))}
          <ExpenseItem
            extraClass="summary"
            description="Subtotal"
            amount={subtotal}
          />
          <ExpenseItem
            extraClass="summary"
            description="Fondo de reserva 20%"
            amount={reserva20}
          />
          <ExpenseItem
            extraClass="summary"
            description="Total gastos comunes"
            amount={total}
          />
        </div>
        <div className={styles["DetailedInfo-separator"]}>
          <ExpenseItem
            description="Alicuota correspondiente"
            amount={aliquot}
            extraClass="aliquot"
          />
        </div>
        {receiptInfo.debt && receiptInfo.penalty && (
          <div className={styles["DetailedInfo-separator"]}>
            <ExpenseItem description="Deuda" amount={receiptInfo.debt} />
            <ExpenseItem description="Penalidad" amount={receiptInfo.penalty} />
          </div>
        )}
        <div className={styles["DetailedInfo-separator"]}>
          <ExpenseItem
            extraClass="total"
            description="Total a pagar"
            amount={receiptInfo.owedAmount}
          />
        </div>
      </div>
    );
  }
};

interface ExpenseItemPropsType extends ExpensesType {
  extraClass?: "summary" | "aliquot" | "total" | undefined;
}

const ExpenseItem = ({
  description,
  amount,
  extraClass,
}: ExpenseItemPropsType) => {
  return (
    <div
      className={`${styles.ExpenseItem} ${!!extraClass && styles[extraClass]}`}
    >
      <span className={styles.description}>{description}</span>
      <span className={styles.amount}>Bs {amount.toFixed(2)}</span>
    </div>
  );
};

export { ReceiptDetailedInfo };
