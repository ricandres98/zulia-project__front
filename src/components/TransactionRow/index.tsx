import React, { useState } from "react";
import type { TransactionWithId } from "../../types/transactionsTypes";
import styles from "./styles.module.css";
import { CheckIcon } from "../../Icons/CheckIcon";
import { XMarkIcon } from "../../Icons/XMarkIcon";
import { PencilIcon } from "../../Icons/PencilIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

type PropsType = {
  transaction: TransactionWithId;
};

export const TransactionRow = ({
  transaction,
}: PropsType): React.JSX.Element => {
  const [editing, setEditing] = useState(false);

  const formatDate = (date: string, print?: boolean): string => {
    const format2Digits = (value: number): string => {
      if (value > 0 && value < 10) return `0${value}`;
      else return `${value}`;
    };

    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    return print
      ? `${format2Digits(day)}/${format2Digits(month)}/${year}`
      : `${year}-${format2Digits(month)}-${format2Digits(day)}`;
  };

  return (
    <>
      <tr className={styles.TransactionRow} key={transaction.reference}>
        {editing ? (
          <>
            <td>
              <input type="date" defaultValue={formatDate(transaction.date)} />
            </td>
            <td>
              <input
                type="text"
                placeholder={transaction.description}
                defaultValue={transaction.description}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder={`${transaction.amount}`}
                defaultValue={transaction.amount}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder={transaction.reference}
                defaultValue={transaction.reference}
              />
            </td>
          </>
        ) : (
          <>
            <td>{formatDate(transaction.date, true)}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount.toFixed(2)}</td>
            <td>{transaction.reference}</td>
          </>
        )}
        <td>
          {/* Actualizar función onClick, la actual es solo para prueba */}
          {editing ? (
            <>
              <button>
                <CheckIcon color="green" />
              </button>
              <button onClick={() => setEditing(false)}>
                <XMarkIcon color="red" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}>
                <PencilIcon />
              </button>
              <button>
                <TrashIcon color="red" />
              </button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};
